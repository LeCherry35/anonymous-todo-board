import React from "react";

const Loader = () => {
  return (
    <div
      className="absolute top-1/2 left-1/2 h-48 w-48"
      style={{ transform: "translateX(-50%) translateY(-50%)" }}
    >
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
        <circle
          fill="#fed7aa"
          stroke="#fed7aa"
          stroke-width="15"
          r="15"
          cx="40"
          cy="100"
        >
          <animate
            attributeName="opacity"
            calcMode="spline"
            dur="2"
            values="1;0;1;"
            keySplines=".5 0 .5 1;.5 0 .5 1"
            repeatCount="indefinite"
            begin="-.4"
          ></animate>
        </circle>
        <circle
          fill="#fed7aa"
          stroke="#fed7aa"
          stroke-width="15"
          r="15"
          cx="100"
          cy="100"
        >
          <animate
            attributeName="opacity"
            calcMode="spline"
            dur="2"
            values="1;0;1;"
            keySplines=".5 0 .5 1;.5 0 .5 1"
            repeatCount="indefinite"
            begin="-.2"
          ></animate>
        </circle>
        <circle
          fill="#fed7aa"
          stroke="#fed7aa"
          stroke-width="15"
          r="15"
          cx="160"
          cy="100"
        >
          <animate
            attributeName="opacity"
            calcMode="spline"
            dur="2"
            values="1;0;1;"
            keySplines=".5 0 .5 1;.5 0 .5 1"
            repeatCount="indefinite"
            begin="0"
          ></animate>
        </circle>
      </svg>
    </div>
  );
};

export default Loader;
