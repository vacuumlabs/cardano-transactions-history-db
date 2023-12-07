import {
  Entity,
  PrimaryColumn,
  Column,
  BaseEntity,
  OneToMany,
  ManyToOne,
  JoinColumn,
} from "typeorm";

// saved to db as 'int', so all values must be predefined integers
// !pay attention to keep sync (with appropriate migrations if needed) the values with the ones in the db
export enum TransactionType {
  blockfrost = 0,
  ogmios = 1,
}

@Entity()
export class Transaction extends BaseEntity {
  @PrimaryColumn({ type: "char", length: 64 })
  hash: string;

  @PrimaryColumn({ type: "int" })
  type: TransactionType;

  @OneToMany(() => TransactionOutput, (output) => output.transaction)
  inputs: TransactionOutput[];

  @OneToMany(() => TransactionOutput, (output) => output.transaction)
  outputs: TransactionOutput[];
}

@Entity()
export class TransactionOutput extends BaseEntity {
  @PrimaryColumn({ type: "char", length: 64 })
  transactionHash: string;

  @PrimaryColumn({ type: "int" })
  transactionOutputIndex: number;

  @PrimaryColumn({ type: "int" })
  transactionType: TransactionType;

  @ManyToOne(() => Transaction, (transaction) => transaction.outputs)
  @JoinColumn([
    { name: "transactionHash", referencedColumnName: "hash" },
    { name: "transactionType", referencedColumnName: "type" },
  ])
  transaction: Transaction;

  @Column()
  address: string;

  @Column({ nullable: true })
  datum?: string;

  @Column({ nullable: true })
  coins?: string;

  @Column({ type: "simple-json", nullable: true })
  assets?: { [k: string]: string };
}
