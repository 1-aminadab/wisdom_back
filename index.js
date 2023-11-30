const express = require('express');
const http = require('http')
const cookieParser = require('cookie-parser');
const authRoutes = require('./routes/authRoutes');
const { authenticateUser } = require('./middleware/authMiddleware');
const { PORT } = require('./config/config');
const socketIO = require('socket.io')
const app = express();
const server = http.createServer(app)
const io = socketIO(server)
const connectDB = require('./db/mongo')
require('dotenv').config();
// CORS middleware
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*'); // Allow all origins
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
    return res.status(200).json({});
  }
  next();
});

// Middleware
app.use(express.json());
app.use(cookieParser());

// Routes
app.use('/auth', authRoutes);

// Example protected route
app.get('/protected', authenticateUser, (req, res) => {
  res.json({ message: 'Access granted to protected route', user: req.user });
});
const port  = 3001
// Start serverconst start = async()=>{
  const start = async()=>{
    try {
        await connectDB(process.env.MONGO_URI)
        // process.setMaxListeners(0)
        app.listen(port, ()=> console.log(`server listen at port ${port}... `))
    } catch (error) {
        console.log(error);
    }
}
start()
module.exports.io = io;