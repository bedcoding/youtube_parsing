### 실행방법
"yarn start": 서버 + 클라이언트 동시 실행 (http://localhost:3000, http://localhost:4000) <br/>
"yarn start:client": 클라이언트만 실행, <br/>
"yarn start:server": 서버만 실행


### 전체구조
일반 react 프론트 프로젝트에 "servers 폴더"를 끼워넣어서 백엔드랑 프론트가 한 곳에 같이 있습니다.
처음에는 백엔드를 별도의 프로젝트로 떼는 것도 생각해봤지만 그러면 깃허브에 프로젝트를 2개 만들어야 해서 일단은 붙였습니다.
나중에 필요하면 servers 폴더만 따로 떼서 다른 곳으로 옮기면 분리가 가능합니다.


## 프론트 설명
복사해서 그대로 사용할 수 있도록 자막 다운로드(DownloadSubtitle.js), 음악다운로드(DownloadAudio.js) 기능을 아예 분리시켰습니다.


## 백엔드 설명
1. 자막(/subtitle) API는 다운로드가 아닌 자막 추출만 하고 있습니다. 백엔드에서 추출한 자막 텍스트를 프론트에 보내서 다운로드합니다. <br/>
2. 음악(/DownloadAudio) API는 누르자마자 바로 다운로드를 때립니다. <br/>
드래곤볼 모으는 것처럼 라이브러리를 주워모으다보니 서로 다르게 동작합니다.


### 프론트 + 백엔드 연동에 참고한 자료
https://hello-bryan.tistory.com/121 <br/>
https://hello-bryan.tistory.com/122


### 유튜브 자막추출에 사용한 라이브러리
https://github.com/syzer/youtube-captions-scraper


### 유튜브 음악추출에 사용한 라이브러리
https://www.npmjs.com/package/ytdl-core


### 텍스트 파일 다운로드에 참조한 소스코드
https://dev.to/imjoshellis/simple-download-text-file-link-with-react-29j3