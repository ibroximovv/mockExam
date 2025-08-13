import * as dotenv from 'dotenv'
import { Logger } from '@nestjs/common'

dotenv.config()

export type ConfigType = {
    API_PORT: number
    DATABASE_URL: string
    ACCESS_TOKEN_KEY: string
    ACCESS_TOKEN_TIME: string
}

const requiredVariables = [
    'API_PORT',
    'DATABASE_URL',
    'ACCESS_TOKEN_KEY',
    'ACCESS_TOKEN_TIME',
]

const missingVariables = requiredVariables.filter((variable) => {
    const value = process.env[variable]
    return !value || value.trim() === ''
})

if (missingVariables.length > 0) {
    Logger.error(`Missing or empty required environment variables: ${missingVariables.join(', ')}`),
        process.exit(1)
}

export const config: ConfigType = {
    API_PORT: parseInt(process.env.API_PORT as string, 10),
    DATABASE_URL: process.env.DATABASE_URL as string,
    ACCESS_TOKEN_KEY: process.env.ACCESS_TOKEN_KEY as string,
    ACCESS_TOKEN_TIME: process.env.ACCESS_TOKEN_TIME as string,
}