import Lottie from "lottie-react";
import React from "react";
import LoadingDots from "../../assets/json/LoadingDots.json";

function Loading() {
  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Lottie animationData={LoadingDots} width="100%" height="100%" />
    </div>
  );
}

export default Loading;
