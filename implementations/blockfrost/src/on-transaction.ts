import { Request } from "express";
import { writeTransactionDataToFile } from "./write-transaction-data-to-file";
import {
  Transaction,
  TransactionOutput,
  TransactionType,
} from "../../../database/dist";

export const onTransaction = async (req: Request) => {
  const timestamp = new Date().getTime();
  const data: {
    payload: [
      {
        tx: {
          hash: string;
        };
        outputs: Array<{
          address: string;
          amount: [{ unit: string; quantity: bigint }];
          output_index: number;
          inline_datum: string | null;
        }>;
      }
    ];
  } = req.body;
  const transaction = data.payload[0];
  writeTransactionDataToFile(
    transaction.tx.hash,
    "blockfrost",
    timestamp,
    data
  );

  // save transaction
  const transactionToDB = new Transaction();
  transactionToDB.hash = transaction.tx.hash;
  transactionToDB.type = TransactionType.blockfrost;
  const transactionToDBResult = await transactionToDB.save();
  console.log("Saved transaction to db ", transactionToDBResult.hash);

  // save transaction outputs
  const transactionOutputsToDBResult = await Promise.all(
    transaction.outputs.map((output) => {
      const transactionOutput = new TransactionOutput();
      transactionOutput.transaction = transactionToDBResult;
      transactionOutput.transactionHash = transaction.tx.hash;
      transactionOutput.transactionOutputIndex = output.output_index;
      transactionOutput.transactionType = TransactionType.blockfrost;
      transactionOutput.address = output.address;
      transactionOutput.datum = output.inline_datum ?? undefined;
      transactionOutput.coins = output.amount
        .find((value) => value.unit === "lovelace")
        ?.quantity.toString();

      // create assets object from the non-lovelace amounts
      transactionOutput.assets = output.amount.reduce((assets, item) => {
        if (item.unit !== "lovelace")
          assets[item.unit] = item.quantity.toString();
        return assets;
      }, {} as Required<TransactionOutput>["assets"]);
      if (Object.keys(transactionOutput.assets).length === 0)
        transactionOutput.assets = undefined;

      return transactionOutput.save();
    })
  );
  console.log(
    "Saved transaction outputs to db, indexes: ",
    transactionOutputsToDBResult.map((output) => output.transactionOutputIndex)
  );
};
