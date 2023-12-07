import "reflect-metadata";
import { DataSource } from "typeorm";
import { Transaction, TransactionOutput } from "./entity/Transaction";

export const DBDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST || "localhost",
  port: Number(process.env.DB_PORT) || 5432,
  username: process.env.DB_USERNAME || "development",
  password: process.env.DB_PASSWORD || "oguuD3*W3S72",
  database: process.env.DB_DATABASE || "transactions",
  synchronize: true,
  logging: false,
  entities: [Transaction, TransactionOutput],
  migrations: [],
  subscribers: [],
});
