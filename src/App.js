import React from 'react';
import DownloadSubtitle from './DownloadSubtitle'
import DownloadAudio from './DownloadAudio';
import AppSubtitleList from './AppSubtitleList';

function App(props) {

  return (
    <div>
      <h1>YouTube 자막, 음악 추출</h1>
      <DownloadAudio/>
      <AppSubtitleList/>
      <DownloadSubtitle/>
    </div>
  );
}

export default App;