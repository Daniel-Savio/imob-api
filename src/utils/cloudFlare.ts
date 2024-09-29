import { S3Client } from "@aws-sdk/client-s3"
import { env } from "../env"


export const cloudflare = new S3Client({
    region: 'auto',
    endpoint: "https://bc775897bb7da823f6b5f68020045c66.r2.cloudflarestorage.com",
    credentials: {
        accessKeyId: "1b01ba2457cdac2ef4fe51f8e0a531dd",
        secretAccessKey: "6e33574cf5c3c9e4ffbdbe33c794ad78afe0fe2afcc61493431db2d36e56f2f3"
    }
})