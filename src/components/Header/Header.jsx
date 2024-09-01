import { Link, useLocation } from "react-router-dom";
import css from "./Header.module.css";
import icon from "../../img/icons.svg";

const Header = () => {
  const location = useLocation();

  const isHomePage = location.pathname === "/";
  const isCatalogPage = location.pathname.startsWith("/catalog");

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
          {isHomePage && (
            <>
              <li className={css.navLinksItem}>
                <Link to="/">Home</Link>
              </li>
              <li className={css.navLinksItem}>
                <Link to="/catalog">Catalog</Link>
              </li>
            </>
          )}
          {isCatalogPage && !isHomePage && (
            <li className={css.navLinksItem}>
              <Link to="/catalog">Catalog</Link>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
