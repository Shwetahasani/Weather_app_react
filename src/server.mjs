import express from 'express';
import cors from 'cors';

const app = express();
const PORT = 3002;

let data = []; // Placeholder for storing the data

app.use(express.json());
app.use(cors());

// Get all data
app.get('/api/data', (req, res) => {
  res.json(data);
});

// Add data
app.post('/api/data', (req, res) => {
  const newItem = req.body;
  newItem.id = generateId(); // Generate a unique ID for the new item
  data.push(newItem);
  res.status(201).json(newItem);
});

// Update data
app.put('/api/data/:id', (req, res) => {
  const itemId = req.params.id;
  const updatedItem = req.body;
  const index = data.findIndex((item) => item.id === itemId);
  if (index !== -1) {
    data[index] = { ...data[index], ...updatedItem };
    res.json(data[index]);
  } else {
    res.status(404).json({ error: 'Item not found' });
  }
});

// Delete data
app.delete('/api/data/:id', (req, res) => {
  const itemId = req.params.id;
  const index = data.findIndex((item) => item.id === itemId);
  if (index !== -1) {
    const deletedItem = data.splice(index, 1)[0];
    res.json(deletedItem);
  } else {
    res.status(404).json({ error: 'Item not found' });
  }
});

const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Helper function to generate a unique ID
function generateId() {
  return Math.random().toString(36).substr(2, 9);
}

export default server;
