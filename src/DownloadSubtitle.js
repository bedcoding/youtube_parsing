import React, { useState, useEffect } from 'react';
import { Input, Button, TextareaAutosize, Link } from '@material-ui/core';

function DownloadSubtitle(props) {
    const [youtubeLink, setYoutubeLink] = useState('');   // 백엔드로 전달할 유튜브 링크
    const [subTitle, setSubTitle] = useState('');         // 백엔드에서 받은 자막 미리보기
    const [isClick, setIsClick] = useState(false);        // 버튼 클릭 여부 확인
    const [downloadLink, setDownloadLink] = useState('')  // 다운로드 버튼 링크


    // 1. input 입력
    const onChangeURL = (e) => {
        setYoutubeLink(e.target.value);
    }


    // 2. 버튼 클릭
    const sendButton = () => {
        if (youtubeLink === "") {
            alert("URL을 넣으세요");
            return;
        }

        setSubTitle('자막 데이터를 받아오는 중입니다.');
        setDownloadLink('');
        setIsClick(true);
    }


    // 3. 클릭이 감지되면 백엔드에서 자막 받기
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
        
        // http://localhost:4000/api/subtitle ? 유튜브 주소
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

    

    // 4. 파일 다운로드
    const makeTextFile = (param) => {
        const data = new Blob([param], { type: 'text/plain' })               // This creates the file.
        if (downloadLink !== '') window.URL.revokeObjectURL(downloadLink)    // this part avoids memory leaks
        setDownloadLink(window.URL.createObjectURL(data))                    // update the download link state    
    }


    return (
        <div>
            <div>
                <Input 
                    style={{width:'22%'}} 
                    onChange={onChangeURL} 
                    placeholder="URL 예시: https://www.youtube.com/watch?v=유튜브아이디" />

                <Button 
                    variant="contained" 
                    color="primary" 
                    onClick={sendButton}> 
                    유튜브 자막 추출하기 
                </Button>

                {
                    downloadLink !== ''
                        ? <Link download='youtube_subtitle.txt' href={downloadLink}>ㅤ자막 다운로드 버튼 </Link>
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