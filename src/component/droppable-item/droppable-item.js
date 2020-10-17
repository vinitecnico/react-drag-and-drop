import React from "react";
import { Droppable, Draggable } from "react-beautiful-dnd";

const DroppableItem = ({droppableId, className, items}) => {
  return (
    <Droppable droppableId={droppableId}>
      {(provided) => (
        <ul
          className={className}
          {...provided.droppableProps}
          ref={provided.innerRef}
        >
          {items.map(({ id, name, color }, index) => {
            return (
              <Draggable key={id} draggableId={id} index={index}>
                {(provided) => (
                  <li
                    className={`postit ${color}`}
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    <p>{name}</p>
                  </li>
                )}
              </Draggable>
            );
          })}
          {provided.placeholder}
        </ul>
      )}
    </Droppable>
  );
};

export default DroppableItem;
