import React from 'react';
import DownloadSubtitle from './DownloadSubtitle'
import DownloadAudio from './DownloadAudio';
import GetLanguage from './GetLanguage';
import DownloadAll from './DownloadAll';

function App(props) {

  return (
    <div>
      <h1>YouTube 자막, 음악 추출</h1>
      <DownloadAll/> 
      {/*       
      <DownloadAudio/>
      <GetLanguage/>
      <DownloadSubtitle/>
       */}
    </div>
  );
}

export default App;