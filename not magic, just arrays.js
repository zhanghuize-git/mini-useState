let memoizedState = []; // 存放hooks
let cursor = 0; // 存放下标

function useState(initialValue) {
  memoizedState[cursor] = memoizedState[cursor] || initialValue;
  const currentCursor = cursor;

  function setState(newState) {
    memoizedState[currentCursor] = newState;
    render();
  }

  return [memoizedState[cursor++], setState]; // 返回当前值和设置值的函数],并将 cursor + 1
}

function useEffect(callback, depArray) {
  const hasNoDeps = !depArray;
  const deps = memoizedState[cursor];
  const hasChangedDeps = deps ? !depArray.every((item, index) => item === deps[index]) : true;
  if (hasChangedDeps || hasNoDeps) {
    callback();
    memoizedState[cursor] = depArray;
  }
  cursor++; // 这个是为了下一个 useEffect 使用的，因为每个 useEffect 都会调用一次，所以需要在每次调用后，cursor + 1
}