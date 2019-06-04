const pg = require("pg");
var conString = "postgres://postgres:159753@localhost:5432/teste";

module.exports = {
    execute
}

function execute(procedure, values, callback) {
    pg.connect(conString, function (err, client, done) {
        if (err) {
            console.log("not able to get connection " + err);
            res.status(400).send(err);
        }
        client.query(`SELECT * FROM ${procedure}`, values, function (err, result) {
            done();
            if (err) {
                console.log('Postgres err', err);
                return callback(err);
            }

            callback(null, result.rows);
        });
    })
}