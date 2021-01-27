const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = process.env.PORT || 4000;
const route = require('./routes/index');

// 외부에서 접근가능하게 하려면 주석치지 마라고 하네
const cors = require('cors');
app.use(cors());

// 프론트에서 http://localhost:4000/api 형태로 신호가 날아오면 routes/index.js 파일 발동
app.use(bodyParser.json());
app.use('/api', route);

// 최초 실행시 호출
app.listen(port, ()=>{
    console.log(`express is running on ${port}`);
})