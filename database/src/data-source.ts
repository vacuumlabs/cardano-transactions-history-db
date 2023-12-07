import "reflect-metadata";
import { DataSource } from "typeorm";
import { Transaction, TransactionOutput } from "./entity/Transaction";

export const DBDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "development",
  password: "oguuD3*W3S72",
  database: "transactions",
  synchronize: true,
  logging: false,
  entities: [Transaction, TransactionOutput],
  migrations: [],
  subscribers: [],
});
