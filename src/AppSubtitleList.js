import React, { useState, useEffect } from 'react';
import { Input, Button, FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';

function AppSubtitleList(props) {
    const [youtubeLink, setYoutubeLink] = useState('');      // input 창에 입력한 유튜브 링크
    const [isFindClick, setIsFindClick] = useState(false)    // 수동자막 찾기 버튼 클릭여부 확인
    const [languageList, setLanguageList] = useState([])     // 수동자막 리스트
    const [languageList_select, setLanguageList_select] = useState(0);    // 수동자막 선택박스


    // 해당 영상에 사람이 직접 넣은 수동자막이 존재하는지 확인하는 로직 (문제점: 자동자막은 체크가 안됨)
    useEffect(() => {
        if (!isFindClick) {
            return;
        }

        // 링크에서 유튜브 ID 추출 (이 API는 링크 그대로 넣으면 안되고, 반드시 유튜브 동영상 아이디로 줘야 한다)
        let youtubeID = youtubeLink;  // 초기값

        let linkList = [
            "https://www.youtube.com/watch?v=",
            "https://m.youtube.com/watch?v=",
            "https://youtu.be/",
            "https://www.youtube.com/v/",
            "https://www.youtube.com/embed/",
            "https://music.youtube.com/watch?v=",
            "https://gaming.youtube.com/watch?v="
        ]

        linkList.forEach(link => {
            if(youtubeLink.indexOf(link) > -1) {
                youtubeID = youtubeLink.split(link)[1];
            }
        });

        fetch(`http://video.google.com/timedtext?v=${youtubeID}&type=list`)          // 1. 크롬 주소창에 http://video.google.com/timedtext?v=비디오ID&type=list 형태로 쳐보면 수동 자막 목록이 나온다.
            .then(res => res.text())                                                 // 2. xml을 일단 텍스트 형태로 받는다.
            .then(str => (new window.DOMParser()).parseFromString(str, "text/xml"))  // 3. 텍스트로 받은 데이터를 다시 xml 형태로 되돌린다.
            .then(data => {
                let xml = data.getElementsByTagName("transcript_list")[0];          // 4. xml 형태로 수동자막 목록을 가져온다.

                // 5. 가장 많이 쓰는 영어, 한국어는 존재시 최상단에 올린다.
                let tempLanguageList = [];
                for (let i = 0; i < xml.childElementCount; i++) {
                    let item = xml.children.item(i);  // 형태: <track id=​"22" name lang_code=​"en" lang_original=​"English" lang_translated=​"English" lang_default=​"true">​</track>​

                    if(item.getAttribute("lang_code") === 'ko' || item.getAttribute("lang_code") === 'en') {
                        let itemObject = item.getAttribute("lang_code") + ", " + item.getAttribute("lang_original")
                        tempLanguageList.push(itemObject);  // 형태: en
                    }
                }

                // 6. 이후 나머지 언어를 붙인다.
                for (let i = 0; i < xml.childElementCount; i++) {
                    let item = xml.children.item(i);   // 형태: <track id=​"22" name lang_code=​"en" lang_original=​"English" lang_translated=​"English" lang_default=​"true">​</track>​
                    let itemObject = item.getAttribute("lang_code") + ", " + item.getAttribute("lang_original")
                    tempLanguageList.push(itemObject);  // 형태: en
                }

                // 7. 중복제거
                tempLanguageList = [...new Set(tempLanguageList)];
                
                // 8. 없을 경우
                if(tempLanguageList.length === 0) {
                    tempLanguageList = ['없음', ''];
                }

                setLanguageList(tempLanguageList);
            })
            .catch((err) => {
                console.log("수동자막 리스트 불러오기 에러: ", err);
            })

            setIsFindClick(false);
    }, [isFindClick])

    const selectChange = (event) => {
        setLanguageList_select(event.target.value);
    };

    const onClickfind = () => {
        setIsFindClick(true);
    }

    const onChangeURL = (e) => {
        setYoutubeLink(e.target.value);
    }

    
    return (
        <div style={{ marginBottom: '5px' }}>
            <Input
                style={{ marginTop: '16.5px', marginRight: '10px', width: '22%' }}
                onChange={onChangeURL}
                placeholder="https://www.youtube.com/watch?v=유튜브아이디"
            />


           {/* 사람이 직접 만든 자막 리스트 (자동자막 x) */}
           <FormControl style={{ marginRight: '10px', width: '10%' }}>
                <InputLabel>수동자막 존재 확인</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={languageList_select}
                    onChange={selectChange}
                >
                    {
                        languageList.map((language, index) =>
                            <MenuItem key={index} value={index}> {language} </MenuItem>  // language 형태: "[ko, 한국어]"
                        )
                    }

                </Select>
            </FormControl>


            <Button
                variant="contained"
                color="primary"
                onClick={onClickfind}>
                수동자막 유무 확인용
            </Button>

        </div>
    );
}

export default AppSubtitleList;