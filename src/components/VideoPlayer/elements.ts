import styled from "styled-components";

export const VideoPlayerWrapper = styled.div<{ $open: boolean }>`
  display: ${(props) => (props.$open ? "block" : "none")};

  background: #00000057;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 99999;

  .coseBtn {
    position: absolute;
    right: 0;
    top: 10px;
    background: rgb(255 255 255 / 31%);
    padding: 5px;
    border-radius: 25px;
    font-size: 9px;
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
  }

  iframe {
    height: 100%;
    width: 100%;
  }
`;
