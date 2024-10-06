import { THEMES } from "config";
import { type FC, type ReactNode } from "react";

interface Props {
  children?: ReactNode;
}

const toTitleCase = (str: string) => {
  return str.slice(0, 1).toUpperCase() + str.slice(1);
};

export const ThemeDropdown: FC<Props> = ({ children }) => {
  const handleSwitchTheme = (theme: string) => {
    document.documentElement.dataset.theme = theme;
  };

  return (
    <div className="dropdown dropdown-bottom">
      <div
        tabIndex={0}
        role="button"
        className="btn btn-md rounded-btn btn-outline"
      >
        {children}
      </div>
      <ul
        tabIndex={0}
        className="menu dropdown-content bg-base-100 rounded-box z-[1] w-52 p-2 mt-2 ring-2 ring-primary max-h-[200px] flex-nowrap overflow-auto"
      >
        {Object.values(THEMES).map((theme) => {
          return (
            <li
              key={theme}
              data-theme={theme}
              className="rounded-box mb-2 [&:last-child]:mb-0"
            >
              <div
                role="button"
                tabIndex={0}
                onClick={() => handleSwitchTheme(theme)}
                className="btn btn-primary rounded-box"
              >
                {toTitleCase(theme)}
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
