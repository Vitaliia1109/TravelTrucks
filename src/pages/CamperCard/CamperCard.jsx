import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Loader from "../../components/Loader/Loader";
import Reviews from "../../components/Reviews/Reviews";
import Details from "../../components/Details/Details";
import BookingForm from "../../components/BookingForm/BookingForm";
import css from "./CamperCard.module.css";

const CamperCard = () => {
  const { id } = useParams();
  const [camper, setCamper] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("details");

  useEffect(() => {
    const fetchCamperDetails = async () => {
      try {
        const camperResponse = await axios.get(
          `https://66b1f8e71ca8ad33d4f5f63e.mockapi.io/campers/${id}`
        );
        setCamper(camperResponse.data);
      } catch (error) {
        setError("Error fetching camper details. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchCamperDetails();
  }, [id]);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <div className={css.error}>{error}</div>; // Error state is used here
  }

  if (!camper) {
    return <div className={css.error}>Camper not found</div>;
  }

  return (
    <div className={css.camperCard}>
      <div className={css.content}>
        <div className={css.camperHeader}>
          <h1>{camper.name}</h1>
          <p className={css.price}>
            {camper.price.toLocaleString("en-US", {
              style: "currency",
              currency: "EUR",
            })}
          </p>
          <div className={css.gallery}>
            {camper.gallery &&
              camper.gallery.map((image, index) => (
                <img
                  key={index}
                  src={image.thumb}
                  alt={`${camper.name} ${index}`}
                  className={css.image}
                />
              ))}
          </div>
          <p>{camper.description}</p>
        </div>
        <div className={css.tabs}>
          <button
            className={activeTab === "details" ? css.activeTab : ""}
            onClick={() => setActiveTab("details")}
          >
            Details
          </button>
          <button
            className={activeTab === "reviews" ? css.activeTab : ""}
            onClick={() => setActiveTab("reviews")}
          >
            Reviews
          </button>
        </div>
        {activeTab === "details" && <Details camper={camper} />}
        {activeTab === "reviews" && <Reviews reviews={camper.reviews} />}
        <BookingForm camper={camper} />
      </div>
    </div>
  );
};

export default CamperCard;
