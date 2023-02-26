import {
  IMessage,
  IMessageData,
  IMessageDataDetails,
  IMessageDetails,
  INewMessagePayload,
  IUser,
} from "common";
import { query, transaction } from "../lib";
import { err, ok, Result } from "../types";
import { getUser } from "./users.service";

export const getMessages = async (): Promise<IMessage[]> => {
  const messages = await query<IMessageData>({
    sql: "SELECT * FROM active_messages",
  }).execute();

  if (!messages.isOk()) {
    return [];
  }

  return messages.value.map((message) => ({
    title: message.title,
    content: message.content,
    date: new Date(message.start_date),
  }));
};

export const getDetailedMessages = async (): Promise<IMessageDetails[]> => {
  const messages = await query<IMessageDataDetails>({
    sql: "SELECT * FROM messages",
  }).execute();

  if (!messages.isOk()) {
    return [];
  }

  const formatMessage = async (
    message: IMessageDataDetails
  ): Promise<IMessageDetails> => {
    const author = await getUser().fromId(message.author_id);

    const startDate = new Date(message.start_date);
    const endDate = new Date(message.end_date);
    const visible = new Boolean(message.visible).valueOf();
    const now = new Date();
    const isActive = visible && startDate <= now && endDate >= now;

    return {
      id: message.id,
      title: message.title,
      content: message.content,
      startDate,
      endDate,
      visible,
      isActive,
      author: author.isOk() ? author.value : null,
    };
  };

  return await Promise.all(messages.value.map(formatMessage));
};

export const createMessage = async (
  message: INewMessagePayload,
  author: IUser
): Promise<Result<number>> => {
  const result = await transaction(async (client) => {
    await client.query({
      sql: "INSERT INTO messages (title, content, start_date, end_date, author_id) VALUES (?, ?, ?, ?, ?);",
      values: [
        message.title,
        message.content,
        message.startDate,
        message.endDate,
        author.id,
      ],
    });

    const { id } = await client.single<{ id: number }>({
      sql: "SELECT id FROM messages WHERE author_id = ? ORDER BY id DESC",
      values: [author.id],
    });

    return { messageId: id };
  });

  if (!result.isOk()) {
    return err(result.error);
  }
  return ok(result.value.messageId);
};
