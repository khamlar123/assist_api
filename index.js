const express = require('express');
const app = express();
const cors = require('cors');
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));


app.get('/', async (req, res) => {
    res.status(200).json('api working');
});

const api = require('./controllers/index');
app.use('/api', api);


app.listen(port, () => {
    console.log(`server is running on port ${port}`);
});

module.exports = app;