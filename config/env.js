import { config } from "dotenv";

config({path: `.env.${process.env.NODE_ENV || 'development'}.local`});

export const { 
    PORT, 
    NODE_ENV, 
    DB_URI,
    JWT_SECRET,
    JWT_EXPIRES_IN,
    ARCJET_KEY,
    ARCJET_ENV,
    B2_KEY_ID,
    KEYNAME,
    APPLICATIONKEY,
    B2_BUCKET_ID,
    B2_BUCKET_NAME,
    TEST_SECRET_KEY,
    TEST_PUBLIC_KEY,
} = process.env;