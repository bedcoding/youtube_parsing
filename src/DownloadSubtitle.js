import React, { useState, useEffect } from 'react';
import { Input, Button, TextareaAutosize, Link, FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';

function DownloadSubtitle(props) {
    const [youtubeLink, setYoutubeLink] = useState('');   // 백엔드로 전달할 유튜브 링크
    const [subTitle, setSubTitle] = useState('');         // 백엔드에서 받은 자막 미리보기
    const [isClick, setIsClick] = useState(false);        // 버튼 클릭 여부 확인
    const [downloadLink, setDownloadLink] = useState('')  // 다운로드 버튼 링크
    const [languageList, setLanguageList] = useState([])  // 자막 리스트
    const [languageList_select, setLanguageList_select] = useState(0);    // 자막 선택박스

    // 시간 관계상 임시로 전체 언어 리스트 수동으로 삽입. (자동으로 들어가게 하고 싶었으나 자동자막이 안 가져와지는 문제가 있었음)
    useEffect(() => {
        const tempLanguageList = [
            ['한국어', 'ko'],
            ['English', 'en'],
            ['аҧсуа бызшәа, аҧсшәа', 'ab'],
            ['Afaraf', 'aa'],
            ['Afrikaans', 'af'],
            ['Akan', 'ak'],
            ['Shqip', 'sq'],
            ['አማርኛ', 'am'],
            ['العربية', 'ar'],
            ['aragonés', 'an'],
            ['Հայերեն', 'hy'],
            ['অসমীয়া', 'as'],
            ['авар мацӀ, магӀарул мацӀ', 'av'],
            ['avesta', 'ae'],
            ['aymar aru', 'ay'],
            ['azərbaycan dili, تۆرکجه', 'az'],
            ['bamanankan', 'bm'],
            ['башҡорт теле', 'ba'],
            ['euskara, euskera', 'eu'],
            ['беларуская мова', 'be'],
            ['বাংলা', 'bn'],
            ['भोजपुरी', 'bh'],
            ['Bislama', 'bi'],
            ['bosanski jezik', 'bs'],
            ['brezhoneg', 'br'],
            ['български език', 'bg'],
            ['ဗမာစာ', 'my'],
            ['català, valencià', 'ca'],
            ['Chamoru', 'ch'],
            ['нохчийн мотт', 'ce'],
            ['chiCheŵa, chinyanja', 'ny'],
            ['中文 (Zhōngwén), 汉语, 漢語', 'zh'],
            ['чӑваш чӗлхи', 'cv'],
            ['Kernewek', 'kw'],
            ['corsu, lingua corsa', 'co'],
            ['ᓀᐦᐃᔭᐍᐏᐣ', 'cr'],
            ['hrvatski jezik', 'hr'],
            ['čeština, český jazyk', 'cs'],
            ['dansk', 'da'],
            ['ދިވެހި', 'dv'],
            ['Nederlands, Vlaams', 'nl'],
            ['རྫོང་ཁ', 'dz'],
            ['Esperanto', 'eo'],
            ['eesti, eesti keel', 'et'],
            ['Eʋegbe', 'ee'],
            ['føroyskt', 'fo'],
            ['vosa Vakaviti', 'fj'],
            ['suomi, suomen kieli', 'fi'],
            ['français, langue française', 'fr'],
            ['Fulfulde, Pulaar, Pular', 'ff'],
            ['Galego', 'gl'],
            ['ქართული', 'ka'],
            ['Deutsch', 'de'],
            ['ελληνικά', 'el'],
            ["Avañe'ẽ", 'gn'],
            ['ગુજરાતી', 'gu'],
            ['Kreyòl ayisyen', 'ht'],
            ['(Hausa) هَوُسَ', 'ha'],
            ['עברית', 'he'],
            ['Otjiherero', 'hz'],
            ['हिन्दी, हिंदी', 'hi'],
            ['Hiri Motu', 'ho'],
            ['magyar', 'hu'],
            ['Interlingua', 'ia'],
            ['Bahasa Indonesia', 'id'],
            ['(originally:) Occidental, (after WWII:) Interlingue', 'ie'],
            ['Gaeilge', 'ga'],
            ['Asụsụ Igbo', 'ig'],
            ['Iñupiaq, Iñupiatun', 'ik'],
            ['Ido', 'io'],
            ['Íslenska', 'is'],
            ['Italiano', 'it'],
            ['ᐃᓄᒃᑎᑐᑦ', 'iu'],
            ['日本語 (にほんご)', 'ja'],
            ['ꦧꦱꦗꦮ, Basa Jawa', 'jv'],
            ['kalaallisut, kalaallit oqaasii', 'kl'],
            ['ಕನ್ನಡ', 'kn'],
            ['Kanuri', 'kr'],
            ['कश्मीरी, كشميري‎', 'ks'],
            ['қазақ тілі', 'kk'],
            ['ខ្មែរ, ខេមរភាសា, ភាសាខ្មែរ', 'km'],
            ['Gĩkũyũ', 'ki'],
            ['Ikinyarwanda', 'rw'],
            ['Кыргызча, Кыргыз тили', 'ky'],
            ['коми кыв', 'kv'],
            ['Kikongo', 'kg'],
            ['Kurdî, کوردی‎', 'ku'],
            ['Kuanyama', 'kj'],
            ['latine, lingua latina', 'la'],
            ['Lëtzebuergesch', 'lb'],
            ['Luganda', 'lg'],
            ['Limburgs', 'li'],
            ['Lingála', 'ln'],
            ['ພາສາລາວ', 'lo'],
            ['lietuvių kalba', 'lt'],
            ['Kiluba', 'lu'],
            ['latviešu valoda', 'lv'],
            ['Gaelg, Gailck', 'gv'],
            ['македонски јазик', 'mk'],
            ['fiteny malagasy', 'mg'],
            ['Bahasa Melayu, بهاس ملايو‎', 'ms'],
            ['മലയാളം', 'ml'],
            ['Malti', 'mt'],
            ['te reo Māori', 'mi'],
            ['मराठी', 'mr'],
            ['Kajin M̧ajeļ', 'mh'],
            ['Монгол хэл', 'mn'],
            ['Dorerin Naoero', 'na'],
            ['Diné bizaad', 'nv'],
            ['isiNdebele', 'nd'],
            ['नेपाली', 'ne'],
            ['Owambo', 'ng'],
            ['Norsk Bokmål', 'nb'],
            ['Norsk Nynorsk', 'nn'],
            ['Norsk', 'no'],
            ['ꆈꌠ꒿ Nuosuhxop', 'ii'],
            ['isiNdebele', 'nr'],
            ["occitan, lenga d'òc", 'oc'],
            ['ᐊᓂᔑᓈᐯᒧᐎᓐ', 'oj'],
            ['ѩзыкъ словѣньскъ', 'cu'],
            ['Afaan Oromoo', 'om'],
            ['ଓଡ଼ିଆ', 'or'],
            ['ирон æвзаг', 'os'],
            ['ਪੰਜਾਬੀ, پنجابی‎', 'pa'],
            ['पालि, पाळि', 'pi'],
            ['فارسی', 'fa'],
            ['język polski, polszczyzna', 'pl'],
            ['پښتو', 'ps'],
            ['Português', 'pt'],
            ['Runa Simi, Kichwa', 'qu'],
            ['Rumantsch Grischun', 'rm'],
            ['Ikirundi', 'rn'],
            ['Română', 'ro'],
            ['русский', 'ru'],
            ['संस्कृतम्', 'sa'],
            ['sardu', 'sc'],
            ['सिन्धी, سنڌي، سندھی‎', 'sd'],
            ['Davvisámegiella', 'se'],
            ["gagana fa'a Samoa", 'sm'],
            ['yângâ tî sängö', 'sg'],
            ['српски језик', 'sr'],
            ['Gàidhlig', 'gd'],
            ['chiShona', 'sn'],
            ['සිංහල', 'si'],
            ['Slovenčina, Slovenský jazyk', 'sk'],
            ['Slovenski jezik, Slovenščina', 'sl'],
            ['Soomaaliga, af Soomaali', 'so'],
            ['Sesotho', 'st'],
            ['Español', 'es'],
            ['Basa Sunda', 'su'],
            ['Kiswahili', 'sw'],
            ['SiSwati', 'ss'],
            ['Svenska', 'sv'],
            ['தமிழ்', 'ta'],
            ['తెలుగు', 'te'],
            ['тоҷикӣ, toçikī, تاجیکی‎', 'tg'],
            ['ไทย', 'th'],
            ['ትግርኛ', 'ti'],
            ['བོད་ཡིག', 'bo'],
            ['Türkmen, Түркмен', 'tk'],
            ['Wikang Tagalog', 'tl'],
            ['Setswana', 'tn'],
            ['Faka Tonga', 'to'],
            ['Türkçe', 'tr'],
            ['Xitsonga', 'ts'],
            ['татар теле, tatar tele', 'tt'],
            ['Twi', 'tw'],
            ['Reo Tahiti', 'ty'],
            ['ئۇيغۇرچە‎, Uyghurche', 'ug'],
            ['Українська', 'uk'],
            ['اردو', 'ur'],
            ['Oʻzbek, Ўзбек, أۇزبېك‎', 'uz'],
            ['Tshivenḓa', 've'],
            ['Tiếng Việt', 'vi'],
            ['Volapük', 'vo'],
            ['Walon', 'wa'],
            ['Cymraeg', 'cy'],
            ['Wollof', 'wo'],
            ['Frysk', 'fy'],
            ['isiXhosa', 'xh'],
            ['ייִדיש', 'yi'],
            ['Yorùbá', 'yo'],
            ['Saɯ cueŋƅ, Saw cuengh', 'za']
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

        if (youtubeLink.indexOf('https://youtu.be/') > -1) {
            youtubeID = youtubeLink.split('https://youtu.be/')[1];
        }

        if (youtubeLink.indexOf('https://www.youtube.com/watch?v=') > -1) {
            youtubeID = youtubeLink.split('https://www.youtube.com/watch?v=')[1];
        }
        
        let sendLanguage = languageList[languageList_select][1];  // 형태: ["한국어", "ko"]

        // http://localhost:4000/api/subtitle?youtubeLink=유튜브주소
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
                    <InputLabel>자막 선택</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={languageList_select}
                        onChange={selectChange}
                    >
                        {
                            languageList.map((language, index) =>
                                <MenuItem key={index} value={index}> {language[0]} </MenuItem>  // language 형태: "[한국어, ko]"
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
                                자막 다운로드 버튼
                            </Button>
                        </Link>

                        : <Button variant="contained" disabled>자막 다운로드 버튼</Button>
                }
            </div>





            <TextareaAutosize
                style={{ width: '95%', marginTop: '10px' }}
                value={subTitle ? `${subTitle}` : ' 자막이 나올 결과창 (자동자막도 추출 가능합니다)'}
            />
        </div>
    );
}

export default DownloadSubtitle;