interface IUseSize {
  isDesktop: boolean;
}

export default (): IUseSize => ({
  isDesktop: window.innerWidth >= 1115,
});
