import './App.css';
import ReactPlayer from 'react-player';
import axios from 'axios';
import uuid from 'react-uuid';

const sendData = (event, playback_id, playback_time_instant, video_url) => {
  axios.post('http://localhost:8000/events/', {
    "name": event,
    "playback_id": playback_id,
    "playback_time_instant": playback_time_instant,
    "video_url": video_url
  })
  .then(function (response) {
    console.log("logged to API");
  })
}

function App() {
  const playbackURI = 'https://video.gumlet.io/5f462c1561cf8a766464ffc4/61b8ac77b7e0439691e7c2af/1.m3u8';
  const playbackID = uuid();
  return (
    <div className="App">
      <ReactPlayer
          url={playbackURI}
          autoPlay={true}
          controls={true}
          width="400"
          onStart={() => {
            sendData('played', playbackID, 0, playbackURI);
          }}
          onProgress={(data) => {
            sendData("update", playbackID, data.playedSeconds, playbackURI)
          }}
        />
    </div>
  );
}

export default App;
