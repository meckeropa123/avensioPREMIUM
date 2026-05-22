import { z } from "zod";

const envSchema = z.object({
  DATABASE_URL: z.string().url(),
  JWT_ACCESS_SECRET: z.string().min(32),
  JWT_REFRESH_SECRET: z.string().min(32),
  S3_ENDPOINT: z.string().url(),
  S3_BUCKET: z.string(),
  YOOKASSA_SHOP_ID: z.string(),
  YOOKASSA_SECRET_KEY: z.string(),
  YANDEX_MAPS_API_KEY: z.string(),
  CDEK_CLIENT_ID: z.string(),
  CDEK_CLIENT_SECRET: z.string()
});

export const env = envSchema.parse(process.env);
