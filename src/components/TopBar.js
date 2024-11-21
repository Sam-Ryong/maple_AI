import React from "react";

const TopBar = () => {
  return (
    <header
      style={{
        height: "60px",
        backgroundColor: "#333",
        padding: "10px 20px",
        color: "white",
        fontWeight: "bold",
        boxSizing: "border-box",
        display: "flex",
        alignItems: "center",
        borderBottomLeftRadius: "15px",
        borderBottomRightRadius: "15px",
      }}
    >
      <h1 style={{ margin: 0, fontSize: "16px" }}>
        MapleLand Copilot (Prototype)
        <img src="https://maplestory.io/api/wz/img/GMS/195/UI/UIWindow2.img/QuestIcon/0/0" />
      </h1>
    </header>
  );
};

export default TopBar;
