import { useState } from 'react';

export default function CategoryButtons({ searchCategory, setSearchCategory }) {
  // configuration array for category search buttons
  const categoryButtons = [
    { label: "☕ Coffee", value: "coffee" },
    { label: "🍽️ Restaurants", value: "restaurant" },
    { label: "🍸 Bars", value: "bar" },
    { label: "🏨 Hotels", value: "hotel" },
    { label: "🏛️ Museums", value: "museum" },
  ];

  const handleCategoryClick = (e) => {
    setSearchCategory(e.target.dataset.category);
    console.log(e.target.dataset.category);
  };

  /* Show category search buttons */
  return (
    <div className="navbar navbar-expand-lg navbar-dark justify-content-center">
      {categoryButtons.map(({ label, value }) => (
        <button
          key={value}
          data-category={value}
          onClick={handleCategoryClick}
          className={`mx-1 btn btn-sm btn-outline-secondary rounded-pill ${
            searchCategory === value && " text-info border-info"
          }`}
        >
          {label}
        </button>
      ))}
    </div>
  );
}
