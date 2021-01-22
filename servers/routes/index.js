const getSubtitles = require('youtube-captions-scraper').getSubtitles;
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.json({ openMessage: '백엔드에 연결되었습니다.' })
})

router.get('/group', (req, res) => {
  getSubtitles({
    videoID: 'vxiglrJovis',       // youtube video id
    lang: 'ko'                    // default: `en`
  }).then(function(captions) {
    console.log(captions);
    res.json({ subTitle: captions })
  });
});

module.exports = router;