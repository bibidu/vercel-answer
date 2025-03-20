import React, { useEffect } from 'react';
import useLatest from './useLatest';

function ExampleComponent() {
  const [count, setCount] = React.useState(0);
  const latestCount = useLatest(count);

  useEffect(() => {
    const timer = setInterval(() => {
      console.log(latestCount.current); // 使用最新的 count 值
    }, 1000);

    return () => clearInterval(timer);
  }, [latestCount]);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}

export default ExampleComponent; 