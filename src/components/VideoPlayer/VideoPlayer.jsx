import { VideoPlayerWrapper } from "./elements";

const VideoPlayer = ({ open, onClose, vidSrc }) => {
  return (
    <>
      {open && (
        <VideoPlayerWrapper $open={open}>
          <button onClick={onClose} className="coseBtn">
            Close
          </button>
          <iframe src={vidSrc} title="player" allowFullScreen />
        </VideoPlayerWrapper>
      )}
    </>
  );
};

export default VideoPlayer;
