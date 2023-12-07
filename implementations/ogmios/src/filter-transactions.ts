import { ChainSyncMessageHandlers } from "@cardano-ogmios/client/dist/ChainSync";
import { Address } from "@cardano-ogmios/schema";
import { writeTransactionDataToFile } from "./write-transaction-data-to-file";
import {
  Transaction,
  TransactionOutput,
  TransactionType,
} from "../../../database/dist";

type ChainSyncResponse = Parameters<ChainSyncMessageHandlers["rollForward"]>[0];

const contractAddress =
  "addr_test1wzvel8250te48guk2v655vg8y0u2selr5srqu8dkktj3ypg6wvjga";

export const filterTransactions = async ({ block, tip }: ChainSyncResponse) => {
  const timestamp = new Date().getTime();
  if (!("babbage" in block)) {
    console.error("not a babbage block. skipping...", tip);
    return;
  }

  const transactions = block.babbage.body;
  transactions.forEach(async (transaction) => {
    if (isTransactionRecipientEqualTo(contractAddress, transaction)) {
      writeTransactionDataToFile(
        transaction.id,
        "ogmios",
        timestamp,
        transaction
      );

      // save transaction
      const transactionToDB = new Transaction();
      transactionToDB.hash = transaction.id;
      transactionToDB.type = TransactionType.ogmios;
      const transactionToDBResult = await transactionToDB.save();
      console.log("Saved transaction to db ", transactionToDBResult.hash);

      // save transaction outputs
      const transactionOutputsToDBResult = await Promise.all(
        transaction.body.outputs.map((output, index) => {
          const transactionOutput = new TransactionOutput();
          transactionOutput.transaction = transactionToDBResult;
          transactionOutput.transactionHash = transaction.id;
          transactionOutput.transactionOutputIndex = index;
          transactionOutput.transactionType = TransactionType.ogmios;
          transactionOutput.address = output.address;
          transactionOutput.datum = output.datum?.toString() ?? undefined;
          transactionOutput.coins = output.value.coins.toString();

          if (output.value.assets) {
            const assets: typeof transactionOutput.assets = {};
            // convert bigint to string
            Object.keys(output.value.assets).forEach((key) => {
              assets[key] = output.value.assets![key].toString();
            });
            transactionOutput.assets = assets;
          }

          return transactionOutput.save();
        })
      );
      console.log(
        "Saved transaction outputs to db, indexes: ",
        transactionOutputsToDBResult.map(
          (output) => output.transactionOutputIndex
        )
      );
    }
  });
};

const isTransactionRecipientEqualTo = (
  address: Address,
  transaction: { body: { outputs: Array<{ address: Address }> } }
): boolean => {
  if (transaction.body.outputs.find((output) => output.address === address))
    return true;
  else return false;
};
