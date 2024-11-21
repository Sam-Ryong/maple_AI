import React, { useState, useRef } from "react";
import Tesseract from "tesseract.js";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip
);

function App() {
  const [resultValue, setResultValue] = useState(null);
  const [levelValue, setLevelValue] = useState(null);
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: "EXP",
        data: [],
        borderColor: "rgba(206, 238, 0, 1)",
        fill: false,
      },
    ],
  });

  const [modeValue, setModeValue] = useState(null);
  const [latestValue, setLatestValue] = useState(null);
  const [startTime, setStartTime] = useState(null);
  const [currentTime, setCurrentTime] = useState(null);
  const videoRef = useRef(null);
  const captureCanvasRef = useRef(null);
  const initialValueRef = useRef(null);
  const [isScreenSharing, setIsScreenSharing] = useState(false);

  const resultChartOptions = {
    responsive: true,
    maintainAspectRatio: true,
    scales: {
      x: { type: "linear", position: "bottom" },
      y: { beginAtZero: false, min: initialValueRef.current || 0 },
    },
    legend: {
      display: false,
    },
  };

  const calculateMode = (data) => {
    const frequency = {};
    data.forEach((value) => {
      frequency[value] = (frequency[value] || 0) + 1;
    });

    let mode = null;
    let maxFrequency = 0;
    for (const key in frequency) {
      if (frequency[key] > maxFrequency) {
        mode = Number(key);
        maxFrequency = frequency[key];
      }
    }
    return mode;
  };

  const parseString = (input) => {
    return input.split(" ").map((item) => {
      return isNaN(item) ? item : Number(item);
    });
  };

  const convertToGrayscale = (imageData) => {
    const data = imageData.data;
    for (let i = 0; i < data.length; i += 4) {
      const avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
      data[i] = data[i + 1] = data[i + 2] = avg;
    }
    return imageData;
  };

  const binarizeImage = (imageData, threshold = 128) => {
    const data = imageData.data;
    for (let i = 0; i < data.length; i += 4) {
      const avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
      const value = avg < threshold ? 0 : 255;
      data[i] = data[i + 1] = data[i + 2] = value;
    }
    return imageData;
  };

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

      const difference = resultValue - initialValueRef.current;
      setCurrentTime(new Date().toLocaleTimeString());

      setChartData((prevData) => {
        const updatedData = [...prevData.datasets[0].data, resultValue];
        const mode = calculateMode(updatedData.slice(0, 10));
        setModeValue(mode);
        setLatestValue(resultValue);

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

  const startScreenCapture = async () => {
    try {
      const stream = await navigator.mediaDevices.getDisplayMedia({
        video: { mediaSource: "screen" },
      });
      const videoElement = videoRef.current;
      videoElement.srcObject = stream;
      setIsScreenSharing(true);

      videoElement.addEventListener("play", () => {
        setInterval(() => {
          if (videoElement.paused || videoElement.ended) return;
          handleCapture();
        }, 1000);
      });
    } catch (err) {
      console.error("Error: " + err);
    }
  };

  return (
    <div>
      <video
        ref={videoRef}
        id="videoElement"
        style={{ display: "none" }}
        autoPlay
      />
      <canvas
        ref={captureCanvasRef}
        id="captureCanvas"
        style={{ display: "none" }}
      />
      {/* <div id="level">Level: {levelValue}</div>
      <div id="result">Result: {resultValue}</div> */}

      <div
        className="chart-container"
        style={{
          width: "640px",
          height: "320px",
          margin: "30",
        }}
      >
        <Line data={chartData} options={resultChartOptions} />
        <div>
          <button onClick={startScreenCapture} disabled={isScreenSharing}>
            {isScreenSharing ? "측정 중" : "측정 시작"}
          </button>
        </div>
        <div>
          <strong>시작 경험치: </strong>
          {modeValue !== null && typeof latestValue === "number"
            ? modeValue.toLocaleString()
            : ""}{" "}
          ({startTime})
        </div>
        <div>
          <strong>현재 경험치: </strong>
          {latestValue !== null && typeof latestValue === "number"
            ? latestValue.toLocaleString()
            : ""}{" "}
          ({currentTime}){" "}
          {latestValue && initialValueRef.current
            ? `(+${(latestValue - initialValueRef.current).toLocaleString()})`
            : ""}
        </div>
      </div>
    </div>
  );
}

export default App;
