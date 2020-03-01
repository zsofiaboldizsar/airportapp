const express = require('express');
const helmet = require('helmet');
const path = require('path');

const getAirportsRouter = require('./src/routes/get-airports');
const getFormRouter = require('./src/routes/get-form');

const PORT = process.env.PORT || '3000';
const app = express();

app.set('views', path.join(__dirname, 'src/views'));
app.set('view engine', 'pug');

/*-----------------------------------------
   Add middlewares
   ------------------------------------------ */
const middlewares = [
    helmet(),
    express.urlencoded({extended: false}),
    express.json(),
];
app.use(middlewares);

/*-----------------------------------------
   Register routes
   ------------------------------------------ */
app.use('/', getFormRouter);
app.use('/', getAirportsRouter);

/*-----------------------------------------
 Start Service
 ------------------------------------------ */
app.listen(PORT, (error) => {
    if (error)
        console.error(`Airport app cannot start on ${PORT}`, error);
    else
        console.log(`Airport app listening on port ${PORT}!`);
});

