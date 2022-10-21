import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import "./Login.css";
import UserInfo from "./context";
import Navbar from "./pruebaNav";

import update from 'immutability-helper'
import { useCallback, useState } from 'react'
import { useDrop } from 'react-dnd'
import { Box } from './Box.js'
import { ItemTypes } from './ItemTypes.js'
const styles = {
  width: 300,
  height: 300,
  border: '1px solid black',
  position: 'relative',
}

export default function Campania() {
  const [boxes, setBoxes] = useState({
    a: { top: 20, left: 80, title: "Drag me around" },
    b: { top: 180, left: 20, title: "Drag me too" },
  });


  
  const createNewBox = () => {
    const random = Math.random() * 1000
    setBoxes({
      ...boxes,
      [random]: { top: 20, left: 80, title: "" }
    })
  }

  const moveBox = useCallback(
    (id, left, top) => {
      setBoxes(
        update(boxes, {
          [id]: {
            $merge: { left, top },
          },
        })
      );
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

  const [hideSourceOnDrag, setHideSourceOnDrag] = useState(true)
  const toggle = useCallback(
    () => setHideSourceOnDrag(!hideSourceOnDrag),
    [hideSourceOnDrag],
  )

  return (
    <>
      
        <div ref={drop} style={styles}>
          {Object.keys(boxes).map((key) => {
            const { left, top, title } = boxes[key];
            return (
              <Box
                key={key}
                id={key}
                left={left}
                top={top}
                hideSourceOnDrag={hideSourceOnDrag}
              >
                {title}
              </Box>
            );
          })}
          <button onClick={createNewBox}>+</button>
        </div>
    </>
  );
}
