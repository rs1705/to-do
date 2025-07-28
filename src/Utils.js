export const closeIfSmallScreen = (closeFn) => {
  if (window.innerWidth < 768) {
    closeFn?.();
  }
};

export const createId = () => {
  return `id_${Date.now().toString(16)}${Math.random().toString(16).slice(2)}`;
};
