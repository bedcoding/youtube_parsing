import React, { useState } from 'react';
import { Input, Button } from '@material-ui/core';

function DownloadAudio(props) {
    const [inputUrl, setInputUrl] = useState("");
    const convertVideo = () => {
        if (inputUrl !== "") {
            window.location.href = `http://localhost:4000/api/DownloadAudio?URL=${inputUrl}`;
        } else {
            alert("URL을 넣으세요");
        }
    };

    return (
        <div style={{ marginBottom: '5px' }}>
            <h1>YouTube Downloader </h1>
            <div>
                <Input
                    style={{ width: '22%' }}
                    onChange={(e) => setInputUrl(e.target.value)}
                    placeholder="URL 예시: https://www.youtube.com/watch?v=유튜브아이디"
                />

                <Button
                    color="primary"
                    variant="contained"
                    onClick={convertVideo}>
                    유튜브 음악 다운로드
                </Button>
            </div>
        </div>
    );
}

export default DownloadAudio;