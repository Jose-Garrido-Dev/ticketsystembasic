const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/ticketsDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const recordSchema = new mongoose.Schema({
    id: Number,
    rut: String,
    first_name: String,
    last_name: String,
    address: String,
    buyer_type: String,
    ticket_number: Number,
});

const Record = mongoose.model('Record', recordSchema);

app.post('/api/saveRecord', async (req, res) => {
    const newRecord = new Record(req.body);
    await newRecord.save();
    res.json(newRecord);
});

app.listen(5000, () => {
    console.log('Server running on port 5000');
});
