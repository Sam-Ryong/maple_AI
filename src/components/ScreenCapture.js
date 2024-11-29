import { expParser } from "../utils/expParser";
import { levelParser } from "../utils/levelParser";

const ScreenCapture = ({
  videoRef,
  captureCanvasRef,
  setResultValue,
  setChartData,
  setModeValue,
  setLatestValue,
  setStartTime,
  setCurrentTime,
  initialValueRef,
  setLevel,
  initialLevelRef,
}) => {
  const handleCapture = () => {
    const videoElement = videoRef.current;
    const captureCanvas = captureCanvasRef.current;
    const ctx = captureCanvas.getContext("2d");

    captureCanvas.width = videoElement.videoWidth;
    captureCanvas.height = videoElement.videoHeight;

    ctx.drawImage(
      videoElement,
      0,
      0,
      captureCanvas.width,
      captureCanvas.height
    );

    expParser(
      ctx,
      captureCanvas,
      setResultValue,
      setChartData,
      setModeValue,
      setLatestValue,
      setStartTime,
      setCurrentTime,
      initialValueRef
    );
    levelParser(ctx, captureCanvas, setLevel, initialLevelRef);
  };

  return handleCapture;
};

export default ScreenCapture;
