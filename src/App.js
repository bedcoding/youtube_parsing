import React from 'react';
import DownloadSubtitle from './DownloadSubtitle'
import DownloadAudio from './DownloadAudio';

function App(props) {

  return (
    <div>
      <DownloadAudio/>
      <DownloadSubtitle/>
    </div>
  );
}

export default App;