import * as dotenv from "dotenv";

dotenv.config({ path: `${__dirname}/../../.env` });

export const JWT_SECRET = process.env.JWT_SECRET;
