// < 프론트에서 로부터 신호 받으면 프론트로 데이터 전송하는 구간 >
const getSubtitles = require('youtube-captions-scraper').getSubtitles;
const express = require('express');
const router = express.Router();


// 1. 프론트에 백엔드 연결됐다는 문구 전송 (http://localhost:3010/api)
router.get('/', (req, res) => {
  res.json({ openMessage: '백엔드에 연결되었습니다.' })
})

// 2. 유튜브 자막 가져오기 (http://localhost:3010/api/subtitle)
router.get('/subtitle', (req, res) => {
  console.log("프론트에서 받은 자막 유튜브 링크: ", req.query.youtube_link);

  getSubtitles({
    videoID: req.query.youtube_link,    // 프론트에서 받은 youtube video id
    lang: 'ko'                          // default: `en`
  }).then((captions) => {
    res.json({ subTitle: captions })    // 프론트로 보내는 자막 데이터
  }).catch((err) => {
    console.log("/subtitle 서버 에러: ", err);
  });
});

module.exports = router;