import {
  DeleteObjectCommand,
  GetObjectCommand,
  PutObjectCommand,
  PutObjectCommandInput,
  S3Client,
} from "@aws-sdk/client-s3";
import { randomBytes } from "crypto";
import { S3Mock } from "./s3-mock";

const isDev = () => !!process.env.TS_NODE_DEV;

const client = () => {
  return isDev()
    ? new S3Mock()
    : new S3Client({
        credentials: {
          accessKeyId: process.env.ACCESS_KEY ?? "",
          secretAccessKey: process.env.SECRET_ACCESS_KEY ?? "",
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

  const aws = client();
  const result = await aws.send(command);
  aws.destroy();
  return result;
};

const put = async (
  content: PutObjectCommandInput["Body"],
  type: PutObjectCommandInput["ContentType"],
  options?: { encoding: "base64"; key?: string }
) => {
  const extension = type?.split("/")[1].split("+")[0];
  const contentKey = (options?.key ?? makeRandomName()) + "." + extension;
  const command = new PutObjectCommand({
    Bucket: process.env.BUCKET_NAME,
    Key: contentKey,
    Body: content,
    ContentType: type,
    ContentEncoding: options?.encoding,
  });

  const aws = client();
  await aws.send(command);
  aws.destroy();
  return contentKey;
};

const remove = async (key: string) => {
  const command = new DeleteObjectCommand({
    Bucket: process.env.BUCKET_NAME,
    Key: key,
  });

  const aws = client();
  await aws.send(command);
  aws.destroy();
};

const formatUrl = (key: string) => {
  return isDev()
    ? `http://localhost:10000/${key}`
    : `${process.env.S3_URL}/${key}`;
};

export const s3 = { get, put, remove, formatUrl };
