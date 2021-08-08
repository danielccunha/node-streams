import { Duplex } from "stream";

// Stream created based on this article: https://www.freecodecamp.org/news/node-js-streams-everything-you-need-to-know-c9141306be93/
export class DuplexStream extends Duplex {
  private currentCharCode = 65;

  constructor() {
    super();
  }

  _read(_size: number) {
    this.push(String.fromCharCode(this.currentCharCode++));
    if (this.currentCharCode > 90) {
      this.push(null);
    }
  }

  _write(chunk: any, _encoding: BufferEncoding, callback: (error?: Error | null) => void) {
    console.log(chunk.toString());
    callback();
  }
}

const stream = new DuplexStream();
stream.on("data", (chunk) => console.log(chunk.toString()));
