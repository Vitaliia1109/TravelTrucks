import css from "./Loader.module.css";

const Loader = () => (
  <div className={css.loader}>
    <div className={css.spinner}></div>
  </div>
);

export default Loader;
