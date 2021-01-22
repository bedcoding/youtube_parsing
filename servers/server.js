const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = process.env.PORT || 3010;
const route = require('./routes/index');

// 외부에서 접근가능하게 하려면 주석치지 마라고 하네
// const cors = require('cors');
// app.use(cors());

app.use(bodyParser.json());
app.use('/api', route);  // app.use('/api', (req, res)=> res.json({subTitle:'bryan'}));

app.listen(port, ()=>{
    console.log(`express is running on ${port}`);
})