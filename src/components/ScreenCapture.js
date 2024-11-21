import Tesseract from "tesseract.js";
import {
  binarizeImage,
  convertToGrayscale,
  parseString,
  calculateMode,
} from "../utils/ocrUtils";

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

    const ratio = captureCanvas.width / 1280;
    const sub = (-50 / (1920 - 1280)) * (captureCanvas.width - 1280);
    const ocrRegionX = 580 * ratio + sub;
    const ocrRegionY = (captureCanvas.height * 15) / 16;
    const ocrRegionWidth = 160 * ratio;
    const ocrRegionHeight = captureCanvas.height / 16;

    const imageData = ctx.getImageData(
      ocrRegionX,
      ocrRegionY,
      ocrRegionWidth,
      ocrRegionHeight
    );

    const contrastedImageData = binarizeImage(
      convertToGrayscale(imageData),
      180
    );

    const subCanvas = document.createElement("canvas");
    subCanvas.width = ocrRegionWidth;
    subCanvas.height = ocrRegionHeight;
    const subCtx = subCanvas.getContext("2d");
    subCtx.putImageData(contrastedImageData, 0, 0);

    Tesseract.recognize(subCanvas, "eng", {
      logger: (m) => console.log(m),
    }).then(({ data: { text } }) => {
      const resultValue = parseString(text)[1];
      setResultValue(resultValue);

      if (initialValueRef.current === null) {
        initialValueRef.current = resultValue;
        setStartTime(new Date().toLocaleTimeString());
      }

      setCurrentTime(new Date().toLocaleTimeString());

      setChartData((prevData) => {
        const updatedData = [...prevData.datasets[0].data];
        let finalValue = resultValue;

        // 이상치 감지 및 처리
        if (updatedData.length > 0) {
          const lastValue = updatedData[updatedData.length - 1];

          if (
            resultValue == null ||
            resultValue == "" ||
            resultValue > lastValue * 2 || // 단순하게 이전값보다 2배이상 커지면 이상한거로 인식
            resultValue < lastValue // 마찬가지로 갑자기 작아져도 이상한거로 인식
          ) {
            finalValue = lastValue; // 이상치를 바로 이전 값으로 대체
            console.warn(
              `Detected outlier: ${resultValue}, replaced with: ${finalValue}`
            );
          }
        }

        updatedData.push(finalValue);

        const mode = calculateMode(updatedData.slice(0, 10));
        setModeValue(mode);
        setLatestValue(finalValue);

        return {
          ...prevData,
          labels: [...prevData.labels, prevData.labels.length + 1],
          datasets: [
            {
              ...prevData.datasets[0],
              data: updatedData,
            },
          ],
        };
      });
    });
  };

  return handleCapture;
};

export default ScreenCapture;
