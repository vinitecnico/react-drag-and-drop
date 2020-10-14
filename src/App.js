import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import "./App.css";

function App() {
  const finalSpaceCharacters = [
    {
      id: "gary",
      name: "Gary Goodspeed",
      thumb: "https://www.todopapas.com.pt/files/nombres/G/colorearGary.jpg",
    },
    {
      id: "cato",
      name: "Little Cato",
      thumb: "https://www.manutan.pt/img/S/GRP/ST/AIG3244575.jpg",
    },
    {
      id: "kvn",
      name: "KVN",
      thumb:
        "https://pm1.narvii.com/7181/524ec8132171a1cdec086c15df2c25001af3f63dr1-634-909v2_hq.jpg",
    },
  ];

  const finalSpaceCharacters1 = [
    {
      id: "aaa",
      name: "aaa",
      thumb: "https://www.ratespy.com/wp-content/uploads/2020/06/Canada-loses-AAA-rating-mortgage-rates-stable-1-700x467.jpg",
    },
    {
      id: "mooncake",
      name: "Mooncake",
      thumb: "https://www.voguehk.com/media/2019/09/HEADER-IMAGE-1280x844.jpg",
    },
  ];

  const [characters, updateCharacters] = useState(finalSpaceCharacters);
  const [characters1, updateCharacters1] = useState(finalSpaceCharacters1);

  const getItem = (source, index) => {
    return source === "characters" ? characters[index] : characters1[index];
  };

  const removeItem = (source, index) => {
    const items = source === "characters" ? characters : characters1;
    items.splice(index, 1);
    source === "characters"
      ? updateCharacters(items)
      : updateCharacters1(items);
  };

  const handleOnDragEnd = (result, aa) => {
    if (!result.destination) return;

    const source = result.source.droppableId;
    const destination = result.destination.droppableId;
    if (result.destination.droppableId === result.source.droppableId) {
      const items = Array.from(
        source === "characters" ? characters : characters1
      );
      const [reorderedItem] = items.splice(result.source.index, 1);
      items.splice(result.destination.index, 0, reorderedItem);

      source === "characters"
        ? updateCharacters(items)
        : updateCharacters1(items);
    } else {
      const item = getItem(source, result.source.index);
      removeItem(source, result.source.index);

      const items =
        destination === "characters"
          ? [...characters, item]
          : [...characters1, item];

      const [reorderedItem] = items.splice(items.length - 1, 1);
      items.splice(result.destination.index, 0, reorderedItem);

      destination === "characters"
        ? updateCharacters(items)
        : updateCharacters1(items);
    }
  };

  return (
    <div className="App">
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Droppable droppableId="characters">
          {(provided) => (
            <ul
              className="characters"
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {characters.map(({ id, name, thumb }, index) => {
                return (
                  <Draggable key={id} draggableId={id} index={index}>
                    {(provided) => (
                      <li
                        className="postit"
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        {/* <div className="characters-thumb">
                          <img src={thumb} alt={`${name} Thumb`} />
                        </div> */}
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
        <Droppable droppableId="characters1">
          {(provided) => (
            <>
              <ul
                className="characters"
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {characters1.map(({ id, name, thumb }, index) => {
                  return (
                    <Draggable key={id} draggableId={id} index={index}>
                      {(provided) => (
                        <li
                        className="postit"
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          {/* <div className="characters-thumb">
                            <img src={thumb} alt={`${name} Thumb`} />
                          </div> */}
                          <p>{name}</p>
                        </li>
                      )}
                    </Draggable>
                  );
                })}
                {provided.placeholder}
              </ul>
            </>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
}

export default App;
