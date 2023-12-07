import { readFileSync, writeFileSync } from "fs";

export const writeTransactionDataToFile = (
  hash: string,
  type: "ogmios" | "blockfrost",
  timestamp: number,
  data: any
) => {
  // open file (if exists)
  const filePath = `../../_transactions/${hash}.json`;
  let existingFileContent: {
    timestamps: Record<string, number>;
    data: Record<string, any>;
  };
  try {
    existingFileContent = JSON.parse(readFileSync(filePath, "utf8"));
  } catch (error) {
    if (error instanceof Error && "code" in error && error.code === "ENOENT") {
      existingFileContent = {
        timestamps: {},
        data: {},
      };
    } else throw error;
  }

  // write data to file
  existingFileContent.timestamps[type] = timestamp;
  existingFileContent.data[type] = data;
  writeFileSync(filePath, JSON.stringify(existingFileContent, replacer));
  console.log(`Wrote '${type}' data to file ${filePath}`);
};

function replacer(key: string, value: any) {
  if (typeof value === "bigint") {
    // JSON cannot serialize bigints, so we convert them to strings
    return value.toString();
  } else {
    return value;
  }
}
