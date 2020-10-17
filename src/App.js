import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";

import dataItem from "./mock/items-mock";
import "./App.css";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

function App() {
  const classes = useStyles();
  const [characters, updateCharacters] = useState(
    dataItem.finalSpaceCharacters
  );
  const [characters1, updateCharacters1] = useState(
    dataItem.finalSpaceCharacters1
  );

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

  const handleOnDragEnd = (result) => {
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
    <div className={classes.root}>
      <Container maxWidth="sm">
        <DragDropContext onDragEnd={handleOnDragEnd}>
          <Grid container spacing={3} direction="row">
            <Grid item xs={12} sm={6}>
              <Droppable droppableId="characters">
                {(provided) => (
                  <ul
                    className="characters"
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                  >
                    {characters.map(({ id, name, color }, index) => {
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
            </Grid>

            <Grid item xs={12} sm={6}>
              <Droppable droppableId="characters1">
                {(provided) => (
                  <>
                    <ul
                      className="characters"
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                    >
                      {characters1.map(({ id, name, color }, index) => {
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
                  </>
                )}
              </Droppable>
            </Grid>
          </Grid>
        </DragDropContext>
      </Container>
    </div>
  );
}

export default App;
