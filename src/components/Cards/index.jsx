import Card from "../../components/Card";

import PropTypes from "prop-types";

const Cards = ({ items, handleClick }) => {
  return (
    <>
      <div className="container">
        {items &&
          items?.map((item, index) => (
            <Card
              key={index}
              item={item}
              id={index}
              handleClick={handleClick}
            />
          ))}
      </div>
    </>
  );
};

Cards.propTypes = {
  items: PropTypes.array.isRequired,
  handleClick: PropTypes.func.isRequired,
};

export default Cards;
