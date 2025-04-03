import React, { useState, useEffect, useRef } from "react";
import ReactDOM from "react-dom";

/**
 * useNetwork
 * 사용자의 네트워크 연결 상태(online/offline)를 감지하고 상태를 관리
 * @param {Function} onChange - 온라인/오프라인 상태가 바뀔 때 실행될 콜백 함수
 * @returns {boolean} 현재 네트워크 상태 (true: online, false: offline)
 */
const useNetwork = (onChange) => {
  // navigator.onLine은 현재 브라우저가 온라인인지 여부를 반환
  const [status, setStatus] = useState(navigator.onLine);

  // 네트워크 상태 변경 시 실행되는 핸들러
  const handleChange = () => {
    // onChange가 함수일 경우 실행하며 현재 상태를 인자로 전달
    if (typeof onChange === "function") {
      onChange(navigator.onLine);
    }
    // 내부 상태도 업데이트
    setStatus(navigator.onLine);
  };

  useEffect(() => {
    window.addEventListener("online", handleChange);
    window.addEventListener("offline", handleChange);
  
    // 컴포넌트 언마운트 시 이벤트 리스너 제거
    return () => {
      window.removeEventListener("online", handleChange);
      window.removeEventListener("offline", handleChange);
    };
  }, []);
  
  // 현재 온라인 상태 반환
  return status;
};

/**
 * 네트워크 상태에 따라 텍스트를 다르게 표시하고, 변경 시 콘솔에 로그를 남김
 */
const App = () => {
  // 네트워크 상태가 바뀔 때 실행될 콜백 함수
  const handleNetworkChange = (online) => {
    console.log(online ? "We just went online" : "We are offline");
  };

  // 커스텀 훅 사용하여 현재 온라인 상태 가져오기
  const onLine = useNetwork(handleNetworkChange);

  return (
    <div className="App">
      <h1>{onLine ? "Online" : "Offline"}</h1>
    </div>
  );
};

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
