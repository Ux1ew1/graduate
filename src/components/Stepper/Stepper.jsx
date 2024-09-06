import Button from "../Button/Button";
const Stepper = (props) => {
  const { minValue, increment, dicrement, quantity } = props;
  return (
    <div className="bg-white py-1 rounded-md border-2 border-gray-400 flex gap-2 items-center px-1">
      <Button
        variant="info"
        onClick={dicrement}
        disabled={quantity <= minValue ? true : false}
      >
        -
      </Button>
      <span className="px-2">{quantity}</span>
      <Button variant="info" onClick={increment}>
        +
      </Button>
    </div>
  );
};
export default Stepper;
