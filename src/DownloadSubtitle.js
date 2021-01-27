import React, { useState, useEffect } from 'react';
import { Input, Button, TextareaAutosize, Link, FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';

function DownloadSubtitle(props) {
    const [youtubeLink, setYoutubeLink] = useState('');   // 백엔드로 전달할 유튜브 링크
    const [subTitle, setSubTitle] = useState('');         // 백엔드에서 받은 자막 미리보기
    const [isClick, setIsClick] = useState(false);        // 버튼 클릭 여부 확인
    const [downloadLink, setDownloadLink] = useState('')  // 다운로드 버튼 링크
    const [languageList, setLanguageList] = useState([])  // 자막 리스트
    const [languageList_select, setLanguageList_select] = useState(0);    // 자막 선택박스


    // 시간 관계상 임시로 전체 언어 리스트 수동으로 삽입 (자동으로 들어가게 하고 싶었으나 자동자막이 안 가져와지는 문제가 있었음)
    useEffect(() => {
        const tempLanguageList = [
            ['ko', '한국어'],
            ['en', 'English'],
            ['ab', 'аҧсуа бызшәа, аҧсшәа'],
            ['aa', 'Afaraf'],
            ['af', 'Afrikaans'],
            ['ak', 'Akan'],
            ['sq', 'Shqip'],
            ['am', 'አማርኛ'],
            ['ar', 'العربية'],
            ['an', 'aragonés'],
            ['hy', 'Հայերեն'],
            ['as', 'অসমীয়া'],
            ['av', 'авар мацӀ, магӀарул мацӀ'],
            ['ae', 'avesta'],
            ['ay', 'aymar aru'],
            ['az', 'azərbaycan dili, تۆرکجه'],
            ['bm', 'bamanankan'],
            ['ba', 'башҡорт теле'],
            ['eu', 'euskara, euskera'],
            ['be', 'беларуская мова'],
            ['bn', 'বাংলা'],
            ['bh', 'भोजपुरी'],
            ['bi', 'Bislama'],
            ['bs', 'bosanski jezik'],
            ['br', 'brezhoneg'],
            ['bg', 'български език'],
            ['my', 'ဗမာစာ'],
            ['ca', 'català, valencià'],
            ['ch', 'Chamoru'],
            ['ce', 'нохчийн мотт'],
            ['ny', 'chiCheŵa, chinyanja'],
            ['zh', '中文 (Zhōngwén), 汉语, 漢語'],
            ['cv', 'чӑваш чӗлхи'],
            ['kw', 'Kernewek'],
            ['co', 'corsu, lingua corsa'],
            ['cr', 'ᓀᐦᐃᔭᐍᐏᐣ'],
            ['hr', 'hrvatski jezik'],
            ['cs', 'čeština, český jazyk'],
            ['da', 'dansk'],
            ['dv', 'ދިވެހި'],
            ['nl', 'Nederlands, Vlaams'],
            ['dz', 'རྫོང་ཁ'],
            ['eo', 'Esperanto'],
            ['et', 'eesti, eesti keel'],
            ['ee', 'Eʋegbe'],
            ['fo', 'føroyskt'],
            ['fj', 'vosa Vakaviti'],
            ['fi', 'suomi, suomen kieli'],
            ['fr', 'français, langue française'],
            ['ff', 'Fulfulde, Pulaar, Pular'],
            ['gl', 'Galego'],
            ['ka', 'ქართული'],
            ['de', 'Deutsch'],
            ['el', 'ελληνικά'],
            ['gn', "Avañe'ẽ"],
            ['gu', 'ગુજરાતી'],
            ['ht', 'Kreyòl ayisyen'],
            ['ha', '(Hausa) هَوُسَ'],
            ['he', 'עברית'],
            ['hz', 'Otjiherero'],
            ['hi', 'हिन्दी, हिंदी'],
            ['ho', 'Hiri Motu'],
            ['hu', 'magyar'],
            ['ia', 'Interlingua'],
            ['id', 'Bahasa Indonesia'],
            ['ie', '(originally:) Occidental, (after WWII:) Interlingue'],
            ['ga', 'Gaeilge'],
            ['ig', 'Asụsụ Igbo'],
            ['ik', 'Iñupiaq, Iñupiatun'],
            ['io', 'Ido'],
            ['is', 'Íslenska'],
            ['it', 'Italiano'],
            ['iu', 'ᐃᓄᒃᑎᑐᑦ'],
            ['ja', '日本語 (にほんご)'],
            ['jv', 'ꦧꦱꦗꦮ, Basa Jawa'],
            ['kl', 'kalaallisut, kalaallit oqaasii'],
            ['kn', 'ಕನ್ನಡ'],
            ['kr', 'Kanuri'],
            ['ks', 'कश्मीरी, كشميري‎'],
            ['kk', 'қазақ тілі'],
            ['km', 'ខ្មែរ, ខេមរភាសា, ភាសាខ្មែរ'],
            ['ki', 'Gĩkũyũ'],
            ['rw', 'Ikinyarwanda'],
            ['ky', 'Кыргызча, Кыргыз тили'],
            ['kv', 'коми кыв'],
            ['kg', 'Kikongo'],
            ['ku', 'Kurdî, کوردی‎'],
            ['kj', 'Kuanyama'],
            ['la', 'latine, lingua latina'],
            ['lb', 'Lëtzebuergesch'],
            ['lg', 'Luganda'],
            ['li', 'Limburgs'],
            ['ln', 'Lingála'],
            ['lo', 'ພາສາລາວ'],
            ['lt', 'lietuvių kalba'],
            ['lu', 'Kiluba'],
            ['lv', 'latviešu valoda'],
            ['gv', 'Gaelg, Gailck'],
            ['mk', 'македонски јазик'],
            ['mg', 'fiteny malagasy'],
            ['ms', 'Bahasa Melayu, بهاس ملايو‎'],
            ['ml', 'മലയാളം'],
            ['mt', 'Malti'],
            ['mi', 'te reo Māori'],
            ['mr', 'मराठी'],
            ['mh', 'Kajin M̧ajeļ'],
            ['mn', 'Монгол хэл'],
            ['na', 'Dorerin Naoero'],
            ['nv', 'Diné bizaad'],
            ['nd', 'isiNdebele'],
            ['ne', 'नेपाली'],
            ['ng', 'Owambo'],
            ['nb', 'Norsk Bokmål'],
            ['nn', 'Norsk Nynorsk'],
            ['no', 'Norsk'],
            ['ii', 'ꆈꌠ꒿ Nuosuhxop'],
            ['nr', 'isiNdebele'],
            ['oc', "occitan, lenga d'òc"],
            ['oj', 'ᐊᓂᔑᓈᐯᒧᐎᓐ'],
            ['cu', 'ѩзыкъ словѣньскъ'],
            ['om', 'Afaan Oromoo'],
            ['or', 'ଓଡ଼ିଆ'],
            ['os', 'ирон æвзаг'],
            ['pa', 'ਪੰਜਾਬੀ, پنجابی‎'],
            ['pi', 'पालि, पाळि'],
            ['fa', 'فارسی'],
            ['pl', 'język polski, polszczyzna'],
            ['ps', 'پښتو'],
            ['pt', 'Português'],
            ['qu', 'Runa Simi, Kichwa'],
            ['rm', 'Rumantsch Grischun'],
            ['rn', 'Ikirundi'],
            ['ro', 'Română'],
            ['ru', 'русский'],
            ['sa', 'संस्कृतम्'],
            ['sc', 'sardu'],
            ['sd', 'सिन्धी, سنڌي، سندھی‎'],
            ['se', 'Davvisámegiella'],
            ['sm', "gagana fa'a Samoa"],
            ['sg', 'yângâ tî sängö'],
            ['sr', 'српски језик'],
            ['gd', 'Gàidhlig'],
            ['sn', 'chiShona'],
            ['si', 'සිංහල'],
            ['sk', 'Slovenčina, Slovenský jazyk'],
            ['sl', 'Slovenski jezik, Slovenščina'],
            ['so', 'Soomaaliga, af Soomaali'],
            ['st', 'Sesotho'],
            ['es', 'Español'],
            ['su', 'Basa Sunda'],
            ['sw', 'Kiswahili'],
            ['ss', 'SiSwati'],
            ['sv', 'Svenska'],
            ['ta', 'தமிழ்'],
            ['te', 'తెలుగు'],
            ['tg', 'тоҷикӣ, toçikī, تاجیکی‎'],
            ['th', 'ไทย'],
            ['ti', 'ትግርኛ'],
            ['bo', 'བོད་ཡིག'],
            ['tk', 'Türkmen, Түркмен'],
            ['tl', 'Wikang Tagalog'],
            ['tn', 'Setswana'],
            ['to', 'Faka Tonga'],
            ['tr', 'Türkçe'],
            ['ts', 'Xitsonga'],
            ['tt', 'татар теле, tatar tele'],
            ['tw', 'Twi'],
            ['ty', 'Reo Tahiti'],
            ['ug', 'ئۇيغۇرچە‎, Uyghurche'],
            ['uk', 'Українська'],
            ['ur', 'اردو'],
            ['uz', 'Oʻzbek, Ўзбек, أۇزبېك‎'],
            ['ve', 'Tshivenḓa'],
            ['vi', 'Tiếng Việt'],
            ['vo', 'Volapük'],
            ['wa', 'Walon'],
            ['cy', 'Cymraeg'],
            ['wo', 'Wollof'],
            ['fy', 'Frysk'],
            ['xh', 'isiXhosa'],
            ['yi', 'ייִדיש'],
            ['yo', 'Yorùbá'],
            ['za', 'Saɯ cueŋƅ, Saw cuengh']
        ];

        setLanguageList(tempLanguageList);
    }, [])
    


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

        // 추출하고 싶은 자막의 언어
        let sendLanguage = languageList[languageList_select][0];  // 형태: ['ko', '한국어']


        // http://localhost:4000/api/subtitle?youtubeLink=유튜브주소&language=언어
        fetch(`/api/subtitle?youtubeLink=${youtubeID}&language=${sendLanguage}`)
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

    
    // 5. 추출하고 싶은 언어 변경
    const selectChange = (event) => {
        setLanguageList_select(event.target.value);
    };

    
    return (
        <div>
            <div>

                <Input
                    style={{ marginTop: '16.5px', marginRight: '10px', width: '22%' }}
                    onChange={onChangeURL}
                    placeholder="https://www.youtube.com/watch?v=유튜브아이디" />

                {/* 자동으로 만들어진 자막 리스트 */}
                <FormControl style={{ marginRight: '10px', width: '10%' }}>
                    <InputLabel>추출할 자막 선택</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={languageList_select}
                        onChange={selectChange}
                    >
                        {
                            languageList.map((language, index) =>
                                <MenuItem key={index} value={index}> {language[0]}, {language[1]} </MenuItem>  // language 형태: '[ko, 한국어]'
                            )
                        }
                    </Select>
                </FormControl>

                <Button
                    style={{ marginRight: '10px' }}
                    variant="contained"
                    color="primary"
                    onClick={sendButton}>
                    유튜브 자막 추출하기
                </Button>

                {
                    // Button에는 download라는 속성을 붙일 수 없어서 어쩔 수 없이 a태그(Link) 내부에 버튼을 넣는 꼼수로 다운로드 버튼 구현
                    downloadLink !== ''
                        ? <Link
                            download='youtube_subtitle.txt'
                            href={downloadLink}>

                            <Button
                                variant="contained"
                                color="primary"
                            >
                                유튜브 자막 다운로드
                            </Button>
                        </Link>

                        : <Button variant="contained" disabled>유튜브 자막 다운로드</Button>
                }
            </div>





            <TextareaAutosize
                style={{ width: '95%', marginTop: '10px' }}
                value={subTitle ? `${subTitle}` : ' 자막이 나올 결과창 (자동자막도 추출 가능합니다. 아예 존재하지 않는 언어는 추출 시도시 오류 발생합니다.)'}
            />
        </div>
    );
}

export default DownloadSubtitle;