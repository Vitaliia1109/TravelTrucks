// import React from "react";
import css from "./Details.module.css";

const Details = ({ camper }) => {
  // Створюємо масив з об'єктів, що містять властивість та її відображуване ім'я
  const features = [
    {
      property: "transmission",
      label: camper.transmission === "automatic" ? "Automatic" : "Manual",
    },
    { property: "AC", label: "AC" },
    {
      property: "engine",
      label: camper.engine.charAt(0).toUpperCase() + camper.engine.slice(1),
    },
    { property: "kitchen", label: "Kitchen" },
    { property: "radio", label: "Radio" },
    { property: "TV", label: "TV" },
    { property: "bathroom", label: "Bathroom" },
    { property: "refrigerator", label: "Refrigerator" },
    { property: "microwave", label: "Microwave" },
    { property: "gas", label: "Gas" },
    { property: "water", label: "Water" },
  ];

  return (
    <div className={css.featuresTab}>
      <div className={css.features}>
        {features.map(
          (feature, index) =>
            (camper[feature.property] ||
              feature.property === "transmission") && (
              <span key={index}>{feature.label}</span>
            )
        )}
      </div>
      <div className={css.details}>
        <h3>Vehicle details</h3>
        <ul>
          <li>
            <strong>Form:</strong> {camper.form}
          </li>
          <li>
            <strong>Length:</strong> {camper.length} m
          </li>
          <li>
            <strong>Width:</strong> {camper.width} m
          </li>
          <li>
            <strong>Height:</strong> {camper.height} m
          </li>
          <li>
            <strong>Tank:</strong> {camper.tank} L
          </li>
          <li>
            <strong>Consumption:</strong> {camper.consumption} L/100km
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Details;
