const bcrypt = require('bcrypt');

function hashPassword(password){
    const salt = bcrypt.genSaltSync();
    return bcrypt.hashSync(password,salt);
}

function comparePassword(raw,hash){
    return bcrypt.compareSync(raw,hash);
}

const access_level = {
    1:'Admin',
    2:'SMD',
    3:'Master distributor',
    4:'Distributor',
    5:'Retailer/Agent'
}
module.exports = { access_level, hashPassword, comparePassword };