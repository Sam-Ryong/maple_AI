import Tesseract from "tesseract.js";
import {
  binarizeImage,
  convertToGrayscale,
  parseString,
} from "../utils/ocrUtils";

export const levelParser = (ctx, captureCanvas, setLevel, initialLevelRef) => {
  // 왼쪽 하단 영역 OCR
  const ratio = captureCanvas.width / 1280;
  const leftBottomRegionX = 0;
  const leftBottomRegionY = (captureCanvas.height * 15) / 16; // 캡처할 영역의 위치
  const leftBottomRegionWidth = 100 * ratio; // 캡처할 영역의 너비
  const leftBottomRegionHeight = captureCanvas.height / 16; // 캡처할 영역의 높이

  // OCR 영역을 화면에 표시 (사각형 그리기)
  ctx.strokeStyle = "red"; // 사각형의 테두리 색
  ctx.lineWidth = 2; // 사각형의 선 두께
  ctx.strokeRect(
    leftBottomRegionX,
    leftBottomRegionY,
    leftBottomRegionWidth,
    leftBottomRegionHeight
  );

  const leftBottomImageData = ctx.getImageData(
    leftBottomRegionX,
    leftBottomRegionY,
    leftBottomRegionWidth,
    leftBottomRegionHeight
  );

  const leftBottomContrastedImageData = binarizeImage(
    convertToGrayscale(leftBottomImageData),
    180
  );

  const leftBottomSubCanvas = document.createElement("canvas");
  leftBottomSubCanvas.width = leftBottomRegionWidth;
  leftBottomSubCanvas.height = leftBottomRegionHeight;
  const leftBottomSubCtx = leftBottomSubCanvas.getContext("2d");
  leftBottomSubCtx.putImageData(leftBottomContrastedImageData, 0, 0);

  Tesseract.recognize(leftBottomSubCanvas, "eng", {}).then(
    ({ data: { text } }) => {
      const resultValue = parseString(text)[1];
      if (initialLevelRef.current === null) {
        initialLevelRef.current = resultValue;
      }
      setLevel(resultValue);
    }
  );
};
