const {qb} = require('../db/connectdb.js')

const index = (req,res) => {
    return res.render('ticket/create') 
}

module.exports = {index}