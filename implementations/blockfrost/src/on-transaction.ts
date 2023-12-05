import { Request } from "express";
import { writeTransactionDataToFile } from "./write-transaction-data-to-file";

export const onTransaction = async (req: Request) => {
  const timestamp = new Date().getTime();
  const transaction: { payload: [{ tx: { hash: string } }] } = req.body;
  writeTransactionDataToFile(
    transaction.payload[0].tx.hash,
    "blockfrost",
    timestamp,
    req.body
  );
};
