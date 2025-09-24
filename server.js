import { configDotenv } from 'dotenv';
configDotenv();
import express from 'express'
import { fileURLToPath } from 'url';
import path from 'path';

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.set("view engine", "ejs");
app.set(express.static(path.join(__dirname, "public")));
console.log(__dirname);

app.get('/', (req, res) => {
    res.send("This is the index");
});

const PORT = process.env.PORT || 4000
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
})