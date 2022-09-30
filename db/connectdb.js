// const mongoose = require('mongoose');

// const connectDB = async (DATABASE_URL) => {
//     console.log('ready to connect')
//     try {
//         const DB_OPTIONS = {
//             dbName: 'pandb'
//         }
//         await mongoose.connect(DATABASE_URL,DB_OPTIONS);
//         console.log('db connected successfully');
//     }
//     catch(err){
//         console.log(err);
//     }
// }

const QueryBuilder = require('node-querybuilder');
const settings = {
    host: 'localhost',
    database: 'pan',
    user: 'root',
    password: '',
    debug: true,
    // pool_size: 1000
};
var qb = new QueryBuilder(settings, 'mysql');


module.exports = {qb}