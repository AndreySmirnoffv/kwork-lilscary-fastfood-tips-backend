import AWS from '@aws-sdk/client-s3';
import dotenv from 'dotenv';
dotenv.config();
export const s3 = new AWS.S3({
    region: String(process.env.AWS_REGION),
    endpoint: String(process.env.AWS_ENDPOINT),
    credentials: {
        accessKeyId: String(process.env.AWS_ACCESS_KEY_ID),
        secretAccessKey: String(process.env.AWS_SECRET_ACCESS_KEY),
    }
});
