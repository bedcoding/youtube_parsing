import React, { useState, useEffect } from 'react';

function App(props) {
  const [openMessage, setOpenMessage] = useState('백엔드가 연결이 안 되었습니다.');  // 백엔드로부터 초기 메시지 받으면 변경
  const [youtubeLink, setYoutubeLink] = useState('');  // 백엔드로 전달할 유튜브 링크
  const [subTitle, setSubTitle] = useState('');  // 백엔드에서 받은 자막
  const [isClick, setIsClick] = useState(false);

  useEffect(() => {
    // 백엔드 연결 확인 (http://localhost:3010/api)
    fetch('/api')
      .then(res => res.json())
      .then(data => {
        setOpenMessage(JSON.stringify(data.openMessage));
      })
      .catch((err) => {
        console.log("시작하자마자 에러: ", err);
      })
  }, [])

  useEffect(() => {
    if (!isClick) {
      return;
    }

    // 백엔드에서 자막 받기 (http://localhost:3010/api/subtitle ? 유튜브 주소)
    fetch(`/api/subtitle?youtube_link=${youtubeLink}`)
      .then(res => res.json())
      .then(data => {
        setSubTitle(JSON.stringify(data.subTitle))
      })
      .catch((err) => {
        console.log("sendButton 에러: ", err);
        setSubTitle("오류가 발생하여 자막 데이터를 못 받았습니다.")
      })

    setIsClick(false);
  }, [isClick, youtubeLink])

  const sendButton = () => {
    setSubTitle('자막 데이터를 받아오는 중입니다.');
    setYoutubeLink('vxiglrJovis');
    setIsClick(true);
  }

  return (
    <div>
      {openMessage}  <br /><br />

      <div>
        <button onClick={sendButton}>Click Me!</button>
      </div>

      {subTitle ? `${subTitle}` : '자막 데이터가 없습니다.'}
    </div>
  );
}

export default App;