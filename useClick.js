// 클릭 이벤트가 발생했을 때 실행할 콜백 함수를 인자로 받는 커스텀 훅
export const useClick = (onClick) => {
    if (typeof onClick !== "function") {
      return;
    }
  
    // DOM 요소에 접근하기 위한 ref 객체 생성
    const element = useRef();
  
    useEffect(() => {
      // 컴포넌트가 마운트되었을 때 (한 번만 실행됨)
      if (element.current) {
        element.current.addEventListener("click", onClick);
      }
  
      // 컴포넌트가 언마운트되거나 useEffect가 다시 실행될 때 호출됨 (정리 함수)
      return () => {
        if (element.current) {
          element.current.removeEventListener("click", onClick);
        }
      };
    }, []);
  
    // 클릭 이벤트를 등록할 대상 요소에 ref를 연결하기 위해 반환
    return element;
  };
  