
export function isValidKey(event: any, allowAlpha: boolean = false, allowDash: boolean = false): boolean {
  let key = event.keyCode;
  if ((event.ctrlKey && key === 65) ||
    (!event.shiftKey && key >= 48 && key <= 57) ||
    (key >= 96 && key <= 105) ||
    (key === 37 || key === 39) ||
    (key === 8 || key === 9 || key === 13 || key === 20 || key === 46 || key === 35 || key === 36) ||
    (allowAlpha && (key >= 65 && key <= 90)) ||
    (allowDash && (key === 189))) {
    return true;
  }

  return false;
}
