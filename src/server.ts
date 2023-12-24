import app from "./app"
import logger from "./util/logger"

const port = app.get("port")
const env = app.get("env")
const server = app
    .listen(port, () => {
        console.log(
            "App is running at http://loclahost:%d in %s mode",
            port,
            env
        )
    })
    .on("error", (error) => logger.error(error))

export default server
