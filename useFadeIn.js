import React, { useState, useEffect, useRef } from "react";
import ReactDOM from "react-dom";

/**
 * useFadeIn
 * 해당 훅은 컴포넌트가 마운트될 때 지정된 시간과 지연 후 점점 나타나는(fade-in) 효과를 적용
 * @param {number} duration - 페이드 인에 걸리는 시간 (초 단위)
 * @param {number} delay - 애니메이션이 시작되기 전 대기 시간 (초 단위)
 * @returns {object} - ref와 style 속성을 포함한 객체
 */
const useFadeIn = (duration = 1, delay = 0) => {
  // duration과 delay가 숫자가 아닌 경우 아무 작업도 하지 않음
  if (typeof duration !== "number" || typeof delay !== "number") {
    return;
  }

  // DOM 요소에 직접 접근하기 위한 useRef 훅
  const element = useRef();

  useEffect(() => {
    // element.current가 존재할 경우 스타일 변경
    if (element.current) {
      const { current } = element;
      // opacity 변화에 대한 CSS transition 적용
      current.style.transition = `opacity ${duration}s ease-in-out ${delay}s`;
      // 초기에 0이었던 opacity를 1로 변경하여 점점 나타나게 함
      current.style.opacity = 1;
    }
  }, []); // 빈 의존성 배열이므로 마운트 시 한 번만 실행됨

  // 외부에서 사용할 수 있도록 ref와 초기 opacity 스타일을 반환
  return { ref: element, style: { opacity: 0 } };
};

/**
 * 화면에 텍스트 두 줄을 표시하며,
 * 각각 다른 duration과 delay로 페이드 인 효과를 부여
 */
const App = () => {
  // h1 요소에 1초 duration, 2초 delay로 페이드 인 효과 적용
  const fadeInH1 = useFadeIn(1, 2);
  // p 요소에 5초 duration, 10초 delay로 페이드 인 효과 적용
  const fadeInP = useFadeIn(5, 10);

  return (
    <div className="App">
      {/* spread 연산자를 사용하여 fadeIn 효과의 ref와 style을 적용 */}
      <h1 {...fadeInH1}>Hello</h1>
      <p {...fadeInP}>lorem ipsum lalalalal</p>
    </div>
  );
};

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
