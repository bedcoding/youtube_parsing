import React from 'react';
import DownloadAll from './DownloadAll';

// 샘플
// import SampleDownloadSubtitle from './Sample/SampleDownloadSubtitle'
// import SampleDownloadAudio from './Sample/SampleDownloadAudio';
// import SampleGetLanguage from './Sample/SampleGetLanguage';


function App(props) {

  return (
    <div>
      <h1>YouTube 자막, 음악 추출</h1>
      <DownloadAll/> 

{/* 
      <SampleDownloadAudio/>
      <SampleGetLanguage/>
      <SampleDownloadSubtitle/> 
*/}

    </div>
  );
}

export default App;