import { WebSocket } from "ws";

import {
  createChainSyncClient,
  createConnectionObject,
} from "@cardano-ogmios/client";
import { filterTransactions } from "./filter-transactions";
import { initializeTransactionDB } from "../../../database/dist";

const connection = createConnectionObject({ host: "localhost", port: 1337 });
const socket = new WebSocket("ws://localhost:1337");

socket.once("open", async () => {
  // initialize DB
  await initializeTransactionDB();

  // start sync
  const client = await createChainSyncClient(
    {
      connection,
      socket,
      afterEach: (msg) => {
        msg();
      },
    },
    {
      rollBackward: async (response, requestNext) => {
        console.log("rollBackward", response.tip);
        requestNext();
      },
      rollForward: async (response, requestNext) => {
        console.log("rollForward", response.tip);
        requestNext();
        filterTransactions(response);
      },
    }
  );
  await client.startSync();
});
