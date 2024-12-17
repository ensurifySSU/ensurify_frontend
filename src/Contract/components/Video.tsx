import { useEffect, useRef, useState } from 'react';
import styled from '@emotion/styled';

const Container = styled.div`
  position: relative;

  display: inline-block;

  width: 240px;
  height: 270px;
  margin: 5px;
`;

const VideoContainer = styled.video`
  width: 240px;
  height: 240px;
  background-color: black;
`;

const UserLabel = styled.p`
  position: absolute;
  top: 230px;
  left: 0;
  display: inline-block;
`;

interface Props {
  stream: MediaStream;
  muted?: boolean;
}

const Video = ({ stream, muted }: Props) => {
  const ref = useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = useState<boolean>(false);

  useEffect(() => {
    if (ref.current) ref.current.srcObject = stream;
    if (muted) setIsMuted(muted);
  }, [stream, muted]);

  return (
    <Container>
      <VideoContainer ref={ref} muted={isMuted} autoPlay />
      <UserLabel>이름</UserLabel>
    </Container>
  );
};

export default Video;
