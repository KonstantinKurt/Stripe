import express from 'express';
const app = express();
require('dotenv').config();
const bodyParser = require('body-parser');
const cors = require('cors');
const handlebars = require('express-handlebars').create({ defaultLayout: 'main' });


app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.use(express.static(__dirname + '/public'));

const stripeRouter  = require('./routes/stripeRouter.js');

app.use('/stripe', stripeRouter);

app.listen(process.env.PORT, () => {
    console.log(`Server runs on http://localhost:  ${process.env.PORT}  ; Ctrl+C for exit `);
    //connectDB();
});

app.get('/', (req, res)=> {
    res.render('start');
});

