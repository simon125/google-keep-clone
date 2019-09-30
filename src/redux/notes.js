import { addNoteToDB, addTagToDB } from '../firebase/firebaseAPI';

const DELETE_NOTE = 'DELETE_NOTE';
const GET_NOTES = 'GET_NOTES';
const GET_TAGS = 'GET_TAGS';
const SET_LAST_INDEX = 'SET_LAST_INDEX';
const GET_NOTE_STRUCTURE = 'GET_NOTE_STRUCTURE';

export const addNote = (note) => (dispatch, getState) => {
  addNoteToDB(note);
};
export const getNotes = (notes) => {
  return {
    type: GET_NOTES,
    payload: notes
  };
};
export const addTag = (tag) => (dispatch, getState) => {
  addTagToDB(tag);
};
export const getTags = (tags) => {
  return {
    type: GET_TAGS,
    payload: tags
  };
};

export const setLastIndex = (lastIndex) => {
  return {
    type: SET_LAST_INDEX,
    payload: lastIndex
  };
};
export const getNoteStructure = (noteStructure) => {
  return {
    type: GET_NOTE_STRUCTURE,
    payload: noteStructure
  };
};

const initialState = {
  notes: [],
  tags: [],
  noteStructure: {},
  lastIndex: 0
};

export const notes = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_NOTES':
      return {
        ...state,
        notes: action.payload
      };
    case 'GET_TAGS':
      return {
        ...state,
        tags: action.payload
      };
    case 'SET_LAST_INDEX':
      return {
        ...state,
        lastIndex: action.payload
      };
    case 'GET_NOTE_STRUCTURE':
      return {
        ...state,
        noteStructure: action.payload
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
