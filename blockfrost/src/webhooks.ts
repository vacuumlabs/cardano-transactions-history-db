import express, { Request, Response } from "express";
import util from "util";

const app = express();
app.use(express.json());
const port = 3001;

app.post("/action-on-smart-contract", (req: Request, res: Response) => {
  console.log(util.inspect(req.body, false, null));

  res.sendStatus(200);
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
