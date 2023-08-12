require('dotenv').config()
const express = require('express')
const path = require('path')
const morgan = require('morgan')

//my files
const connectDB = require('./confiq/db')
const userRoutes = require('./routes/userRoutes');
const errorHandler = require('./middlewares/errorHandler');

connectDB();
const app = express()

app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({extended: false}))
const PORT = process.env.PORT || 5000

//user api
app.use('/api/users', userRoutes)

// Serve frontend
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../frontend/build')));
  
    app.get('*', (req, res) =>
      res.sendFile(
        path.resolve(__dirname, '../', 'frontend', 'build', 'index.html')
      )
    );
  } else {
    app.get('/', (req, res) => res.send('Please set to production'));
  }
//error Handler
app.use(errorHandler)

app.listen(PORT, ()=> {
    console.log(`Server started on port ${PORT}`);
})
