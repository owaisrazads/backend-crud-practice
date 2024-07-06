

import express from 'express';
import connectDB from './config/db.js';
import dotenv from 'dotenv';
import todoRoutes from "./routers/todoRoutes.js"

dotenv.config();

const app = express();

// Connect to the database
connectDB();

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


app.use(express.json())



// Routes
app.use('/todos', todoRoutes);


// Basic route for testing
app.get('/', (req, res) => {
  res.send('API is running...');
});
