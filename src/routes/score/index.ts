import { type Request, type Response, Router } from "express"

import ScoreRepo from "../../database/repository/ScoreRepo"
import { type ScoreDocument } from "../../database/model/Score"
import logger from "../../util/logger"

const router = Router()

/**
 * Get scores.
 * @route GET /scores
 * @route GET /scores?page=1&limit=10
 */
router.get("/", async (req: Request, res: Response) => {
    try {
        const pageNumber = req.query.pageNumber
            ? parseInt(req.query.pageNumber as string)
            : 1

        const limit = req.query.limit ? parseInt(req.query.limit as string) : 10

        const scores = ScoreRepo.getScoreAndPaginated(pageNumber, limit)

        res.status(200).json({ message: "Score fetched successfully", scores })
    } catch (error: unknown) {
        logger.error(`Failed to get scores: ${error}`)

        res.status(500).json({
            message: "Failed to get scores",
        })
    }
})

/**
 * Get score.
 * @route POST /scores
 */
router.post("/", async (req: Request, res: Response) => {
    try {
        const createdScore = await ScoreRepo.create({
            username: req.body.username,
            wpm: req.body.wpm,
            accuracy: req.body.accuracy,
            correctTypedWords: req.body.correctTypedWords,
            incorrectTypedWords: req.body.incorrectTypedWords,
            correctKeyStrokes: req.body.correctKeyStrokes,
            incorrectKeyStrokes: req.body.incorrectKeyStrokes,
            duration: req.body.duration,
        } as ScoreDocument)

        res.status(200).json({
            message: "Score created successfully",
            createdScore,
        })
    } catch (error: unknown) {
        logger.error(`Failed to create score: ${error}`)

        res.status(500).json({
            message: "Failed to create score",
        })
    }
})

export default router