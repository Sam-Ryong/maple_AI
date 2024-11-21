import React, { useEffect, useRef, useState } from "react";

const ResultDisplay = ({
  modeValue,
  startTime,
  latestValue,
  currentTime,
  initialValueRef,
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
    <div>
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
  );
};

export default ResultDisplay;
