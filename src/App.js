import React, { useState, useEffect } from 'react';
import { Input, Button, TextareaAutosize } from '@material-ui/core';

function App(props) {
  const [openMessage, setOpenMessage] = useState('백엔드가 연결이 안 되었습니다.');  // 백엔드로부터 초기 메시지 받으면 변경
  const [youtubeLink, setYoutubeLink] = useState('');  // 백엔드로 전달할 유튜브 링크
  const [subTitle, setSubTitle] = useState('');   // 백엔드에서 받은 자막
  const [isClick, setIsClick] = useState(false);  // 버튼 클릭 여부 확인

  // 1. 백엔드 연결 확인
  useEffect(() => {
    // http://localhost:3010/api
    fetch('/api')
      .then(res => res.json())
      .then(data => {
        setOpenMessage(JSON.stringify(data.openMessage));
      })
      .catch((err) => {
        console.log("시작하자마자 에러: ", err);
      })
  }, [])

  // 2. 백엔드에서 자막 받기
  useEffect(() => {
    if (!isClick) {
      return;
    }

    // http://localhost:3010/api/subtitle ? 유튜브 주소
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


  // 버튼 클릭
  const sendButton = () => {
    // setYoutubeLink('vxiglrJovis');  // 테스트
    setSubTitle('자막 데이터를 받아오는 중입니다.');
    setIsClick(true);
  }

  const onChangeURL = (e) => {
    setYoutubeLink(e.target.value);
  }

  return (
    <div>
      <div>
        <Input onChange={onChangeURL} />
        <Button variant="contained" color="primary" onClick={sendButton}> 링크 삽입 </Button>
      </div>
      
      <TextareaAutosize
        style={{ width: '95%', marginTop: '5px' }}
        value={subTitle ? `${subTitle}` : ' 결과창'}
      />

      <TextareaAutosize
        style={{ width: '95%' }}
        value={openMessage}
      />
    </div>
  );
}

export default App;