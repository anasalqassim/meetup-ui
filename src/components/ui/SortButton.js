import { useEffect, useState } from "react";
import classes from "./SortButton.module.css";
import { ReactComponent as SortIcon } from "../../icons/sort-icon.svg";

const OrderType = {LATEST: "Latest", OLDEST: "Oldest"};
export { OrderType };

export default function SortButton(props) {
  const [order, setOrder] = useState("Latest");
  const [rotateDeg, setRotatDeg] = useState(0);

  function handleOrderChange(event) {
    let newOrder = null;

    setOrder((prevOrder) => {

      if (prevOrder === OrderType.LATEST) 
        newOrder = OrderType.OLDEST;
      else 
        newOrder = OrderType.LATEST;

      
      return newOrder;
    });
    
    // will flip the svg upside down each time
    setRotatDeg((prev) => (prev + 180) % 360);
  }

  
  useEffect(() => {
    props.onChange(order);
    // eslint-disable-next-line
  }, [order]);

  return (
    <button className={classes.sortButton} onClick={handleOrderChange}>
      <SortIcon
        width="2rem"
        height="2rem"
        style={{ transform: `rotate(${rotateDeg}deg)`}}
      />
      {order}
    </button>
  );
}
