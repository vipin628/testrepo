const {qb} = require('../db/connectdb.js')

const dashboard = async (req,res) => {
    virtual= await qb.get_where('virtual_accounts',{'userId' : req.session.data.id});
    rem = await qb.select('remarks').get_where('users',{'id' : '1'});
    return res.render('dashboard', {'virtual' : virtual,'alert' : rem});
}

module.exports = {dashboard}