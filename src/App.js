import React from 'react';
import DownloadAll from './DownloadAll';

// 샘플
import SampleDownloadSubtitle from './SampleDownloadSubtitle'
import SampleDownloadAudio from './SampleDownloadAudio';
import SampleGetLanguage from './SampleGetLanguage';


function App(props) {

  return (
    <div>
      <h1>YouTube 자막, 음악 추출</h1>
      <DownloadAll/> 

{/*
      샘플 (오디오 다운로드, 수동 자막 추출, 자막 다운로드 각 기능들을 따로 확인하고 싶을 경우)
      <SampleDownloadAudio/>
      <SampleGetLanguage/>
      <SampleDownloadSubtitle/>
*/}
    </div>
  );
}

export default App;