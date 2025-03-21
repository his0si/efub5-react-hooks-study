export const useBeforeLeave = (onBefore) => { 
    if (typeof onBefore !== "function") {
        return;
    }

    // 마우스가 문서 영역을 떠날 때 호출될 핸들러 함수 정의
    const handle = (event) => {
        const { clientY } = event;
        // 마우스가 윗쪽 브라우저 영역(clientY <= 0)으로 나가려는 경우
        if (clientY <= 0) {
            onBefore();  // 등록된 콜백 함수 실행
        }
    };

    // 컴포넌트가 마운트(컴포넌트가 화면에 처음 나타나는 순간) 될 때 이벤트 리스너 등록, 언마운트 시 제거
    useEffect(() => {
        document.addEventListener("mouseleave", handle); // 마우스가 문서 바깥으로 나갈 때 감지
        return () => document.removeEventListener("mouseleave", handle); // 정리(clean-up)
    }, []);
};