export default isElementBottomInViewPort;

function isElementBottomInViewPort(el: HTMLElement | null) {
  if (!el) {
    return false;
  }

  const rect = el.getBoundingClientRect();
  return (
    rect.bottom <=
      (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}
