import { IRawImage, IUser } from "common";
import { query, s3, transaction } from "../lib";

export const saveImage = async (img: IRawImage, creator: IUser) => {
  const fileData = img.file.replace(/^data:image\/[a-zA-Z+]+;base64,/, "");
  const buffer = Buffer.from(fileData, "base64");
  const key = await s3.put(buffer, img.type);

  const result = await transaction(async (client) => {
    await client.query({
      sql: "INSERT INTO image (`key`, width, height, alt, creator_id) VALUES (?,?,?,?,?)",
      values: [key, img.width, img.height, img.name, creator.id],
    });

    const { id } = await client.single<{ id: number }>({
      sql: "SELECT id FROM image WHERE `key`=?",
      values: [key],
    });

    return { imageId: id };
  });

  if (!result.isOk()) {
    await s3.remove(key);
  }

  return result;
};

export const removeImage = async (id: number) => {
  const result = await query<{ key: string }>({
    sql: "SELECT `key` FROM image WHERE id=?",
    values: [id],
  }).single();
  await query({ sql: "DELETE FROM image WHERE id=?", values: [id] }).execute();

  if (result.isOk()) {
    await s3.remove(result.value.key);
  }
};
