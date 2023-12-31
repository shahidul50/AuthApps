import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
dotenv.config();
import morgan from 'morgan';
import cookiePerser from 'cookie-parser';

//my files
import connectDB from './confiq/db.js';
import userRoutes from './routes/userRoutes.js';  
import {notFound,errorHandler} from './middlewares/errorMiddleware.js';

//initialize express
const app = express();

app.use(morgan('dev'));
//parse sending data into json formate
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookiePerser());

const PORT = process.env.PORT || 5000

//connection to the database
connectDB();

//user api
app.use('/api/users', userRoutes)

// Serve frontend
if (process.env.NODE_ENV === 'production') {
    const __dirname = path.resolve();
    app.use(express.static(path.join(__dirname, '../frontend/dist')));
  
    app.get('*', (req, res) =>
      res.sendFile(path.resolve(__dirname, 'frontend', 'dist', 'index.html'))
    );
} else {
    app.get('/', (req, res) => res.send('API is running....'));
}

//error Handler
app.use(notFound)
app.use(errorHandler)

app.listen(PORT, ()=> {
    console.log(`Server started on port ${PORT}`);
})
