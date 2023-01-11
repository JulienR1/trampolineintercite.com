import {
  DeleteObjectCommand,
  GetObjectCommand,
  PutObjectCommand,
} from "@aws-sdk/client-s3";
import {
  existsSync,
  mkdirSync,
  readFileSync,
  unlinkSync,
  writeFileSync,
} from "fs";
import { join } from "path";

export class S3Mock {
  private dir = join(process.cwd(), "s3-mock");

  constructor() {
    if (!existsSync(this.dir)) {
      mkdirSync(this.dir);
    }
  }

  public async send(
    command: GetObjectCommand | PutObjectCommand | DeleteObjectCommand
  ) {
    if (!command.input.Key) {
      throw new Error("No key was passed.");
    }

    const filepath = join(this.dir, command.input.Key);

    if (command instanceof GetObjectCommand) {
      return readFileSync(filepath);
    } else if (command instanceof PutObjectCommand) {
      if (existsSync(filepath)) {
        unlinkSync(filepath);
      }

      writeFileSync(filepath, command.input.Body!.toString());
    } else if (command instanceof DeleteObjectCommand) {
      return unlinkSync(filepath);
    }
  }

  public destroy() {}
}
