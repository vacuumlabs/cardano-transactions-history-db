import express, { Request, Response } from "express";
import { onTransaction } from "./on-transaction";

const app = express();
app.use(express.json());
const port = 3001;

app.post("/action-on-smart-contract", (req: Request, res: Response) => {
  onTransaction(req);

  res.sendStatus(200);
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
