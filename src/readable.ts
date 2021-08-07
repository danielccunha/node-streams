import { cyan, yellow } from "chalk";
import { createReadStream } from "fs";
import csv from "csv-parser";

import { files } from "./files";

export async function readFile(filepath: string) {
  // Create read stream with filepath and optional options
  const stream = createReadStream(filepath, { encoding: "utf-8" });
  let content = "";

  // Define handlers for events raised by the stream
  // - OPEN event is emitted when the stream is ready to start reading the file
  // - DATA event is emitted every time the stream reads a chunk/section of the file
  // - END event is emitted when there's no more data to be consumed
  // - CLOSE event is emitted when the stream and any of its resources is closed
  stream
    .on("open", () => console.log(`Stream is ${cyan("open")}`))
    .on("data", (chunk) => (content += chunk))
    .on("end", () => console.log(`Completed reading file with length ${cyan(content.length)}`))
    .on("close", () => console.log(`Stream is ${cyan("closed")}`));
}

export async function readCSV() {
  const output = [];
  const stream = createReadStream(files[0].filepath);

  // In this case the DATA event returns the parsed row instead of a raw string, and the
  // HEADERS events, specific of the package, returns the headers/column names of the CSV
  stream
    .pipe(csv())
    .on("data", (data) => output.push(data))
    .on("headers", (headers) => console.log(`Headers of the file: ${yellow(headers.join(", "))}`))
    .on("end", () => console.log(`Completed reading CSV with ${yellow(output.length)} items`));
}

readFile(files[1].filepath);
readCSV();
