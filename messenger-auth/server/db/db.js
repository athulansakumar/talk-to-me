const mongoose = require('mongoose');

const initDb = (url) => {
    mongoose.connect(url,{useNewUrlParser: true });
};

module.exports ={
    mongoose,
    initDb
}
