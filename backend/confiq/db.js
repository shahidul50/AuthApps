const mongoose = require('mongoose')

const url = process.env.NODE_ENV === 'development' ? process.env.DEVELOPMENT_DB : process.env.PRODUCTION_DB

const connectDB = async () => {
  try {
    await mongoose.connect(url)
    console.log('DB connection successfull')
  } catch (err) {
    console.log(err.message)
  }
}

module.exports = connectDB