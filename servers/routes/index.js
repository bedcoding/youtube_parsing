// < 프론트에서 로부터 신호 받으면 프론트로 데이터 전송하는 구간 >
const getSubtitles = require('youtube-captions-scraper').getSubtitles;
const express = require('express');
const router = express.Router();

// http://localhost:3010/api
router.get('/', (req, res) => {
  res.json({ openMessage: '백엔드에 연결되었습니다.' })
})

// http://localhost:3010/api/subtitle (유튜브 자막 가져오기)
router.get('/subtitle', (req, res) => {
  getSubtitles({
    videoID: 'vxiglrJovis',       // youtube video id
    lang: 'ko'                    // default: `en`
  }).then(function(captions) {
    console.log(captions);
    res.json({ subTitle: captions })
  });
});

module.exports = router;