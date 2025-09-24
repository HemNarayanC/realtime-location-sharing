import { configDotenv } from 'dotenv';
configDotenv();
import express from 'express'
const app = express();

app.get('/', (req, res) => {
    res.send("This is the index");
})

const PORT = process.env.PORT || 4000
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
})