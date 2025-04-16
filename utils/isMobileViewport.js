export const isMobileViewport = (page) => {
  const size = page.viewportSize();
  return size.width <= 600;
};
