import { THEMES } from "@/config/themes";
import { type FC, type ReactNode } from "react";

interface Props {
  children?: ReactNode;
}

export const ThemeDropdown: FC<Props> = ({}) => {
  const handleSwitchTheme = (theme: string) => {
    document.documentElement.dataset.theme = theme;
    const activeElem = document.activeElement as HTMLElement;

    if (activeElem) {
      activeElem.blur();
    }
  };

  return (
    <div className="dropdown dropdown-right  dropdown-bottom">
      <div tabIndex={0} role="button" className="btn  btn-primary rounded-btn">
        Theme
      </div>
      <ul
        tabIndex={0}
        className="menu dropdown-content bg-base-100 rounded-box z-[1] w-52 p-2 shadow ring-2 ring-primary"
      >
        {Object.values(THEMES).map((theme) => {
          return (
            <li
              key={theme}
              data-theme={theme}
              className="!bg-base-100 p-4 rounded-box"
            >
              <div
                role="button"
                tabIndex={0}
                onClick={() => handleSwitchTheme(theme)}
                className="btn btn-primary"
              >
                {theme}
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
