import winston from "winston"
import fs from "fs"
import path from "path"
import DailyRotateFile from "winston-daily-rotate-file"

const dir = path.resolve("logs")
if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir)
}

const logLevel = process.env.NODE_ENV === "production" ? "error" : "debug"

const dailyRotateFile = new DailyRotateFile({
    level: logLevel,
    // @ts-ignore
    filename: dir + "/%DATE%.log",
    datePattern: "YYYY-MM-DD",
    zippedArchive: true,
    handleExceptions: true,
    maxSize: "20m",
    maxFiles: "30d",
    format: winston.format.combine(
        winston.format.errors({ stack: true }),
        winston.format.timestamp(),
        winston.format.json()
    ),
})

const options: winston.LoggerOptions = {
    transports: [
        new winston.transports.Console({
            level: logLevel,
            format: winston.format.combine(
                winston.format.errors({ stack: true }),
                winston.format.timestamp(),
                winston.format.colorize(),
                winston.format.simple()
            ),
        }),
        dailyRotateFile,
    ],
    exceptionHandlers: [dailyRotateFile],
    exitOnError: false,
}

const logger = winston.createLogger(options)

export default logger
