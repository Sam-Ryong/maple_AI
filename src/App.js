import React, { useState, useRef } from "react";
import Chart from "./components/Chart";
import ResultDisplay from "./components/ResultDisplay";
import ScreenCapture from "./components/ScreenCapture";
import { createChartOptions, createChartData } from "./utils/chartUtils";
import CaptureButton from "./components/MyCaptureButton";
import TopBar from "./components/TopBar";
import Sidebar from "./components/SideBar";
//import { calculateMode } from "./utils/ocrUtils";

function App() {
  const [resultValue, setResultValue] = useState(null);
  const [modeValue, setModeValue] = useState(null);
  const [latestValue, setLatestValue] = useState(null);
  const [startTime, setStartTime] = useState(null);
  const [currentTime, setCurrentTime] = useState(null);
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
  const [level, setLevel] = useState(null);
  const videoRef = useRef(null);
  const captureCanvasRef = useRef(null);
  const initialValueRef = useRef(null);
  const initialLevelRef = useRef(null);
  const [isScreenSharing, setIsScreenSharing] = useState(false);

  const resultChartOptions = createChartOptions(initialValueRef);

  const handleCapture = ScreenCapture({
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
  });

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
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "1024px", // Fixed width
        height: "768px", // Fixed height
        border: "2px solid #333",
        borderRadius: "10px",
        margin: "0 auto", // Center the layout
      }}
    >
      {/* Top Bar */}
      <TopBar />

      <div style={{ display: "flex", flex: 1 }}>
        {/* Sidebar */}
        <Sidebar />

        {/* Main Content */}
        <main
          style={{
            flex: 1,
            padding: "20px",
            boxSizing: "border-box",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            overflow: "hidden", // Prevent overflow issues
          }}
        >
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

          {/* Chart */}
          <Chart
            chartData={chartData}
            resultChartOptions={resultChartOptions}
          />

          {/* Capture Button */}
          <CaptureButton
            isScreenSharing={isScreenSharing}
            startScreenCapture={startScreenCapture}
          />

          {/* Result Display */}
          <ResultDisplay
            modeValue={modeValue}
            startTime={startTime}
            latestValue={latestValue}
            currentTime={currentTime}
            initialValueRef={initialValueRef}
            level={level}
            initialLevelRef={initialLevelRef}
          />
        </main>
      </div>
    </div>
  );
}

export default App;
