
let _deps;
function useEffect(callback, depArray) {
  const hasNoDeps = !depArray;
    // 如果 _deps 存在，即不是第一次执行 useEffect，那么执行 !depArray.every((el, i) => el === _deps[i]) 判断依赖项是否发生变化。
  //如果 _deps 不存在（第一次执行 useEffect），则整个表达式为 true，因为这时认为依赖项发生了变化。
  const hasChangedDeps = _deps ?  !depArray.every((item, index) => item === deps[index]) : true;

  if (hasNoDeps || hasChangedDeps) {
    callback();
    _deps = depArray;
  }
};