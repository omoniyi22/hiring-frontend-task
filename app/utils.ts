import dotenv from "dotenv"
dotenv.config()

export const NEXT_BACKEND_URL: any = process.env.NEXT_PUBLIC_BACKEND_URL
export const NEXT_BACKEND_PUBLIC_KEY: any = process.env.NEXT_PUBLIC_BACKEND_PUBLIC_KEY
export const NEXT_CLOUDFRONT_URL: any = process.env.NEXT_PUBLIC_CLOUDFRONT_URL

console.log({ NEXT_BACKEND_URL })