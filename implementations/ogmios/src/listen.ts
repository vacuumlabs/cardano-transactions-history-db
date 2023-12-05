import { WebSocket } from "ws";

import {
  createChainSyncClient,
  createConnectionObject,
} from "@cardano-ogmios/client";
import { filterTransactions } from "./filter-transactions";

const connection = createConnectionObject({ host: "localhost", port: 1337 });
const socket = new WebSocket("ws://localhost:1337");
const createClient = createChainSyncClient(
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

(async () => {
  socket.once("open", async () => {
    const client = await createClient;
    await client.startSync();
  });
})();
