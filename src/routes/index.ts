import express from "express"

import score from "../routes/score"

const router = express.Router()

router.use("/score", score)

export default router