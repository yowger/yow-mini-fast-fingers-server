import mongoose, { type ConnectOptions } from "mongoose"
import logger from "../util/logger"
import { MONGODB_URI } from "../util/secrets"

const options: ConnectOptions = {
    autoIndex: true,
}

mongoose.connect(MONGODB_URI, options)

mongoose.connection.on("connected", () => {
    logger.debug("Mongoose default connection open to " + MONGODB_URI)
})

mongoose.connection.on("error", (error) => {
    logger.error("Mongoose default connection error: " + error)
})

mongoose.connection.on("disconnected", () => {
    logger.info("Mongoose default connection disconnected")
})

mongoose.connection.on("disconnected", () => {
    logger.info("Mongoose default connection disconnected")
})

export const connection = mongoose.connection
