import React, { useState, useEffect, useRef } from "react";
import ReactDOM from "react-dom";

/**
 * useFullscreen
 * 특정 DOM 요소를 전체 화면으로 전환하거나 종료할 수 있게 해주는 기능을 제공
 * @param {Function} callback - 전체화면 상태가 바뀔 때 실행되는 함수 (true: 전체화면, false: 일반 화면)
 * @returns {Object} element (ref 객체), triggerFull (전체화면 진입 함수), exitFull (전체화면 종료 함수)
 */
const useFullscreen = (callback) => {
  // 전체화면을 적용할 DOM 요소를 참조하기 위한 ref 생성
  const element = useRef();

  // 전체화면 진입 함수
  const triggerFull = () => {
    if (element.current) {
      // HTML5 API: 지정된 요소를 전체 화면으로 전환
      element.current.requestFullscreen();
      // 콜백이 함수일 경우 실행, true 전달
      if (callback && typeof callback === "function") {
        callback(true);
      }
    }
  };

  // 전체화면 종료 함수
  const exitFull = () => {
    // 현재 문서가 전체화면이라면 빠져나감
    document.exitFullscreen();
    // 콜백이 함수일 경우 실행, false 전달
    if (callback && typeof callback === "function") {
      callback(false);
    }
  };

  // 전체화면 조작을 위한 함수와 ref 반환
  return { element, triggerFull, exitFull };
};

const App = () => {
  // 전체화면 상태 변경 시 실행될 콜백 함수
  const callback = (isFull) => {
    console.log(isFull ? "We are full" : "We are small");
  };

  // 커스텀 훅 사용하여 ref와 제어 함수 가져오기
  const { element, triggerFull, exitFull } = useFullscreen(callback);

  return (
    <div className="App" style={{ height: "1000vh" }}>
      {/* 전체화면을 적용할 요소 */}
      <div ref={element}>
        <img
          src="https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyNDAzMTBfMTkw%2FMDAxNzEwMDY2NzQyNDYw.Inm4oKue1dzbt2es8nSPMdTnsMMM6Mnls4LvpDvWGYMg.TVNS8LO_l2taj9LXx-SaK2j00X4WLHy9_gzhqAuO-Sog.PNG%2F14.png&type=sc960_832"
          alt="Example"
        />
        {/* 전체화면 종료 버튼 */}
        <button onClick={exitFull}>Exit fullscreen</button>
      </div>

      {/* 전체화면 진입 버튼 */}
      <button onClick={triggerFull}>Make fullscreen</button>
    </div>
  );
};

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);