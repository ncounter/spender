import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3001;
const DB_PATH = path.join(__dirname, 'db.json');

app.use(cors());
app.use(express.json());

app.get('/api/expenses', (req, res) => {
  fs.readFile(DB_PATH, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading db.json:', err);
      return res.status(500).json({ error: 'Failed to read data' });
    }
    res.json(JSON.parse(data));
  });
});

app.post('/api/expenses', (req, res) => {
  const data = req.body;
  fs.writeFile(DB_PATH, JSON.stringify(data, null, 2), 'utf8', (err) => {
    if (err) {
      console.error('Error writing to db.json:', err);
      return res.status(500).json({ error: 'Failed to save data' });
    }
    res.json({ message: 'Data saved successfully' });
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});