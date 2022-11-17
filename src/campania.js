import React, { useEffect } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import "./Login.css";
import UserInfo from "./context";
import Navbar from "./pruebaNav";
import update from "immutability-helper";
import { useCallback, useState } from "react";
import { useDrop } from "react-dnd";
import { Box } from "./Box.js";
import { ItemTypes } from "./ItemTypes.js";
const styles = {
  width: 1400,
  height: 607,
  border: "1px solid black",
  position: "relative",
};

export default function Campania() {
  const [boxes, setBoxes] = useState({
    a: { top: 400, left: 100, title: "Mové los comentarios" },
    b: { top: 180, left: 20, title: "Moveme!" },
  });

  const createNewBox = () => {
    const random = Math.random() * 1000;
    setBoxes({
      ...boxes,
      [random]: { top: 20, left: 80, title: "" },
    });
  };

  const moveBox = useCallback(
    (id, left, top) => {
      setBoxes((boxes) => {
        return update(boxes, {
          [id]: {
            $merge: { left, top },
          },
        });
      });
    },
    [boxes, setBoxes]
  );
  const [, drop] = useDrop(
    () => ({
      accept: ItemTypes.BOX,
      drop(item, monitor) {
        const delta = monitor.getDifferenceFromInitialOffset();
        const left = Math.round(item.left + delta.x);
        const top = Math.round(item.top + delta.y);
        moveBox(item.id, left, top);
        return undefined;
      },
    }),
    [moveBox]
  );

  const changeTitle = (id, newTitle) => {
    console.log(id, newTitle)
    setBoxes((boxes) => {
      return ({
        ...boxes,
        [id]: { ...boxes[id], title: newTitle },
      });
    });
  }

  const [hideSourceOnDrag, setHideSourceOnDrag] = useState(true);
  const toggle = useCallback(
    () => setHideSourceOnDrag(!hideSourceOnDrag),
    [hideSourceOnDrag]
  );

  const changeBoxName = (boxId) => (e) => {
    setBoxes({
      ...boxes,
      [boxId]: { ...boxes[boxId], title: e.target.innerText },
    });
  };

  useEffect(() => {
    //console.log(Object.keys(boxes));
  });

  return (
    <>
      <div ref={drop} style={styles}>
    <div comentarios>
        {boxes
          ? Object.keys(boxes).map((key) => {
              const { left, top, title } = boxes[key];
              return (
                <Box
                  key={key}
                  id={key}
                  left={left}
                  top={top}
                  hideSourceOnDrag={toggle}
                  changeTitle={changeTitle}
                >
                  {title}
                </Box>
              );
            })
          : null}
        <button onClick={createNewBox} className="masComentarios">¡Agrega un comentario!</button>
      </div>
    </div>
    </>
  );
}
