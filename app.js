const express = require('express');
const app = express();
const port = 3000;

const Avengers = require('./src/avengers');
//Mongodb Connection Detail
const mongoose = require('mongoose');
const mongoConnectionString = `mongodb://localhost/meDb`;
mongoose.connect(mongoConnectionString); // process.MONGOOSE = mongoose.connect(mongoConnectionString);
var mConnect = mongoose.connection;
const {Schema} = mongoose;
const {objectId} = Schema;
mConnect.on('connected', () => console.log('Connected'));
mConnect.on('disconnected', () => console.log('Disconnected'));
mConnect.on('error', () => console.log('Error'));
mConnect.once('open', () => {
    console.log('Connection Open');
});
process.on('SIGINT', () => {
    mConnect.close(() => {
        console.log('Mongoose Connection Closed');
        process.exit(0);
    });
});


app.get('/', (req, res) => res.send('Hello World'));

app.get('/avengers/:name/:nickname', (req, res) => {
    let name = req.params.name;
    let nickname = req.params.nickname;
    res.send(`Hello Ezhil - ${name} - ${nickname}`);
    const avenger = new Avengers({
        _id : new mongoose.Types.ObjectId(),
        Name : name,
        NickName : nickname
    });
    avenger.save().then(resp => console.log(resp)).catch(err => console.log(err));
});

app.get('/avengers/:aid', (req, res) => {
    Avengers.findById(req.params.aid).exec().then(resp => {
        if(resp)         
            res.send(`${resp._id} - ${resp.Name} - ${resp.NickName}`);
        else
            res.send(`No Document Found`);
    }).catch(err => res.send(`Error`));
});

app.listen(port, () => console.log(`Example app listening on port ${port} - ${__dirname}`) );
