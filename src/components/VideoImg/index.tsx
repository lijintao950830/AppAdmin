import * as React from 'react';

interface Props {
  videoUrl: string | null;
  currentTime?: 1;
  width?: number;
  height?: number;
}
const Index: React.FC<Props> = (props) => {
  const { videoUrl, currentTime, width, height } = props;
  const [imgUrl, setImgUrl] = React.useState<string | null>(null);
  React.useEffect(() => {
    const video = document.createElement('video');
    console.log(videoUrl);

    if (!videoUrl) {
      console.error('videoUrl is not');
      return;
    }

    video.src = videoUrl;
    // 开始截取的时间
    video.currentTime = currentTime || 10;
    video.addEventListener('loadeddata', async () => {
      console.log(video);

      const canvas = document.createElement('canvas');
      canvas.width = width || video.videoWidth;
      canvas.height = height || video.videoHeight;
      const ctx = await canvas.getContext('2d');
      await ctx?.drawImage(video, 0, 0, canvas.width, canvas.height);
      const dataUrl = await canvas.toDataURL();

      setImgUrl(dataUrl);
      // `dataUrl` 首帧图片
    });
  }, []);
  return <div>{imgUrl && <img src={imgUrl} alt="" />}</div>;
};
export default Index;
