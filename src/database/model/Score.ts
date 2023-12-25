import { type Document, model, Schema, Types } from "mongoose"

export type ScoreDocument = Document & {
    _id: Types.ObjectId
    username: string
    wpm: number
    accuracy: number
    correctTypedWords: number
    incorrectTypedWords: number
    correctKeyStrokes: number
    incorrectKeyStrokes: number
    duration: number
    date: Date
}

const scoreSchema = new Schema<ScoreDocument>({
    username: { type: String, trim: true, maxlength: 18, sparse: true },
    wpm: Number,
    accuracy: Number,
    correctTypedWords: Number,
    incorrectKeyStrokes: Number,
    correctKeyStrokes: Number,
    incorrectTypedWords: Number,
    duration: Number,
    date: Date,
})

export const ScoreModel = model<ScoreDocument>("Score", scoreSchema)
