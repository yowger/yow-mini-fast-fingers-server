import express from "express"
import compression from "compression"
import mongoose from "mongoose"
import { MONGODB_URI } from "./util/secrets"

const app = express()
const port = process.env.PORT || 3000

app.set("port", port)
app.use(compression())
app.use(express.json({ limit: "1kb" }))
app.use(express.urlencoded({ limit: "1kb", extended: true }))

export default app
