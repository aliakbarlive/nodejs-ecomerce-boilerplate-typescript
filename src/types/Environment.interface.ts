
import { Algorithm } from 'jsonwebtoken'
export interface EnvironmentInterface {
    readonly NODE_ENV: string
    readonly APP_ENV: string
    readonly DB_HOST: string
    readonly DB_USER?: string
    readonly DB_PASS?: string
    readonly DB_PORT: number
    readonly DB_NAME: string
    readonly DB_TYPE: string
    readonly DB_CONNECTION: string
    readonly SERVER_PROTOCOL: string
    readonly SERVER_HOST: string
    readonly SERVER_PORT: number
    readonly LOGGER_HOST: string
    readonly LOGGER_PORT: number
    readonly MONGO_URI: string
    readonly REDIS_HOST?: string
    readonly REDIS_PORT?: number
    readonly REDIS_PASS?: string
    readonly ADMIN_USER?: string
    readonly ADMIN_PASS?: string
    readonly JWT_SECRET?: string
}

export interface JwtModel {
    readonly key: string
    readonly expiration: number | string
    readonly algorithm: Algorithm
    readonly cache_prefix: string
    readonly allow_renew: boolean
    readonly renew_threshold: number
}

interface MS_Configs {
    [key: string]: {
        url: string
        paths: {
            [key: string]: string
        }
    }
}

export interface StringType {
    [key: string]: string
}

export interface RegexType {
    [key: string]: RegExp
}

export interface ConfigModel {
    readonly jwt: JwtModel
    readonly env: EnvironmentInterface
    readonly baseURL: string
    readonly roleTypes: StringType
    readonly sortTypes: StringType
    readonly MS: MS_Configs
    readonly regex: RegexType
    readonly maxPageSizeLimit: number
    readonly ssl: {
        keyPath: any
        crtPath: any
    }
}
