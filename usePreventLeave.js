export const usePreventLeave = () => {
    // beforeunload 이벤트가 발생했을 때 실행될 함수 정의
    const listener = (event) => {
      // 기본 동작을 막음 (필수)
      event.preventDefault();
      // Chrome에서는 returnValue에 빈 문자열이라도 설정해야 경고창이 뜸
      event.returnValue = "";
    };
  
    // 이탈 방지 기능을 활성화
    const enablePrevent = () => window.addEventListener("beforeunload", listener);
  
    // 이탈 방지 기능을 비활성화
    const disablePrevent = () =>
      window.removeEventListener("beforeunload", listener);
  
    // 두 함수를 객체 형태로 반환
    return { enablePrevent, disablePrevent };
  };
  