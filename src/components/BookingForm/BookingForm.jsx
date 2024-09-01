// import { useState } from "react";
import { toast } from "react-hot-toast";
import css from "./BookingForm.module.css";

const BookingForm = ({ camperId }) => {
  const handleBookingSubmit = (event) => {
    event.preventDefault();

    // Отримання даних із форми
    const formData = new FormData(event.target);
    const bookingData = {
      camperId,
      name: formData.get("name"),
      email: formData.get("email").toLowerCase(),
      startDate: formData.get("startDate"),
      comment: formData.get("comment"),
    };

    console.log("Booking Data (імітовано відправку):", bookingData);

    // Показ тосту
    toast.success("Дякуємо! Ваша заявка була успішно відправлена.");

    // Очистка форми (за бажанням)
    event.target.reset();
  };

  return (
    <div className={css.bookingFormContainer}>
      <h3>Book your campervan now</h3>
      <p>Stay connected! We are always ready to help you.</p>

      <form className={css.bookingForm} onSubmit={handleBookingSubmit}>
        <div className={css.formGroup}>
          <label htmlFor="name">Name</label>
          <input type="text" id="name" name="name" required />
        </div>
        <div className={css.formGroup}>
          <label htmlFor="email">Email</label>
          <input type="email" id="email" name="email" required />
        </div>
        <div className={css.formGroup}>
          <label htmlFor="startDate">Booking date</label>
          <input type="date" id="startDate" name="startDate" required />
        </div>
        <div className={css.formGroup}>
          <label htmlFor="comment">Comment</label>
          <textarea id="comment" name="comment"></textarea>
        </div>
        <button type="submit" className={css.submitButton}>
          Send
        </button>
      </form>
    </div>
  );
};

export default BookingForm;
