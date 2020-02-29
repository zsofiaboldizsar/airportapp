const express = require('express');
const helmet = require('helmet');

const getAirportsRouter = require('./src/routes/get-airports');
const getFormRouter = require('./src/routes/get-form');

const PORT = process.env.PORT || '3000';
const app = express();

app.set('views', 'views');
app.set('view engine', 'ejs');

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

