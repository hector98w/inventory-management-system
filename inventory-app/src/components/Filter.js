import React, { useState } from "react";

function Filter() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <button
        onclick={() => setIsOpen(!isOpen)}
        className="filter__button"
      ></button>
      ‍ Technologies
    </div>
  );
}

export default Filter;
