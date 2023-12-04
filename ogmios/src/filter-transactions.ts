import { ChainSyncMessageHandlers } from "@cardano-ogmios/client/dist/ChainSync";
import { Address } from "@cardano-ogmios/schema";
import util from "util";

type ChainSyncResponse = Parameters<ChainSyncMessageHandlers["rollForward"]>[0];

const contractAddress =
  "addr_test1wzvel8250te48guk2v655vg8y0u2selr5srqu8dkktj3ypg6wvjga";

export const filterTransactions = async ({ block, tip }: ChainSyncResponse) => {
  if (!("babbage" in block)) {
    console.error("not a babbage block. skipping...", tip);
    return;
  }

  const transactions = block.babbage.body;
  transactions.forEach((transaction) => {
    if (isTransactionRecipientEqualTo(contractAddress, transaction)) {
      console.log(util.inspect(transaction, false, null));
    }
  });
};

const isTransactionRecipientEqualTo = (
  address: Address,
  transaction: { body: { outputs: Array<{ address: Address }> } }
): boolean => {
  if (transaction.body.outputs.find((output) => output.address === address))
    return true;
  else return false;
};
