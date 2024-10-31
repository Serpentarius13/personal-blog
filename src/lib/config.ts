export const HIDE_UI_SERVICE = {
  HIDE_UI_KEY: "hide-ui",
  getIsHideUi() {
    return !!localStorage.getItem(this.HIDE_UI_KEY);
  },
  setHideUi(isHide: boolean) {
    return isHide
      ? localStorage.setItem(this.HIDE_UI_KEY, "1")
      : localStorage.removeItem(this.HIDE_UI_KEY);
  },
};
