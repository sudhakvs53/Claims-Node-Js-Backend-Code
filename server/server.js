// import 'babel-polyfill';

// if (process.env.NODE_ENV === 'prod') {
//     require('babel-polyfill');
// }

// ========================== custom modules ==========================
import errHandler from './handlers/errorHandler';
import dbHandler from './handlers/dbHandler';

if (process.env.NODE_ENV === 'prod') {
    require('babel-polyfill');
}

import { dev } from './config';
import routes from './routes';

// ========================== dependecy modules ==========================
import bodyParser from 'body-parser';
import express from 'express';
const app = express();

// parsing req/res body to json
app.use(bodyParser.json({ limit: '50mb' }));

// for parsing the url encoded data using qs library
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, project_id");
    next();
});

// pass app object to routes method for registering routes
routes(app);

// error handling for all routes
errHandler(app);

// open db connection, when successful start application
dbHandler.openConnection().then(() => {
    app.listen(dev.PORT, () => {
        console.log(`server started ${dev.PORT} `);
        console.log(`Worker ${process.pid} started `);
    });
});

// kill process when Ctrl+C is hit
process.on('SIGINT', () => {
    console.log('bye bye !');
    dbHandler.closeConnection(() => {
        process.exit();
    });
});