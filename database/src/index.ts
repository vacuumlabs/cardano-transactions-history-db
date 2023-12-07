import { DataSource } from "typeorm";
import { DBDataSource } from "./data-source";

let initializePromise: Promise<DataSource> | undefined = undefined;
export async function initializeTransactionDB() {
  if (!initializePromise) {
    initializePromise = (async () => {
      const dataSource = await DBDataSource.initialize();
      if (dataSource.options.type !== "postgres") {
        throw new Error("Database is not of type postgres");
      }
      console.log(
        `Database initialized and reachable at ${dataSource.options.host}:${dataSource.options.port}`
      );
      return dataSource;
    })();
  }
  return initializePromise;
}

export {
  Transaction,
  TransactionOutput,
  TransactionType,
} from "./entity/Transaction";
export { writeTransactionDataToFile } from "./write-transaction-data-to-file";
