const ButtonGroup = ({ categoryButtons, searchCategory, setSearchCategory }) => {
  return (
    <div className="">
        {categoryButtons.map( ( { label, value } ) => (
          <button
            key={value}
            onClick={() => setSearchCategory(value)}
            className={`btn btn-sm ${searchCategory === value && "active"}`}
          >
            {label}
          </button>
        ))}
      </div>
  );
};

export default ButtonGroup;
