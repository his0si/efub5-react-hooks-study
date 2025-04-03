// 요청 옵션(opts)과 axios 인스턴스(기본값은 defaultAxios)를 매개변수로 받습니다.
export const useAxios = (opts, axiosInstance = defaultAxios) => {
  
    const [state, setState] = useState({
      loading: true,
      error: null,
      data: null,
    });
  
    // refetch(재요청)을 위한 trigger 상태를 정의
    // 이 값이 변경되면 useEffect가 다시 실행되어 데이터를 다시 불러온다. 
    const [trigger, setTrigger] = useState(0);
  
    // 요청 옵션에 URL이 없다면 아무런 작업도 하지 않고 종료
    // (즉, 필수 옵션인 URL이 없으면 요청을 실행하지 않는다.)
    if (!opts.url) {
      return;
    }
  
    // 현재 상태를 복사한 뒤, loading 상태를 true로 설정하여 재요청 중임을 표시
    // trigger 값을 현재 시간(Date.now())으로 변경하여 useEffect가 재실행되게 함
    const refetch = () => {
      setState({
        ...state,
        loading: true,
      });
      setTrigger(Date.now());
    };
  
    // useEffect 훅은 trigger 값이 변경될 때마다 실행
    // 즉, refetch 함수를 호출하면 trigger 값이 변경되어 요청이 다시 이루어진다. 
    useEffect(() => {
      // axiosInstance를 사용해 opts에 담긴 옵션으로 HTTP 요청을 보낸다. 
      axiosInstance(opts)
        // 요청이 성공하면:
        .then((data) => {
          // 기존 상태를 유지하면서 loading은 false로, 응답받은 data를 상태에 저장.
          setState({
            ...state,
            loading: false,
            data: data,
          });
        })
        // 요청이 실패하면:
        .catch((error) => {
          // 기존 상태를 유지하면서 loading은 false로, 에러 정보를 상태에 저장
          setState({ ...state, loading: false, error: error });
        });
    }, [trigger]); // trigger가 변경될 때마다 이 useEffect 내부의 코드가 재실행
  
    // 최종적으로 현재 상태(state)와 refetch 함수를 반환
    // 반환된 객체에는 loading, error, data 속성과 refetch 함수가 포함 된다.
    return { ...state, refetch };
  };
  