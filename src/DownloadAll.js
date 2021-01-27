import React, { useState, useEffect } from 'react';
import { Input, Button, TextareaAutosize } from '@material-ui/core';

function DownloadAll(props) {
    const [isClick, setIsClick] = useState(false);        // 버튼 클릭 여부 확인
    const [youtubeLink, setYoutubeLink] = useState('');   // input 창에 삽입한 유튜브 링크

    // 백엔드에서 받은 한영 자막 미리보기
    const [viewKorean, setViewKorean] = useState('');
    const [viewEnglish, setViewEnglish] = useState('');

    // 자막 다운로드 버튼 링크 만들기
    const [downloadLinkKorean, setDownloadLinkKorean] = useState('');
    const [downloadLinkEnglish, setDownloadLinkEnglish] = useState('');

    // 수동자막 여부 확인 (파일명 변경을 위해)
    const [isAutoKorean, setIsAutoKorean] = useState(true);
    const [isAutoEnglish, setIsAutoEnglish] = useState(true);


    // 1. 버튼 클릭시 다운로드 트리거 발동 (isClick)
    const onClickButton = () => {
        if (youtubeLink === "") {
            alert("URL을 넣으세요");
            return;
        }

        // 자막 초기화
        setViewKorean('한글 자막을 불러오는 중입니다.');
        setViewEnglish('영어 자막을 불러오는 중입니다.');

        // 링크 초기화
        setDownloadLinkKorean('');
        setDownloadLinkEnglish('');

        // 자동자막, 수동자막 여부 초기화
        setIsAutoKorean(true);
        setIsAutoEnglish(true);

        // 다운로드 함수 시작 (트리거)
        setIsClick(true);
    }


    // 2. 자동자막, 수동자막 여부 확인
    const checkAuto = (youtubeID) => {
        fetch(`http://video.google.com/timedtext?v=${youtubeID}&type=list`)          // 1. 크롬 주소창에 http://video.google.com/timedtext?v=비디오ID&type=list 형태로 쳐보면 수동 자막 목록이 나온다.
            .then(res => res.text())                                                 // 2. xml을 일단 텍스트 형태로 받는다.
            .then(str => (new window.DOMParser()).parseFromString(str, "text/xml"))  // 3. 텍스트로 받은 데이터를 다시 xml 형태로 되돌린다.
            .then(data => {
                let xml = data.getElementsByTagName("transcript_list")[0];           // 4. xml 형태로 수동자막 목록을 가져온다.

                // 5. 영어, 한국어 수동자막 존재여부 확인
                for (let i = 0; i < xml.childElementCount; i++) {
                    let item = xml.children.item(i);  // 형태: <track id=​"22" name lang_code=​"en" lang_original=​"English" lang_translated=​"English" lang_default=​"true">​</track>​

                    if (item.getAttribute("lang_code") === 'ko') {
                        setIsAutoKorean(false);
                    }

                    if (item.getAttribute("lang_code") === 'en') {
                        setIsAutoEnglish(false);
                    }
                }
            })
            .catch((err) => {
                console.log("수동자막 리스트 불러오기 에러: ", err);
            })
    }


    // 3. 텍스트 파일 다운로드 링크 (2개 동시에 다운로드 받기 위해 2개 선언)
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


    // 4. 한글자막 다운로드
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


    // 5. 영어자막 다운로드
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



    // 6. 유튜브 음악 파일 다운로드
    const downloadAudioFile = () => {
        if (youtubeLink !== "") {
            window.location.href = `http://localhost:4000/api/DownloadAudio?youtubeLink=${youtubeLink}`;
        } else {
            alert("URL을 넣으세요");
        }
    };


    // 7. 클릭이 감지되면 자막, 음악 다운로드 시작
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
            // 자동자막인지 수동자막인지 확인
            await checkAuto(youtubeID);

            // 자막 다운로드
            await downloadKorean(youtubeID);
            await downloadEnglish(youtubeID);

            // 파일 다운로드
            await downloadAudioFile();
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
                download={isAutoKorean ? 'ko_auto.txt' : 'ko_human.txt'}
            >
                한글 자막 다운로드 링크 (숨김)
            </a>

            <a
                hidden
                id="en_download"
                href={downloadLinkEnglish}
                download={isAutoEnglish ? 'en_auto.txt' : 'en_human.txt'}
            >
                영어 자막 다운로드 링크 (숨김)
            </a>
        </div>
    )
}

export default DownloadAll;