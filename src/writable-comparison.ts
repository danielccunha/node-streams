import { cyan, yellow } from "chalk";
import dayjs from "dayjs";
import { createWriteStream } from "fs";
import { writeFile } from "fs/promises";
import { resolve } from "path";

const SIZE = 10000000;
const timestamp = Date.now();
const filenames = [`${timestamp}-filesystem.csv`, `${timestamp}-stream.csv`];
const filepaths = filenames.map((filename) => resolve(__dirname, "..", "tmp", filename));
const content = ["index\n", ...[...Array(SIZE)].map((_, idx) => `${idx}\n`)];

export async function executeFilesystem() {
  console.log(`Started writing file using ${yellow("filesystem")}`);
  const fileContent = content.join("");
  const startTime = dayjs();
  await writeFile(filepaths[0], fileContent);
  const finalTime = dayjs();
  const diff = finalTime.diff(startTime) / 1000.0;
  console.log(`It took ${yellow(diff)} seconds to write the file using filesystem`);
}

export async function executeStream() {
  console.log(`Started writing file using ${cyan("stream")}`);
  const startTime = dayjs();
  const stream = createWriteStream(filepaths[1]);
  content.forEach((line) => stream.write(line));
  stream.end();
  const finalTime = dayjs();
  const diff = finalTime.diff(startTime) / 1000.0;
  console.log(`It took ${cyan(diff)} seconds to write the file using stream`);
}

// Result similar to the readable comparison. In all the tests, no matter the size of the sample the stream
// approach took less time than using filesystem, with a small difference in milliseconds.
//
// With 100.000 lines this difference was around 1/3 of the filesystem time, with over a million lines it went
// to 1/4, but it's still a considerable difference.
executeFilesystem();
executeStream();
