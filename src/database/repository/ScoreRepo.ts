import { type ScoreDocument, ScoreModel } from "../model/Score"

async function create(score: ScoreDocument): Promise<ScoreDocument> {
    score.date = new Date()
    const createdScore = await ScoreModel.create(score)
    return createdScore.toObject()
}

async function getScoreAndPaginated(
    pageNumber: number,
    limit: number
): Promise<ScoreDocument[]> {
    return ScoreModel.find({})
        .skip(limit * (pageNumber - 1))
        .limit(limit)
        .sort({ date: "desc" })
        .lean()
        .exec()
}

export default {
    create,
    getScoreAndPaginated,
}
