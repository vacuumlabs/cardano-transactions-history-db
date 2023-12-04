import { ChainSyncMessageHandlers } from "@cardano-ogmios/client/dist/ChainSync";
import { Address } from "@cardano-ogmios/schema";
import { writeTransactionDataToFile } from "./write-transaction-data-to-file";

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
  transactions.forEach((transaction) => {
    if (isTransactionRecipientEqualTo(contractAddress, transaction)) {
      writeTransactionDataToFile(
        transaction.id,
        "ogmios",
        timestamp,
        transaction
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
