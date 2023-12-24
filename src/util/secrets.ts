import logger from "./logger"
import dotenv from "dotenv"
import fs from "fs"

function loadEnvVariables() {
    if (fs.existsSync(".env")) {
        dotenv.config({ path: ".env" })
    }
}

function handleMissingEnvVariable(variableName: string) {
    logger.error(`Missing environment variable: ${variableName}`)
}

function checkRequiredEnvVariables(
    requiredVariables: { name: string; value: string | undefined }[]
): boolean {
    let isValid = true

    requiredVariables.forEach(({ name, value }) => {
        if (!value) {
            handleMissingEnvVariable(name)
            isValid = false
        }
    })

    return isValid
}

loadEnvVariables()

export const ENVIRONMENT = process.env.NODE_ENV
export const MONGODB_URI = process.env.MONGODB_URI

const requiredVariablesToCheck: { name: string; value: string | undefined }[] =
    [{ name: "MONGODB_URI", value: MONGODB_URI }]

if (!checkRequiredEnvVariables(requiredVariablesToCheck)) {
    setTimeout(() => {
        process.exit(1)
    }, 100)
}
