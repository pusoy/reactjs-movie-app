import {VideoPlayerWrapper} from './elements'

const VideoPlayer = ({
    open,
    onClose,
    vidSrc
}) => {  
 
    return (
        <VideoPlayerWrapper $open={open}>
            <button onClick={onClose} className="coseBtn">Close</button>
            <iframe src={vidSrc} title="player" /> 
        </VideoPlayerWrapper>
    )
}

export default VideoPlayer