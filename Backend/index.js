import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import userRoute from './route/user.route.js';
import cartRoute from './route/cart.route.js';

// Initialize environment variables
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

const port = process.env.PORT || 3000;
const URI = process.env.MongoDBURI;

// Connect to MongoDB
mongoose.connect(URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(error => console.error('Error connecting to MongoDB:', error));

app.use('/user', userRoute);
app.use('/cart', cartRoute);

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
app.get('/test', (req, res) => {
  res.send('Test route is working');
});
