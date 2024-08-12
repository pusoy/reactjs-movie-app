import { VideoPlayerWrapper } from "./elements";

type VideoPlayerProps = {
  open: boolean;
  onClose: () => void;
  vidSrc: string;
};
const VideoPlayer = ({ open, onClose, vidSrc }: VideoPlayerProps) => {
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
