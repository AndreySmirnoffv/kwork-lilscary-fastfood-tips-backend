import AWS from 'aws-sdk'
import dotenv from 'dotenv'

dotenv.config()

export const s3 = new AWS.S3({
    accessKeyId: String(process.env.AWS_ACCESS_KEY_ID),
    secretAccessKey: String(process.env.AWS_SECRET_ACCESS_KEY)
})