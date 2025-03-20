import { useState, useEffect } from "react";
import useIsomorphicEffect from "../useIsomorphicEffect";

function useWindowSize() {
  const [windowSize, setWindowSize] = useState({
    width: 0,
    height: 0,
  });

  useIsomorphicEffect(() => {
    setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }

    window.addEventListener("resize", handleResize);
    handleResize(); // 初始化时获取窗口大小

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowSize;
}

export default useWindowSize;
