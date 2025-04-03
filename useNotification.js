// 알림의 제목(title)과 옵션(options)을 매개변수로 받아 알림을 발생시키는 함수를 반환
export const useNotification = (title, options) => {
    // 만약 Notification API를 지원하지 않는 브라우저라면 함수를 조기에 종료 
    if (!("Notification" in window)) {
      return;
    }
  
    // fireNotif 함수는 실제로 알림을 발생 시킨다. 
    const fireNotif = () => {
      // 현재 알림 권한이 'granted'(허용) 상태가 아니라면,
      if (Notification.permission !== "granted") {
        // 사용자에게 알림 권한 요청
        Notification.requestPermission().then((permission) => {
          // 사용자가 알림 허용을 선택한 경우,
          if (permission === "granted") {
            // 새로운 알림 객체를 생성하여 알림을 표시함. 
            new Notification(title, options);
          } else {
            return;
          }
        });
      } else {
        // 이미 알림 권한이 'granted'라면, 바로 알림을 생성.
        new Notification(title, options);
      }
    };
  
    return fireNotif;
  };
  