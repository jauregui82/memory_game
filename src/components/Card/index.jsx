import PropTypes from "prop-types";

const Card = ({ item, id, handleClick }) => {
  const itemClass = item.stat ? `card--active  card--${item.stat} ` : "";

  return (
    <div
      className={`card ${itemClass}`}
      onClick={() => item.stat != "correct" && handleClick(id)}
    >
      <img src={item?.img ?? ""} alt={`${item?.img}-${item?.type}`} />
    </div>
  );
};

Card.propTypes = {
  item: PropTypes.any,
  id: PropTypes.any,
  handleClick: PropTypes.any,
};

export default Card;
