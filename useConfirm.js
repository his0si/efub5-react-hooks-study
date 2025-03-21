// 메시지와 두 개의 콜백 함수를 받아 사용자의 확인 여부에 따라 동작을 분기하는 커스텀 훅
export const useConfirm = (message = "", onConfirm, onCancel) => {
    // onConfirm가 존재하는데 함수가 아니면 리턴 (에러 방지)
    if (onConfirm && typeof onConfirm !== "function") {
      return;
    }
    if (onCancel && typeof onCancel !== "function") {
      return;
    }
  
    // 확인창을 띄우고, 사용자의 응답에 따라 onConfirm 또는 onCancel 호출
    const confirmAction = () => {
      if (confirm(message)) {
        // 사용자가 '확인'을 눌렀을 경우
        onConfirm();
      } else {
        // 사용자가 '취소'를 눌렀을 경우
        onCancel();
      }
    };
  
    // confirmAction 함수를 반환 (이걸 나중에 원하는 곳에서 실행함)
    return confirmAction;
  };
  