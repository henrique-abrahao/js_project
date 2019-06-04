const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const mongo = require('./config/mongo');

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

mongo.connect(function (err) {
    if (err) {
        console.log(err);
        process.exit();
    }

    require('./routes/usuarioRoute')(app);

    app.listen(3000, function () {
        console.log('Server running on port 3000')
    });
});