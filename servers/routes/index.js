// < 프론트로부터 신호 받으면 프론트로 데이터 전송하는 구간 >
const getSubtitles = require('youtube-captions-scraper').getSubtitles;
const express = require('express');
const ytdl = require("ytdl-core");
const router = express.Router();



// 1. 프론트에 백엔드 연결됐다는 문구 전송 (http://localhost:4000/api)
router.get('/', (req, res) => {
  res.json({ openMessage: '백엔드에 연결되었습니다.' })
})



// 2. 유튜브 자막 가져오기 (http://localhost:4000/api/subtitle?youtubeLink=유튜브링크&language=ko)
router.get('/subtitle', (req, res) => {
  if (req.query.youtubeLink === '') {
    res.json({ subTitle: "유튜브 아이디가 비어 있습니다." })
    return;
  }

  // 추출할 자막의 언어 설정 (기본값: 한국어)
  let language = 'ko';
  if(req.query.language) {
    language = req.query.language;
  }  

  getSubtitles({
    videoID: req.query.youtubeLink,     // 프론트에서 받은 youtube video id
    lang: language                      // 값을 안 보낼 경우 default: `en`
  }).then((captions) => {
    res.json({ subTitle: captions })    // 프론트로 보내는 자막 데이터
  }).catch((err) => {
    console.log("err: ", err);
    res.json({ subTitle: "[서버 오류 발생] 자막 데이터를 못 받았습니다. 해당 언어의 자막이 없거나, 유효한 유튜브 ID가 아니거나, 회사 노트북이 TruAccess 같은 사이트에서 로그아웃이 되어 있는지 확인 바랍니다." })
  });
});



// 3. 유튜브 음악 다운로드 (http://localhost:4000/api/DownloadAudio?youtubeLink=유튜브링크)
router.get("/DownloadAudio", (req, res) => {
  let URL = req.query.youtubeLink;
  res.header("Content-Disposition", 'attachment; filename="file.mp3"');

  ytdl(URL, {
    format: "mp3",
    quality: "highestaudio",
  }).pipe(res);
});

module.exports = router;