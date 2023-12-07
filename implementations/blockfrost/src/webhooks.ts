import express, { Request, Response } from "express";
import { onTransaction } from "./on-transaction";

import { initializeTransactionDB } from "../../../database/dist";

const port = 3001;

const initializeApp = async () => {
  const app = express();
  app.use(express.json());

  // routes
  app.post("/action-on-smart-contract", (req: Request, res: Response) => {
    onTransaction(req);

    res.sendStatus(200);
  });

  // initialize DB
  await initializeTransactionDB();

  // listener
  app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
  });
};

initializeApp();
