export function converSnackKey(target) {
  return target.replace(/[A-Z]/g, (e, i) => {
    return "_" + e.toLowerCase();
  });
}

export function converGreatHump(target) {
  let _target = target.slice(0, 1).toUpperCase() + target.slice(1);
  return _target.replace(/_(\w)/g, (e) => {
    return e[1].toUpperCase();
  });
}
