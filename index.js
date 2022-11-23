const express = require('express');
const app = express();
const cors = require('cors');
const port = process.env.PORT || 3000;
const api = require('./controllers/index')
app.use(cors());
app.use(express.json());



app.get('/', async (req, res) => {
    res.status(200).json('api working');
});

app.use('/api', api);


app.listen(port, () => {
    console.log(`server is running on port ${port}`);
});
