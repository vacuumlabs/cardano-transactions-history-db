import util from "util";
import { Request } from "express";

export const onTransaction = async (req: Request) => {
  console.log(util.inspect(req.body, false, null));
};
