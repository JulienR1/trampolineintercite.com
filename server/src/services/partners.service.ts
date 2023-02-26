import {
  INewPartnerPayload,
  IPartner,
  IPartnerData,
  IPartnerDetails,
  IPartnerDetailsData,
  IUser,
} from "common";
import { query, s3, transaction } from "../lib";
import { err, ok, Result } from "../types";
import { removeImage, saveImage } from "./image.service";

export const getAllPartners = async (): Promise<IPartner[]> => {
  const partners = await query<IPartnerData>({
    sql: "SELECT * FROM partner_data",
  }).execute();

  if (!partners.isOk()) {
    return [];
  }

  return partners.value.map((partner) => ({
    websiteUrl: partner.website_link,
    label: partner.label,
    img: {
      src: s3.formatUrl(partner.key),
      alt: partner.alt,
      width: partner.width,
      height: partner.height,
    },
  }));
};

export const getAllPartnersWithDetails = async (): Promise<
  IPartnerDetails[]
> => {
  const partners = await query<IPartnerDetailsData>({
    sql: "SELECT * FROM partner_data_details",
  }).execute();

  if (!partners.isOk()) {
    return [];
  }

  return partners.value.map((partner) => ({
    id: partner.id,
    websiteUrl: partner.website_link,
    label: partner.label,
    img: {
      src: s3.formatUrl(partner.key),
      alt: partner.alt,
      width: partner.width,
      height: partner.height,
    },
    startDate: new Date(partner.start_date),
    endDate: partner.end_date ? new Date(partner.end_date) : null,
    isActive:
      new Date(partner.start_date) <= new Date() &&
      (partner.end_date === null || new Date(partner.end_date) > new Date()),
  }));
};

export const createPartner = async (
  payload: INewPartnerPayload,
  creator: IUser
): Promise<Result<number>> => {
  if (payload.logo.type !== "image/svg+xml") {
    if (payload.logo.width > 200 || payload.logo.height > 200) {
      return err(new Error("Image is too big"));
    }
  }

  const image = await saveImage(payload.logo, creator);
  if (!image.isOk()) {
    return err(image.error);
  }

  const result = await transaction(async (client) => {
    await client.query({
      sql: "INSERT INTO partner (label, image_id, website_link, start_date, end_date, creator_id) VALUES (?,?,?,?,?,?)",
      values: [
        payload.label,
        image.value.imageId,
        payload.websiteUrl,
        payload.from,
        payload.to,
        creator.id,
      ],
    });

    const { id } = await client.single<{ id: number }>({
      sql: "SELECT id FROM partner WHERE image_id=?",
      values: [image.value.imageId],
    });
    return { partnerId: id };
  });

  if (!result.isOk()) {
    await removeImage(image.value.imageId);
    return err(result.error);
  }

  return ok(result.value.partnerId);
};

export const removePartner = async (id: number): Promise<Result<boolean>> => {
  const result = await transaction(async (client) => {
    const { id: partnerId, key } = await client.single<IPartnerDetailsData>({
      sql: "SELECT * FROM partner_data_details WHERE id=?",
      values: [id],
    });

    await client.query({
      sql: "DELETE FROM image WHERE `key`=?",
      values: [key],
    });
    await client.query({
      sql: "DELETE FROM partner WHERE id=?",
      values: [partnerId],
    });

    return { imageKey: key };
  });

  if (result.isOk()) {
    await s3.remove(result.value.imageKey);
  }

  return result.isOk() ? ok(true) : err(result.error);
};
