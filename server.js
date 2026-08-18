// Import the built-in 'http module'
// const http = require('http');
// Import express
const express = require('express');
const server = express();
// Import router
const router = require('./routes/router');
// Import mongoose
const mongoose = require('mongoose');
// const mongo = require('mongodb');
// Import path
const path = require('path');
// Import dotenv
const dotenv = require('dotenv');


// Import router
const deploymentRoutes = require('./routes/router')
server.use('/',express.static(path.join(__dirname,'public')))
server.use(express.urlencoded({extended:true}));
server.use('/',deploymentRoutes)
server.set('view engine', 'ejs')

dotenv.config({ path: './config.env' });

// async function to connect to DB
async function connectDB() {
try {
await mongoose.connect(process.env.DB);
console.log("MongoDB connected successfully");
} catch (error) {
console.error("MongoDB connection failed:", error.message);
process.exit(1);
}
};
function startServer(){
// Define the hostname and port for the server
const hostname = 'localhost';
const port = 8000;
server.listen(port, hostname, () => {
 console.log(`Server running at http://${hostname}:${port}/`);
});
};

// call connectDB first and when connection is ready, we start the web server
connectDB().then(startServer);


