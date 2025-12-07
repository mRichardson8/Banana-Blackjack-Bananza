import { useCallback, useRef } from "react";
import cardBack2 from "../../../public/assets/cardback.png";
import { getCardImage } from "../../pages/Game/getCardImage";
import "./Card.css";

const Card = ({ value, width, height }) => {
  // convert value to the correct png
  const getCardValue = useCallback(() => {
    // return cardBack;
    return getCardImage(value)
  }, [value]);

  const ref = useRef(null);

  return (
    <div className="card-outer" id={value}>
      <div className="card-inner" ref={ref}>
        <div className="card-front">
          <img
            src={getCardValue()}
            alt="card graphic"
            style={{ width: width, height: height }}
          />
        </div>
        <div className="card-back">
          <img
            src={cardBack2}
            alt="card graphic"
            style={{ width: width, height: height }}
          />
        </div>
      </div>
    </div>
  );
};

export default Card;
