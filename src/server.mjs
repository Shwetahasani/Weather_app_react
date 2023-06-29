// 2ND TASK (CRUD OPERATION)**
// It starts listening on port 3002 with app.listen(PORT, callback) Once the server is running,  


// try " npm run server " Before "npm start"***************************


import express from 'express';
import cors from 'cors';
 // two dependies i used cors & express
const app = express();
const PORT = 3002;

let data = []; 

 app.use(express.json());    //JSON (parsing) for updated req
app.use(cors());


app.get('/api/data', (req, res) => {
  res.json(data);
});

app.post('/api/data', (req, res) => {
  const newItem = req.body;
  newItem.id = generateId(); 
  data.push(newItem);
  res.status(201).json(newItem);
});


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


function generateId() {
  return Math.random().toString(36).substr(2, 9);
}

export default server;
