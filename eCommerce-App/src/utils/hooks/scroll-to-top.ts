function useScrollToTop() {
  const scrollToTop = (): void => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return { scrollToTop };
}
export default useScrollToTop;
