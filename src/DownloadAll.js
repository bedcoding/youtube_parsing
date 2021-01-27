import React, { useState, useEffect } from 'react';
import { Input, Button, TextareaAutosize } from '@material-ui/core';

function DownloadAll(props) {
    const [youtubeLink, setYoutubeLink] = useState("");
    const [viewKorean, setViewKorean] = useState('');     // 백엔드에서 받은 한글자막 미리보기
    const [viewEnglish, setViewEnglish] = useState('');   // 백엔드에서 받은 영어자막 미리보기

    const [isClick, setIsClick] = useState(false);        // 버튼 클릭 여부 확인
    const [downloadLinkKorean, setDownloadLinkKorean] = useState('')    // 한글자막 다운로드 버튼 링크
    const [downloadLinkEnglish, setDownloadLinkEnglish] = useState('')  // 영어자막 다운로드 버튼 링크


    // 1. 버튼 클릭시 isClick 변경
    const onClickButton = () => {
        if (youtubeLink === "") {
            alert("URL을 넣으세요");
            return;
        }

        setViewKorean('한글 자막을 불러오는 중입니다.');
        setViewEnglish('영어 자막을 불러오는 중입니다.');

        setDownloadLinkKorean('');
        setDownloadLinkEnglish('');
        setIsClick(true);
    }


    // 2. 텍스트 파일 다운로드 링크 (2개 동시에 다운로드 받기 위해 2개 선언)
    const makeLinkKorean = (param) => {
        const data = new Blob([param], { type: 'text/plain' })                           // This creates the file.
        if (downloadLinkKorean !== '') window.URL.revokeObjectURL(downloadLinkKorean)    // this part avoids memory leaks
        setDownloadLinkKorean(window.URL.createObjectURL(data))                          // update the download link state    
    }

    const makeLinkEnglish = (param) => {
        const data = new Blob([param], { type: 'text/plain' })                             // This creates the file.
        if (downloadLinkEnglish !== '') window.URL.revokeObjectURL(downloadLinkEnglish)    // this part avoids memory leaks
        setDownloadLinkEnglish(window.URL.createObjectURL(data))                           // update the download link state    
    }


    // 3. 한글자막 다운로드
    const downloadKorean = (youtubeID) => {
        fetch(`/api/subtitle?youtubeLink=${youtubeID}&language=ko`)
            .then(res => res.json())
            .then(data => {
                setViewKorean(JSON.stringify(data.subTitle))   // 한글자막 미리보기 변경
                makeLinkKorean(JSON.stringify(data.subTitle))  // 다운로드 링크 변경

                if(data.subTitle === "[서버 오류] 해당 언어의 자막 데이터를 못 찾았습니다.") {
                    throw new Error("한글 자막 없음");
                }
            })
            .then(() => {
                document.getElementById("ko_download").click();  // 다운로드 버튼 클릭
            })
            .catch((err) => {
                console.log("자막추출 에러: ", err);
            })
    }


    // 4. 영어자막 다운로드
    const downloadEnglish = (youtubeID) => {
        fetch(`/api/subtitle?youtubeLink=${youtubeID}&language=en`)
            .then(res => res.json())
            .then(data => {
                setViewEnglish(JSON.stringify(data.subTitle))   // 영어자막 미리보기 변경
                makeLinkEnglish(JSON.stringify(data.subTitle))  // 다운로드 링크 변경

                if(data.subTitle === "[서버 오류] 해당 언어의 자막 데이터를 못 찾았습니다.") {
                    throw new Error("영어 자막 없음");
                }
            })
            .then(data => {
                document.getElementById("en_download").click();  // 다운로드 버튼 클릭
            })
            .catch((err) => {
                console.log("자막추출 에러: ", err);
            })
    }



    // 5. 유튜브 음악 파일 다운로드
    const makeAudioFile = () => {
        if (youtubeLink !== "") {
            window.location.href = `http://localhost:4000/api/DownloadAudio?youtubeLink=${youtubeLink}`;
        } else {
            alert("URL을 넣으세요");
        }
    };


    // 6. 클릭이 감지되면 자막, 음악 다운로드 시작
    useEffect(() => {
        if (!isClick) {
            return;
        }
        setIsClick(false);

        // 유튜브 ID 추출 (자막 API는 유튜브 동영상 아이디만 필요)
        let youtubeID = youtubeLink;  // 초기값

        let linkList = [
            "https://www.youtube.com/watch?v=",
            "https://m.youtube.com/watch?v=",
            "https://youtu.be/",
            "https://www.youtube.com/v/",
            "https://www.youtube.com/embed/",
            "https://music.youtube.com/watch?v=",
            "https://gaming.youtube.com/watch?v="
        ];

        linkList.forEach(link => {
            if(youtubeLink.indexOf(link) > -1) {
                youtubeID = youtubeLink.split(link)[1];
            }
        });

        const result = async () => {
            // 자막 다운로드
            await downloadKorean(youtubeID);
            await downloadEnglish(youtubeID);

            // 파일 다운로드
            await makeAudioFile();
        }

        result();
    }, [isClick])


    return (
        <div>
            <Input
                style={{ marginRight: '10px', width: '22%' }}
                onChange={(e) => setYoutubeLink(e.target.value)}
                placeholder="https://www.youtube.com/watch?v=유튜브아이디"
            />

            <Button
                color="primary"
                variant="contained"
                onClick={onClickButton}>
                다운로드
            </Button>

            <br/>

            <TextareaAutosize
                style={{ width: '90%', marginTop: '10px' }}
                value={viewKorean ? `${viewKorean}` : ' 한글자막 미리보기'}
            />

            <TextareaAutosize
                style={{ width: '90%', marginTop: '10px' }}
                value={viewEnglish ? `${viewEnglish}` : ' 영어자막 미리보기'}
            />

            {/* 숨겨진 다운로드 버튼들 (자바스크립트로 클릭함) */}
            <a
                hidden
                id="ko_download"
                href={downloadLinkKorean}
                download='korean.txt'
            >
                한글 자막 다운로드 링크 (숨김)
            </a>

            <a
                hidden
                id="en_download"
                href={downloadLinkEnglish}
                download='english.txt'
            >
                영어 자막 다운로드 링크 (숨김)
            </a>
        </div>
    )
}

export default DownloadAll;