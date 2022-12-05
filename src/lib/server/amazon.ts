import {
  S3Client,
  GetObjectCommand,
  PutObjectCommand,
  DeleteObjectCommand,
  PutObjectCommandInput,
} from "@aws-sdk/client-s3";
import { randomBytes } from "crypto";

const client = () => {
  return new S3Client({
    credentials: {
      accessKeyId: process.env.ACCESS_KEY,
      secretAccessKey: process.env.SECRET_ACCESS_KEY,
    },
    region: process.env.BUCKET_REGION,
  });
};

const makeRandomName = (size = 32) => randomBytes(size).toString("hex");

const get = async (key: string) => {
  const command = new GetObjectCommand({
    Bucket: process.env.BUCKET_NAME,
    Key: key,
  });

  return await client().send(command);
};

const put = async (
  content: PutObjectCommandInput["Body"],
  type: PutObjectCommandInput["ContentType"],
  key?: string,
) => {
  const contentKey = key ?? makeRandomName();
  const command = new PutObjectCommand({
    Bucket: process.env.BUCKET_NAME,
    Key: contentKey,
    Body: content,
    ContentType: type,
  });

  await client().send(command);
  return contentKey;
};

const remove = async (key: string) => {
  const command = new DeleteObjectCommand({
    Bucket: process.env.BUCKET_NAME,
    Key: key,
  });

  await client().send(command);
};

export const s3 = { get, put, remove };
