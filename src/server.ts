import app from "./app"

const port = app.get("port")
const env = app.get("env")
const server = app.listen(port, () => {
    console.log("App is running at http://loclahost:%d in %s mode", port, env)
})

export default server
