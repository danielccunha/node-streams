import dayjs from "dayjs";
import { cyan, yellow } from "chalk";
import { createReadStream } from "fs";
import { readFile } from "fs/promises";

import { files } from "./files";

export async function executeFilesystem() {
  console.log(`Start reading files using ${yellow("filesystem")} library`);
  const startTime = dayjs();
  const promises = files.map((file) => readFile(file.filepath));
  await Promise.all(promises);
  const finalTime = dayjs();
  const diff = finalTime.diff(startTime) / 1000.0;
  console.log(`It took ${yellow(diff)} seconds to read all files using the filesystem library`);
}

export async function executeStreams() {
  console.log(`Start reading files using ${cyan("streams")}`);
  const startTime = dayjs();
  const promises = files.map((file) => {
    return new Promise((resolve) => {
      createReadStream(file.filepath)
        .on("data", () => {})
        .on("close", resolve);
    });
  });
  await Promise.all(promises);
  const finalTime = dayjs();
  const diff = finalTime.diff(startTime) / 1000.0;
  console.log(`It took ${cyan(diff)} seconds to read all files using streams`);
}

// In all my tests the streams approach took less time than using the filesystem, with a small
// difference in milliseconds. But with more files we try to read, to more the difference increases
executeFilesystem();
executeStreams();
