import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import cors from "cors";
import userRoute from "./route/user.route.js"
const app = express();
app.use(express.json());
app.use(cors());
dotenv.config();

const port=process.env.PORT || 3000
const URI=process.env.MongoDBURI;
//connect to MongoDB
try {
  mongoose.connect(URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
  });
  console.log("Connected to mongoDB");
} catch (error) {
  console.log("Error: ", error);
}

app.use("/user",userRoute);


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})