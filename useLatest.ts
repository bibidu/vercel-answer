import { useRef } from 'react';

function useLatest<T>(value: T): { current: T } {
  const ref = useRef(value);
  ref.current = value; // 更新 ref 的值为最新的 value
  return ref;
}

export default useLatest; 