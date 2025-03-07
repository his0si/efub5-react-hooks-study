import { useState } from 'react';

const useTabs = (initialTab, allTabs) => {
  const [currentIndex, setCurrentIndex] = useState(initialTab);
  // React Hooks는 모든 렌더링에서 항상 같은 순서로 호출 되어야 함
  // 항상 useState를 실행하도록 보장 
  // Hook을 조건문 안에서 호출하는 대신, allTabs가 유효하지 않을 경우 기본값을 반환하도록 수정
  if (!Array.isArray(allTabs) || allTabs.length === 0) {
    return {
      currentItem: null,
      changeItem: () => {},
    };
  }

  return {
    currentItem: allTabs[currentIndex] || allTabs[0],  // 현재 인덱스가 범위를 벗어나면 첫 번째 항목 사용
    changeItem: setCurrentIndex,
  };
};

export default useTabs;
