import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { fetchCampers } from "../../redux/operations/camperOperations";
import {
  selectCampersStatus,
  selectFavoriteCampers,
} from "../../redux/selectors/camperSelectors";
import {
  setLocation,
  setBodyType,
  toggleAC,
  toggleKitchen,
  toggleTV,
  toggleBathroom,
  toggleAutomatic,
  resetFilters,
} from "../../redux/slices/filtersSlice";
import { addFavorite, removeFavorite } from "../../redux/slices/favoritesSlice";
import css from "./Catalog.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as faHeartRegular } from "@fortawesome/free-regular-svg-icons";

const Catalog = () => {
  const dispatch = useDispatch();
  const campersData = useSelector((state) => state.campers.items);
  const status = useSelector(selectCampersStatus);
  const favorites = useSelector(selectFavoriteCampers);
  const filters = useSelector((state) => state.filters);

  const [filteredCampers, setFilteredCampers] = useState([]);
  const [showMore, setShowMore] = useState(5);
  const [searchTriggered, setSearchTriggered] = useState(false);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchCampers()).then((action) => {
        if (fetchCampers.fulfilled.match(action)) {
          const campersArray = Array.isArray(action.payload.items)
            ? action.payload.items
            : [];
          setFilteredCampers(campersArray);
        } else if (fetchCampers.rejected.match(action)) {
          console.error("Failed to load campers:", action.error);
        }
      });
    }
  }, [status, dispatch]);

  const handleFilterChange = (event) => {
    const { name, value, type } = event.target;
    if (type === "checkbox") {
      if (name === "hasAC") {
        dispatch(toggleAC());
      } else if (name === "hasKitchen") {
        dispatch(toggleKitchen());
      } else if (name === "hasTV") {
        dispatch(toggleTV());
      } else if (name === "hasBathroom") {
        dispatch(toggleBathroom());
      } else if (name === "hasAutomatic") {
        dispatch(toggleAutomatic());
      }
    } else if (name === "location") {
      dispatch(setLocation(value));
    } else if (name === "bodyType") {
      dispatch(setBodyType(value));
    }
  };

  const handleSearch = () => {
    dispatch(resetFilters()); // Скидаємо всі фільтри
    setSearchTriggered(true);
    setFilteredCampers([]); // Скидаємо попередні результати
    if (Array.isArray(campersData.items)) {
      const filtered = campersData.items.filter((camper) => {
        if (
          filters.location &&
          !camper.location
            .toLowerCase()
            .includes(filters.location.toLowerCase())
        ) {
          return false;
        }

        if (filters.bodyType && camper.form !== filters.bodyType) {
          return false;
        }

        if (filters.hasAC && !camper.AC) {
          return false;
        }

        if (filters.hasKitchen && camper.kitchen !== true) {
          return false;
        }

        if (filters.hasTV && !camper.TV) {
          return false;
        }

        if (filters.hasBathroom && !camper.bathroom) {
          return false;
        }

        if (filters.hasAutomatic && camper.transmission !== "automatic") {
          return false;
        }

        return true;
      });
      setFilteredCampers(filtered);
    } else {
      console.error(
        "Expected campersData.items to be an array but got:",
        typeof campersData.items
      );
      setFilteredCampers([]);
    }
  };

  const handleFavoriteToggle = (camper) => {
    if (favorites.some((favorite) => favorite.id === camper.id)) {
      dispatch(removeFavorite(camper));
    } else {
      dispatch(addFavorite(camper));
    }
  };

  const handleLoadMore = () => {
    setShowMore((prev) => prev + 5);
  };

  if (status === "loading") {
    return <div className={css.loader}>Loading...</div>;
  }

  if (status === "failed") {
    return (
      <div className={css.error}>
        Failed to load campers. Please try again later.
      </div>
    );
  }

  const campersToShow = searchTriggered ? filteredCampers : campersData.items;

  return (
    <div className={css.catalog}>
      <aside className={css.filters}>
        <div className={css.filterGroup}>
          <label htmlFor="location">Location</label>
          <input
            type="text"
            name="location"
            id="location"
            placeholder="Kyiv, Ukraine"
            onChange={handleFilterChange}
            className={css.input}
          />
        </div>
        <div className={css.filterGroup}>
          <label>Vehicle equipment</label>
          <div className={css.checkboxGroup}>
            <label>
              <input
                type="checkbox"
                name="hasAC"
                onChange={handleFilterChange}
              />{" "}
              AC
            </label>
            <label>
              <input
                type="checkbox"
                name="hasKitchen"
                onChange={handleFilterChange}
              />{" "}
              Kitchen
            </label>
            <label>
              <input
                type="checkbox"
                name="hasTV"
                onChange={handleFilterChange}
              />{" "}
              TV
            </label>
            <label>
              <input
                type="checkbox"
                name="hasBathroom"
                onChange={handleFilterChange}
              />{" "}
              Bathroom
            </label>
            <label>
              <input
                type="checkbox"
                name="hasAutomatic"
                onChange={handleFilterChange}
              />{" "}
              Automatic
            </label>
          </div>
        </div>
        <div className={css.filterGroup}>
          <label>Vehicle type</label>
          <div className={css.checkboxGroup}>
            <label>
              <input
                type="radio"
                name="bodyType"
                value="alcove"
                onChange={handleFilterChange}
              />{" "}
              Alcove
            </label>
            <label>
              <input
                type="radio"
                name="bodyType"
                value="fullyIntegrated"
                onChange={handleFilterChange}
              />{" "}
              Fully Integrated
            </label>
            <label>
              <input
                type="radio"
                name="bodyType"
                value="panelTruck"
                onChange={handleFilterChange}
              />{" "}
              Panel Truck
            </label>
          </div>
        </div>
        <button onClick={handleSearch} className={css.searchButton}>
          Search <FontAwesomeIcon icon={faSearch} />
        </button>
      </aside>
      <main className={css.campers}>
        {Array.isArray(campersToShow) &&
          campersToShow.slice(0, showMore).map((camper) => (
            <div key={camper.id} className={css.camperCard}>
              <img
                src={camper.gallery[0].thumb}
                alt={camper.name}
                className={css.image}
              />
              <div className={css.camperInfo}>
                <div className={css.camperHeader}>
                  <h2>{camper.name}</h2>
                  <button
                    onClick={() => handleFavoriteToggle(camper)}
                    className={css.favoriteButton}
                  >
                    {favorites.some((favorite) => favorite.id === camper.id) ? (
                      <FontAwesomeIcon icon={faHeart} />
                    ) : (
                      <FontAwesomeIcon icon={faHeartRegular} />
                    )}
                  </button>
                </div>
                <p className={css.price}>
                  {camper.price.toLocaleString("en-US", {
                    style: "currency",
                    currency: "EUR",
                  })}
                </p>
                <div className={css.features}>
                  <span>{camper.transmission}</span>
                  <span>{camper.engine}</span>
                  {camper.kitchen && <span>Kitchen</span>}
                  {camper.AC && <span>AC</span>}
                  {camper.TV && <span>TV</span>}
                  {camper.bathroom && <span>Bathroom</span>}
                </div>
                <Link
                  to={`/catalog/${camper.id}`}
                  target="_blank"
                  className={css.showMoreButton}
                >
                  Show more
                </Link>
              </div>
            </div>
          ))}
        {showMore <
          (Array.isArray(campersToShow) ? campersToShow.length : 0) && (
          <button className={css.loadMore} onClick={handleLoadMore}>
            Load More
          </button>
        )}
      </main>
    </div>
  );
};

export default Catalog;
