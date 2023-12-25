import express from "express"
import compression from "compression"
import cors from "cors"

import logger from "./util/logger"
import "./database"
import routes from "./routes"

process.on("uncaughtException", (error) => {
    logger.error(error)
})

const app = express()
const port = process.env.PORT || 3000
const allowOrigins = ["localhost:5002"]

app.set("port", port)
app.use(compression())
app.use(express.json({ limit: "1kb" }))
app.use(express.urlencoded({ limit: "1kb", extended: true }))
app.use(cors({ origin: allowOrigins }))

app.use("/", routes)

export default app
