import { createWriteStream } from "fs";
import { resolve } from "path";

const filename = `${Date.now()}.csv`;
const filepath = resolve(__dirname, "..", "tmp", filename);

export async function writeFile() {
  // Create write stream with filepath to store the content
  const stream = createWriteStream(filepath);

  // Write headers to the file. The data being written needs to be a string smaller than the "highWaterMark", which
  // is the maximum size of the buffer
  stream.write("index, message\n");

  // Generate an array with N positions and write a line for each of them
  [...Array(1000000)].forEach((_, idx) => stream.write(`${idx}, message ${idx}\n`));

  // Close the stream and emit the "end" event
  stream.end();
}

// It writes a file with over a million lines in one second
writeFile();
