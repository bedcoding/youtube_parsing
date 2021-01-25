import React, { useState, useEffect } from 'react';
import { Input, Button, TextareaAutosize, Link } from '@material-ui/core';

function DownloadSubtitle(props) {
    const [openMessage, setOpenMessage] = useState('백엔드가 연결이 안 되었습니다.');  // 백엔드로부터 초기 메시지 받으면 변경
    const [youtubeLink, setYoutubeLink] = useState('');   // 백엔드로 전달할 유튜브 링크
    const [subTitle, setSubTitle] = useState('');         // 백엔드에서 받은 자막 미리보기
    const [isClick, setIsClick] = useState(false);        // 버튼 클릭 여부 확인
    const [downloadLink, setDownloadLink] = useState('')  // 다운로드 버튼 링크

    const makeTextFile = (param) => {
        const data = new Blob([param], { type: 'text/plain' })               // This creates the file.
        if (downloadLink !== '') window.URL.revokeObjectURL(downloadLink)    // this part avoids memory leaks
        setDownloadLink(window.URL.createObjectURL(data))                    // update the download link state    
    }


    // 1. 백엔드 연결 확인 (http://localhost:3010/api)
    useEffect(() => {
        fetch('/api')
            .then(res => res.json())
            .then(data => {
                setOpenMessage(JSON.stringify(data.openMessage));
            })
            .catch((err) => {
                console.log("시작하자마자 에러: ", err);
            })
    }, [])

    // 2. 클릭이 감지되면 백엔드에서 자막 받기
    useEffect(() => {
        if (!isClick) {
            return;
        }

        // 유튜브 ID 추출 (이 API는 링크 그대로 넣으면 안되고, 반드시 유튜브 동영상 아이디로 줘야 한다)
        let youtubeID = youtubeLink;  // 초기값

        if(youtubeLink.indexOf('https://youtu.be/') > -1) {
            youtubeID = youtubeLink.split('https://youtu.be/')[1];
        }

        if(youtubeLink.indexOf('https://www.youtube.com/watch?v=') > -1) {
            youtubeID = youtubeLink.split('https://www.youtube.com/watch?v=')[1];
        }
        
        // http://localhost:3010/api/subtitle ? 유튜브 주소
        fetch(`/api/subtitle?youtube_link=${youtubeID}`)
            .then(res => res.json())
            .then(data => {
                setSubTitle(JSON.stringify(data.subTitle));         // 미리보기 변경
                makeTextFile(JSON.stringify(data.subTitle));        // 다운로드 링크 변경
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
        setDownloadLink('');
        setIsClick(true);
    }

    const onChangeURL = (e) => {
        setYoutubeLink(e.target.value);
    }


    return (
        <div>
            <div>
                <Input onChange={onChangeURL} placeholder="URL 예시: https://www.youtube.com/watch?v=유튜브아이디" />
                <Button variant="contained" color="primary" onClick={sendButton}> 유튜브 자막 추출하기 </Button>ㅤ
                {
                    downloadLink !== ''
                        ? <Link download='youtube_subtitle.txt' href={downloadLink}> 자막 다운로드 버튼 </Link>
                        : ' ㅤ자막 다운로드 버튼 (파일없음)'
                }
                {/* {"ㅤㅤ" + openMessage} */}
            </div>

            <TextareaAutosize
                style={{ width: '95%', marginTop: '5px' }}
                value={subTitle ? `${subTitle}` : ' 자막이 나올 결과창'}
            />


        </div>
    );
}

export default DownloadSubtitle;