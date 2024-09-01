import { NavLink, useLocation } from "react-router-dom";
import css from "./Header.module.css";
import icon from "../../img/icons.svg";

const Header = () => {
  const location = useLocation();

  const isHomePage = location.pathname === "/";
  const isCatalogPage = location.pathname.startsWith("/catalog");

  // Если открыта страница кемпера, не отображаем Header
  if (
    location.pathname.includes("/catalog/") &&
    location.pathname !== "/catalog"
  ) {
    return null;
  }

  return (
    <header className={css.header}>
      <div className={css.logo}>
        <svg className={css.svgIcon}>
          <use href={`${icon}#icon-Logo`} />
        </svg>
      </div>
      <nav className={css.navbar}>
        <ul className={css.navLinks}>
          {/* Показать "Home" и "Catalog" ссылки на главной странице */}
          {isHomePage && (
            <>
              <li className={css.navLinksItem}>
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    isActive ? css.activeLink : css.navLinksItemLink
                  }
                  end
                >
                  Home
                </NavLink>
              </li>
              <li className={css.navLinksItem}>
                <NavLink
                  to="/catalog"
                  className={({ isActive }) =>
                    isActive ? css.activeLink : css.navLinksItemLink
                  }
                >
                  Catalog
                </NavLink>
              </li>
            </>
          )}

          {/* Показать только "Catalog" ссылку на странице каталога */}
          {isCatalogPage && !isHomePage && (
            <li className={css.navLinksItem}>
              <NavLink
                to="/catalog"
                className={({ isActive }) =>
                  isActive ? css.activeLink : css.navLinksItemLink
                }
              >
                Catalog
              </NavLink>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
