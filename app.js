const express = require('express');
const getAirportsRouter = require('./src/routes/get-airports');
const getFormRouter = require('./src/routes/get-form');

const PORT = process.env.PORT || '3000';
const app = express();
/*-----------------------------------------
   Add middlewares
   ------------------------------------------ */
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.set('views', 'views');
app.set('view engine', 'ejs');

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

