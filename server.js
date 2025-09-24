import { configDotenv } from 'dotenv';
configDotenv();
import express from 'express'
import { createServer } from 'http';
import { Server } from 'socket.io';
import { fileURLToPath } from 'url';
import path from 'path';

const app = express();

const httpServer = createServer(app);
const io = new Server(httpServer);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
console.log(path.join(__dirname, "public"));

app.get('/', (req, res) => {
    res.render("index");
});

io.on("connection", (socket) => {
    console.log("User Connected", socket.id);
})

const PORT = process.env.PORT || 4000
httpServer.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
})