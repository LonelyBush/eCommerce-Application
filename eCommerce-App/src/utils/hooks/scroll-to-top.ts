function useScrollTo(numb:number) {
  const scrollToTop = (): void => {
    window.scrollTo({
      top: numb,
      behavior: 'smooth',
    });
  };

  return { scrollToTop };
}
export default useScrollTo;
