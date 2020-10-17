import React, { useState } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import DroppableItem from "./component/droppable-item/droppable-item";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Icon from "@material-ui/core/Icon";

import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";

import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormLabel from "@material-ui/core/FormLabel";

import dataItem from "./mock/items-mock";
import "./App.css";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
}));

const App = () => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [source, setSource] = useState();
  const [description, setDescription] = useState();
  const [characters, updateCharacters] = useState(
    dataItem.finalSpaceCharacters
  );
  const [characters1, updateCharacters1] = useState(
    dataItem.finalSpaceCharacters1
  );

  const [brainstorming, setBrainstorming] = useState([]);

  const [value, setValue] = React.useState("postiti-yellow");

  const handleRadioChange = (event) => {
    setValue(event.target.value);
  };

  const getItem = (source, index) => {
    return source === "characters"
      ? characters[index]
      : source === "characters1"
      ? characters1[index]
      : brainstorming[index];
  };

  const removeItem = (source, index) => {
    const items =
      source === "characters"
        ? characters
        : source === "character1"
        ? characters1
        : brainstorming;
    items.splice(index, 1);
    source === "characters"
      ? updateCharacters(items)
      : source === "characters1"
      ? updateCharacters1(items)
      : setBrainstorming(items);
  };

  const handleOnDragEnd = (result) => {
    if (!result.destination) return;

    const source = result.source.droppableId;
    const destination = result.destination.droppableId;
    if (result.destination.droppableId === result.source.droppableId) {
      const items = Array.from(
        source === "characters"
          ? characters
          : source === "characters1"
          ? characters1
          : brainstorming
      );
      const [reorderedItem] = items.splice(result.source.index, 1);
      items.splice(result.destination.index, 0, reorderedItem);

      source === "characters"
        ? updateCharacters(items)
        : source === "characters1"
        ? updateCharacters1(items)
        : setBrainstorming(items);
    } else {
      const item = getItem(source, result.source.index);
      removeItem(source, result.source.index);

      const items =
        destination === "characters"
          ? [...characters, item]
          : destination === "characters1"
          ? [...characters1, item]
          : [...brainstorming, item];

      const [reorderedItem] = items.splice(items.length - 1, 1);
      items.splice(result.destination.index, 0, reorderedItem);

      destination === "characters"
        ? updateCharacters(items)
        : destination === "characters1"
        ? updateCharacters1(items)
        : setBrainstorming(items);
    }
  };

  const uuidv4 = () => {
    return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) =>
      (
        c ^
        (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
      ).toString(16)
    );
  };

  const createItem = (description, color) => {
    const item = {
      id: uuidv4(),
      name: description,
      color: color,
    };

    source === "characters"
      ? updateCharacters([...characters, item])
      : source === "characters1"
      ? updateCharacters1([...characters1, item])
      : setBrainstorming([...brainstorming, item]);
  };

  const handleClickOpen = (source) => {
    console.log(source);
    setOpen(true);
    setSource(source);
    setValue('postiti-yellow')
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (e) => {
    setDescription(e.target.value);
    console.log("handle change called");
  };

  const handleSubmit = () => {
    createItem(description, value);
    handleClose();
  };

  return (
    <div className={classes.root}>
      <Container maxWidth="sm">
        <DragDropContext onDragEnd={handleOnDragEnd}>
          <Grid container spacing={3} direction="row">
            <Grid item xs={12} sm={6}>
              <Icon onClick={() => handleClickOpen("characters")}>
                add_circle
              </Icon>
              <DroppableItem
                droppableId="characters"
                className="characters"
                items={characters}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <Icon onClick={() => handleClickOpen("characters1")}>
                add_circle
              </Icon>
              <DroppableItem
                droppableId="characters1"
                className="characters"
                items={characters1}
              />
            </Grid>
          </Grid>
          <Grid container spacing={3} direction="row">
            <Icon onClick={() => handleClickOpen("brainstorming")}>
              add_circle
            </Icon>
            <Grid item xs={12}>
              <DroppableItem
                droppableId="brainstorming"
                className="brainstorming"
                items={brainstorming}
              />
            </Grid>
          </Grid>
        </DragDropContext>
      </Container>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Create note"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <TextField
              id="outlined-basic"
              label="Description"
              variant="outlined"
              onChange={(e) => {
                handleChange(e);
              }}
            />
            <FormLabel component="legend">color</FormLabel>
            <RadioGroup
              aria-label="gender"
              name="color"
              value={value}
              onChange={handleRadioChange}
            >
              <FormControlLabel
                value="postiti-yellow"
                control={<Radio />}
                label="yellow"
              />
              <FormControlLabel
                value="postiti-blue"
                control={<Radio />}
                label="blue"
              />
              <FormControlLabel
                value="postiti-green"
                control={<Radio />}
                label="green"
              />
              <FormControlLabel
                value="postiti-orange"
                control={<Radio />}
                label="orange"
              />
              <FormControlLabel
                value="postiti-purple"
                control={<Radio />}
                label="purple"
              />
            </RadioGroup>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            cancel
          </Button>
          <Button onClick={handleSubmit} color="primary" autoFocus>
            save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default App;
