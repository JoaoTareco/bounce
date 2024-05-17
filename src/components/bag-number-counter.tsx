import React, { useState } from "react";
import { Button } from "./ui/button";

interface BagCounterProps {
  initialValue: number;
  onNumberChange: (newValue: number) => void;
}

const BagCounter: React.FC<BagCounterProps> = ({ initialValue, onNumberChange }) => {
  const [count, setCount] = useState(initialValue);

  // Increase variable for number of bags
  const increment = () => {
    const newValue = count + 1;
    setCount(newValue);
    onNumberChange(newValue);
  };

  // Decrease variable for number of bags only if it is greater than 1 (we shouldn't be able to buy 0)
  const decrement = () => {
    if (count > 1 ){
      const newValue = count - 1;
      setCount(newValue);
      onNumberChange(newValue);
    }
  };

  return (
    <div>
      <Button className="mr-4 h-8 w-8" onClick={decrement} variant={count > 1 ? 'default' : 'secondary'}>-</Button>
      <span>{count}</span>
      <Button className="ml-4 h-8 w-8" onClick={increment}>+</Button>
    </div>
  );
};

export default BagCounter;
