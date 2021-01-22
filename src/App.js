import React from 'react';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      openMessage: '백엔드가 연결이 안 되었습니다.',  // 백엔드 연결 확인
      youtubeLink: 'vxiglrJovis',              // 백엔드로 전달할 유튜브 링크
      subTitle: '',                            // 백엔드에서 받은 자막
    };
  }

  // 백엔드 호출 (servers 폴더)
  componentDidMount() {
    // 1. 백엔드 연결 확인 (http://localhost:3010/api)
    fetch('/api')
      .then(res => res.json())
      .then(data => {
        this.setState({ openMessage: JSON.stringify(data.openMessage) })
      })

    // 2. 백엔드에서 자막 받기 (http://localhost:3010/api/subtitle ? 유튜브 주소)
    fetch(`/api/subtitle?youtube_link=${this.state.youtubeLink}`)
      .then(res => res.json())
      .then(data => {
        this.setState({ subTitle: JSON.stringify(data.subTitle) })
      })
  }

  render() {
    const { openMessage, subTitle } = this.state;

    return (
      <div>
        {openMessage}  <br /><br />
        {subTitle ? `${subTitle}` : '자막 데이터가 없습니다.'}
      </div>
    );
    ;
  }
}

export default App;