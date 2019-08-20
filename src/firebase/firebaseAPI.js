import { app } from "./firebaseConfig";
import "firebase/firestore";
import { store } from "../redux/storeConfig";
import { getNotes, getTags } from "../redux/notes";

const db = app.firestore();

db.collection("notes").onSnapshot(
  snapshot => {
    const notes = [];
    snapshot.forEach(el => {
      notes.push({ ...el.data(), id: el.id });
    });
    store.dispatch(getNotes(notes));
  },
  err => {
    console.log(err);
  }
);
db.collection("tags").onSnapshot(
  snapshot => {
    const tags = [];
    snapshot.forEach(el => {
      tags.push({ ...el.data(), id: el.id });
    });
    store.dispatch(getTags(tags));
  },
  err => {
    console.log(err);
  }
);

export const addNoteToDB = note => {
  return db
    .collection("notes")
    .add(note)
    .then(() => {
      console.warn("added note");
    })
    .catch(err => console.error(err));
};

export const deleteNote = id => {
  console.log("note deleted");
};

export const editNote = id => {
  console.log("note editet");
};

export const addTagToDB = tag => {
  db.collection("tags")
    .add(tag)
    .then(() => {
      console.warn("added tag");
    })
    .catch(err => console.error(err));
};
