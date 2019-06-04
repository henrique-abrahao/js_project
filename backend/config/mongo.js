const mongoose = require('mongoose');

function connect(callback) {
      mongoose.connect('mongodb://localhost:27017/rank', { useMongoClient: true })
            .then(conn => {
                  console.log('Mongo connected');
                  callback();
            })
            .catch(err => {
                  console.log('Mongo connection err');
                  callback(err);
            });
}


module.exports = {
      connect
}