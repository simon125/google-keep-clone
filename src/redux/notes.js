import { db } from "../firebase";

const ADD_NOTE = "ADD_NOTE";
const DELETE_NOTE = "DELETE_NOTE";
const GET_NOTES = "GET_NOTES";
const GET_TAGS = "GET_TAGS";

export const addNote = note => (dispatch, getState) => {
  db.collection("test1")
    .add(note)
    .then(() => {
      console.warn("added note");
    });
};
export const getNotes = notes => {
  return {
    type: GET_NOTES,
    payload: notes
  };
};
export const addTag = tag => (dispatch, getState) => {
  console.log("addTag: ", tag);
  db.collection("tags")
    .add(tag)
    .then(() => {
      console.warn("added tag");
    });
};
export const getTags = tags => {
  return {
    type: GET_TAGS,
    payload: tags
  };
};

const initialState = {
  notes: [],
  tags: []
};

export const notes = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_NOTE":
      return {
        ...state,
        notes: [...state.notes, action.payload]
      };
    case "GET_NOTES":
      return {
        ...state,
        notes: action.payload
      };
    case "GET_TAGS":
      return {
        ...state,
        tags: action.payload
      };
    // case "DELETE_NOTE":
    //   return {
    //     ...state,
    //     isLoggedIn: false,
    //     user: null
    //   };
    default:
      return { ...state };
  }
};
