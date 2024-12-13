const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();
const bodyParser = require("body-parser")
const cookieParser = require("cookie-parser");


port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.listen(port, () => {
    console.log(`Blog is listening at http://localhost:${port}`);
});

const blogRoutes = require('./routes/user.route')
app.use('/api/users', blogRoutes);

const authRoutes = require('./routes/auth.routes');
app.use('/api/auth', authRoutes);



app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use((req, res, next) => {
    // Set CORS headers
    res.header("Access-Control-Allow-Origin", process.env.FRONTEND_URL); // Replace with your frontend domain
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
    res.header("Access-Control-Allow-Credentials", "true"); // Allow credentials (cookies, etc.)

    // Pass to next layer of middleware
    next();
});


