import React from "react";

const Sidebar = () => {
  return (
    <aside
      style={{
        width: "200px",
        backgroundColor: "#333",
        color: "white",
        padding: "10px",
        boxSizing: "border-box",
        borderRadius: "15px",
        margin: "10px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <div>
        <h2 style={{ fontSize: "14px", marginBottom: "20px" }}>Notice</h2>
        <div
          style={{
            fontSize: "10px",
            color: "#aaa",
            borderTop: "1px solid #555",
          }}
        ></div>
        <nav>
          <ul style={{ listStyleType: "none", padding: 0, fontSize: "12px" }}>
            <li style={{ marginBottom: "10px" }}>
              <h2
                style={{
                  color: "white",
                  textDecoration: "none",
                  fontSize: "13px",
                }}
              >
                소개
              </h2>
              <p
                style={{
                  color: "white",
                  textDecoration: "none",
                  fontSize: "10px",
                }}
              >
                화면의 글자를 인식하는 AI 모델(tesseract.js)이 동작해서 경험치
                및 레벨과 같은 정보를 추출합니다. 해당 정보를 시각화하고
                기록합니다.
              </p>
            </li>
            <div
              style={{
                fontSize: "10px",
                color: "#aaa",
                borderTop: "1px solid #555",
              }}
            ></div>
            <li style={{ marginBottom: "10px" }}>
              <h2
                style={{
                  color: "white",
                  textDecoration: "none",
                  fontSize: "13px",
                }}
              >
                사용 방법
              </h2>
              <p
                style={{
                  color: "white",
                  textDecoration: "none",
                  fontSize: "10px",
                }}
              >
                1. 측정 시작 버튼 클릭
              </p>
              <p
                style={{
                  color: "white",
                  textDecoration: "none",
                  fontSize: "10px",
                }}
              >
                2. Chrome 탭/창/전체화면 중에서 창 선택
              </p>
              <p
                style={{
                  color: "white",
                  textDecoration: "none",
                  fontSize: "10px",
                }}
              >
                3. 메이플월드 클라이언트 선택
              </p>
            </li>
            <div
              style={{
                fontSize: "10px",
                color: "#aaa",
                borderTop: "1px solid #555",
              }}
            ></div>
            <li style={{ marginBottom: "10px" }}>
              <h2
                style={{
                  color: "white",
                  textDecoration: "none",
                  fontSize: "13px",
                }}
              >
                참고 사항
              </h2>
              <p
                style={{
                  color: "white",
                  textDecoration: "none",
                  fontSize: "10px",
                }}
              >
                특정 해상도에서 제대로 동작 안하는것 양해바랍니다.
              </p>
              <p
                style={{
                  color: "white",
                  textDecoration: "none",
                  fontSize: "10px",
                }}
              >
                AI가 실수 할 수 있습니다.
              </p>
              <p
                style={{
                  color: "white",
                  textDecoration: "none",
                  fontSize: "10px",
                }}
              >
                레벨업으로 인해 경험치가 0이 될 경우 정상적이지 않을 수
                있습니다. 귀찮아서 아직 손 안썻습니다.
              </p>
              <p
                style={{
                  color: "white",
                  textDecoration: "none",
                  fontSize: "10px",
                }}
              >
                기록은 저장되지 않습니다.(추후 구현 예정)
              </p>
            </li>
          </ul>
        </nav>
      </div>
      <div
        style={{
          fontSize: "10px",
          color: "#aaa",
          borderTop: "1px solid #555",
          paddingTop: "10px",
        }}
      >
        <p style={{ margin: 0 }}>MLC ver 0.0.1</p>
        <p style={{ margin: 0, fontSize: "9px" }}>- 경험치 측정 기능 추가</p>
        <p style={{ margin: 0, fontSize: "9px" }}>
          - 이용자 현황 보고 추가 개발 여부 결정
        </p>
        <div
          style={{
            fontSize: "10px",
            color: "#aaa",
            borderTop: "1px solid #555",
            marginTop: "10px",
            marginBottom: "10px",
          }}
        ></div>
        <p style={{ margin: 0 }}>이후 개발 계획</p>
        <p style={{ margin: 0, fontSize: "9px" }}>- 획득 순 메소 측정 기능</p>
        <p style={{ margin: 0, fontSize: "9px" }}>- 사용한 펫 물약 측정 기능</p>
        <p style={{ margin: 0, fontSize: "9px" }}>- 해상도 이슈 해결</p>
        <div
          style={{
            fontSize: "10px",
            color: "#aaa",
            borderTop: "1px solid #555",
            marginTop: "10px",
            marginBottom: "10px",
          }}
        ></div>
        <p style={{ margin: 0 }}>REF</p>
        <a
          href="https://github.com/naptha/tesseract.js.git"
          style={{ margin: 0, fontSize: "9px", color: "grey" }}
        >
          https://github.com/naptha/tesseract.js.git
        </a>
      </div>
    </aside>
  );
};

export default Sidebar;
