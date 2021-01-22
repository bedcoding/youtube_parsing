import React from 'react';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      openMessage: '백엔드가 연결이 안 되었습니다.',
      subTitle: '',  // 백엔드에서 받은 자막
    };
  }

  // 백엔드 호출 (servers 폴더)
  componentDidMount() {
    fetch('/api/')
      .then(res => res.json())
      .then(data => {
        this.setState({ openMessage: JSON.stringify(data.openMessage) })
      })

    fetch('/api/group/')
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