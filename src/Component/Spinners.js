import React from "react";

//component called "Spinners" that renders a spinning loader
const Spinners = () => {
  return (
    <div class="d-flex justify-content-center spinner">
      <div class="spinner-border" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>
  );
};

export default Spinners;
