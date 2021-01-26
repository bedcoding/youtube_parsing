## 실행방법
"yarn start": 서버 + 클라이언트 동시 실행 (http://localhost:3000, http://localhost:4000) <br/>
"yarn start:client": 클라이언트만 실행 (http://localhost:3000) <br/>
"yarn start:server": 서버만 실행 (http://localhost:4000)

-----

## 전체구조
일반 react 프론트 프로젝트에 "servers 폴더"를 끼워넣어서 백엔드랑 프론트가 한 곳에 같이 있습니다.
처음에는 백엔드를 별도의 프로젝트로 떼는 것도 생각해봤지만 그러면 깃허브에 프로젝트를 2개 만들어야 해서 일단은 붙였습니다.
나중에 필요하면 servers 폴더만 따로 떼서 다른 곳으로 옮기면 분리가 가능합니다.


## 프론트 설명

복사해서 그대로 사용할 수 있도록 각 기능들을 분리시켰습니다.
1. DownloadAudio.js : 링크 삽입후 해당 유튜브의 음악 다운로드
2. DownloadSubtitle.js : 링크 삽입후 해당 유튜브의 자막 추출 및 다운로드 (언어설정 가능)
3. GetLanguage.js : 링크 삽입후 해당 유튜브에서 사람이 직접 입력한 수동 자막이 존재하는지 체크 (자동 자막은 못 불러와서 다른 방법 찾아야 합니다.)



## 백엔드 설명
Servers/index.js 파일
1. 프론트에 백엔드 연결됐다는 문구 전송 (http://localhost:4000/api)

2. 유튜브 자막 추출 (http://localhost:4000/api/subtitle?youtubeLink=유튜브링크)

3. 유튜브 음악 다운로드 (http://localhost:4000/api/DownloadAudio?youtubeLink=유튜브링크)

2번 자막 API는 다운로드가 아닌 자막 추출만 하고 있습니다. 다운로드는 프론트에서 합니다. <br/>
3번 음악 API는 누르자마자 바로 다운로드를 때립니다. <br/>


## 참고자료
https://github.com/syzer/youtube-captions-scraper (유튜브 자막추출 라이브러리) <br/>
https://dev.to/imjoshellis/simple-download-text-file-link-with-react-29j3 (텍스트 파일 다운로드) <br/>
https://www.npmjs.com/package/ytdl-core (유튜브 음악추출 + 다운로드 라이브러리)