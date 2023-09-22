import PropTypes from "prop-types";
import useSuccesses from "../../hooks/useSuccesses";
import "./styles.css";

const Card = ({ item, id, handleClick }) => {
  const { score } = useSuccesses();
  const verifyStatusGame = () => {
    const itemClass = item?.stat ? `card--active  card--${item.stat} ` : "";
    return score === 8 ? "" : itemClass;
  };

  return (
    <div
      className={`card ${verifyStatusGame()}`}
      onClick={() => item.stat != "correct" && handleClick(id)}
    >
      <img
        className="card__img "
        src={item?.img ?? ""}
        alt={`${item?.title}-${item?.id}`}
      />
    </div>
  );
};

Card.propTypes = {
  item: PropTypes.any,
  id: PropTypes.any,
  handleClick: PropTypes.any,
};

export default Card;
