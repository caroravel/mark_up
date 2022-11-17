import { useDrag } from "react-dnd";
import { ItemTypes } from "./ItemTypes.js";
const style = {
  position: "absolute",
  border: "1px dashed gray",
  backgroundColor: "white",
  padding: "0.5rem 1rem",
  cursor: "move",
};
export const Box = ({
  id,
  left,
  top,
  hideSourceOnDrag,
  children,
  changeTitle,
}) => {
  const [{ isDragging }, drag] = useDrag(
    () => ({
      type: ItemTypes.BOX,
      item: { id, left, top },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    }),
    [id, left, top]
  );
  if (isDragging && hideSourceOnDrag) {
    return <div ref={drag} />;
  }
  return (
    <div
      className="box"
      ref={drag}
      style={{ ...style, left, top }}
      data-testid="box"
      id={id}
    >
      <input
        className="boxInput"
        value={children}
        onChange={(e) => changeTitle(id, e.target.value)}
      ></input>
      
    </div>
  );
};
