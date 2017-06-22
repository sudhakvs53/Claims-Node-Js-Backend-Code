import mongoose from 'mongoose';
import { dev } from './../config';
const dburl = dev.dbUrl.abinashLocalDBurl;

const db = mongoose.connection;
mongoose.Promise = global.Promise;

db.on('error', () => {
    console.log('error while communicating to database ');
});

exports.openConnection = () => {
    return mongoose.connect(dburl, (err) => {
        if (err) {
            return console.log('err while connecting to db ' + err);
        } else {
            console.log('db connected');
        }
    });
};

exports.closeConnection = () => {
    console.log('here');
    db.close().then(() => {
        console.log('db disconnected');
    });
};