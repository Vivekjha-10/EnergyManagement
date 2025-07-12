const path = require('path')
const dotenv = require('dotenv')

const logsDirectory = process.env.LOGS_DIRECTORY + (process.env.HOSTNAME || '')
dotenv.config({
    path: path.join(__dirname, `../../environment/.${process.env.NODE_ENV}.env`),
  })

module.exports = {
    rootDir: path.resolve(__dirname),
    port: process.env.API_PORT,
    encryption: process.env.ENCRYPTION,
    apiURL: process.env.API_URL,
    configId: process.env.CONFIG_ID,
    version: process.env.VERSION,
    logsDirectory: logsDirectory,
    log: {
        console: {
            general_enable: process.env.LOG_CONSOLE_GENERAL_ENABLE,
            exception_enable: process.env.LOG_CONSOLE_EXCEPTION_ENABLE,
        },
        file: {
            general_enable: process.env.LOG_FILE_GENERAL_ENABLE,
            exception_enable: process.env.LOG_FILE_EXCEPTION_ENABLE,
        },
    },
    db_mysql: {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        dbname: process.env.DB_NAME,
        user: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        limit: process.env.DB_LIMIT,
        timezone: process.env.DB_TIMEZONE,
    },
    jwtTokenKey: process.env.JWT_SECRET_KEY,
    cryptoKey: process.env.CRYPTO_KEY,
    timeout: process.env.TIMEOUT,
    SMTPHost: process.env.SMTP_HOST,
    SMTPEmail: process.env.SMTP_EMAIL,
    SMTPPassword: process.env.SMTP_PASSWORD,
    SMTPFromName: process.env.SMTP_FROMNAME,
    awsAccessKey: process.env.AWS_ACCESS_KEY,
    awsSecretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    awsS3AssetsBucket: process.env.AWS_S3_ASSETS_BUCKET,
    awsS3AssetsBucketURL: process.env.AWS_S3_ASSETS_BUCKET_URL,
    awsS3AssetDir: process.env.AWS_S3_ASSET_DIR,
    awsS3UserDir: process.env.AWS_S3_USER_DIR,
    awsS3NFTDir: process.env.AWS_S3_NFT_DIR
}
