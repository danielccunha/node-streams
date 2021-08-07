import { resolve } from "path";

const filenames = [
  "netflix-data.csv",
  "plrabn12.txt",
  "shark-attacks.csv",
  "soilmoisture_dataset.csv",
  "stock-exchange.csv",
];

export const files = filenames.map((filename) => ({
  filename,
  filepath: resolve(__dirname, "..", "data", filename),
}));
