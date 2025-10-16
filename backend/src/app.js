const express = require('express');
const db = require('./db/db')
const cookieParser = require('cookie-parser');
const authRouter = require('./routes/auth.routes')
const  foodRouter = require('./routes/food.routes')
const app = express();
const cors = require('cors');
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));


app.use(cookieParser());

db()
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/api/auth', authRouter)
app.use('/api/food', foodRouter)

app.use(express.static('public'));
app.set('view engine', 'ejs');
app.set('views', 'src/views');

app.get('/', (req, res) => {
  res.send('Hello World!');
});


module.exports = app;

