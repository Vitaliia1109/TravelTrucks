// import React from "react";
import { Link } from "react-router-dom";
import css from "./Home.module.css";

const Home = () => (
  <div className={css.home}>
    <div className={css.banner}>
      <div className={css.bannerContent}>
        <h2>Campers of your dreams</h2>
        <p>You can find everything you want in our catalog</p>
        <Link to="/catalog" className={css.button}>
          View Now
        </Link>
      </div>
    </div>
  </div>
);

export default Home;
