const connectDB = require("./config/db");
const app = require("./app");
require("dotenv").config();
const port = process.env.PORT || 5000;


const startServer = async () => {
    try {
        await connectDB()
        app.listen(port, () => {
            console.log(`TeamSphere app listening on port ${port}`)
        });
    } catch (error) {
        console.error("error", error);
    }
}

startServer();