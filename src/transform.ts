import { Transform } from "stream";

import { DuplexStream } from "./duplex";

const transformStream = new Transform({
  transform(chunk, _encoding, callback) {
    this.push(`Transformed chunk: ${chunk.toString().toLowerCase()}`);
    callback();
  },
});

const stream = new DuplexStream();
stream.pipe(transformStream).on("data", (chunk) => console.log(chunk.toString()));
