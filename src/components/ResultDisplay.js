import React, { useEffect, useRef, useState } from "react";
import { maxExpConf } from "../utils/maxExpConf";
import { color } from "chart.js/helpers";

const ResultDisplay = ({
  modeValue,
  startTime,
  latestValue,
  currentTime,
  initialValueRef,
  level,
  initialLevelRef,
}) => {
  // 알림을 추적하기 위한 ref
  const notificationRef = useRef(null);
  const updateCount = useRef(0); // Update count ref to track updates

  useEffect(() => {
    if (latestValue !== null && Notification.permission === "granted") {
      updateCount.current += 1; // Increment update count on each change
      updateCount.current = updateCount.current % 10;

      // Show notification every 10th update
      if (updateCount.current === 0) {
        const experienceChange = initialValueRef.current
          ? ` (+${(
              latestValue - initialValueRef.current
            ).toLocaleString()} EXP)`
          : "";

        // 기존 알림이 있다면 닫기
        if (notificationRef.current) {
          notificationRef.current.close();
        }

        // 새로운 알림 생성
        notificationRef.current = new Notification("경험치 업데이트", {
          body: `현재 경험치: ${latestValue.toLocaleString()} EXP${experienceChange}`,
          requireInteraction: true,
          tag: "alert", // tag를 이용해 동일한 알림을 덮어쓸 수 있게 설정
          silent: true,
        });
      }
    }
  }, [latestValue]); // latestValue가 업데이트될 때 실행

  // 알림 권한 요청
  useEffect(() => {
    if (Notification.permission === "default") {
      Notification.requestPermission();
    }
  }, []);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        gap: "20px",
        width: "100%",
        marginTop: "20px",
      }}
    >
      {/* Left Card: Start Info */}
      <div
        style={{
          flex: 1,
          padding: "20px",
          border: "1px solid #ddd",
          borderRadius: "10px",
          backgroundColor: "#333",
          textAlign: "center",
        }}
      >
        <div>{startTime} 시작</div>
        <div
          style={{
            fontSize: "10px",
            color: "#aaa",
            borderTop: "1px solid #555",
            marginTop: "10px",
            marginBottom: "10px",
          }}
        ></div>
        <div>
          LV. {level && initialLevelRef.current ? initialLevelRef.current : ""}
        </div>
        <div
          style={{
            fontSize: "10px",
            color: "#aaa",
            borderTop: "1px solid #555",
            marginTop: "10px",
            marginBottom: "10px",
          }}
        ></div>
        <div>
          {modeValue !== null && typeof latestValue === "number"
            ? modeValue.toLocaleString()
            : ""}{" "}
          EXP
        </div>
      </div>

      {/* Center Card: Change Info */}
      <div
        style={{
          flex: 1,
          padding: "20px",
          border: "1px solid #ddd",
          borderRadius: "10px",
          backgroundColor: "#333",
          textAlign: "center",
        }}
      >
        <div>{currentTime - startTime}</div>
        <div
          style={{
            fontSize: "10px",
            color: "#aaa",
            borderTop: "1px solid #555",
            marginTop: "10px",
            marginBottom: "10px",
          }}
        ></div>
        <div>
          {level && initialLevelRef.current
            ? `+${(level - initialLevelRef.current).toLocaleString()} LV`
            : "+ LV"}
        </div>
        <div
          style={{
            fontSize: "10px",
            color: "#aaa",
            borderTop: "1px solid #555",
            marginTop: "10px",
            marginBottom: "10px",
          }}
        ></div>
        <div>
          {maxExpConf(level) != null &&
          maxExpConf(initialLevelRef.current) != null
            ? `+${(
                maxExpConf(level) -
                maxExpConf(initialLevelRef.current) +
                latestValue -
                initialValueRef.current
              ).toLocaleString()} EXP`
            : latestValue && initialValueRef.current
            ? `+${(latestValue - initialValueRef.current).toLocaleString()} EXP`
            : "+ EXP"}
        </div>
      </div>

      {/* Right Card: Current Info */}
      <div
        style={{
          flex: 1,
          padding: "20px",
          border: "1px solid #ddd",
          borderRadius: "10px",
          backgroundColor: "#333",
          textAlign: "center",
        }}
      >
        <div>{currentTime}</div>
        <div
          style={{
            fontSize: "10px",
            color: "#aaa",
            borderTop: "1px solid #555",
            marginTop: "10px",
            marginBottom: "10px",
          }}
        ></div>
        <div>LV. {level}</div>
        <div
          style={{
            fontSize: "10px",
            color: "#aaa",
            borderTop: "1px solid #555",
            marginTop: "10px",
            marginBottom: "10px",
          }}
        ></div>
        <div>
          {latestValue !== null && typeof latestValue === "number"
            ? latestValue.toLocaleString()
            : ""}{" "}
          EXP
        </div>
      </div>
    </div>
  );
};

export default ResultDisplay;
