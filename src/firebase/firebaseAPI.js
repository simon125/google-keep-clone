import { app } from './firebaseConfig';
import 'firebase/firestore';
import { store } from '../redux/storeConfig';
import {
  getNotes,
  getTags,
  getNoteStructure
  // updateStructureLocally
} from '../redux/notes';
import * as firebase from 'firebase/app';
import { auth } from './firebaseAuth';

const db = app.firestore();
// const user = firebase.auth().currentUser;
// if (auth.currentUser) {
export const getNotesFromDB = (currentUserId) => {
  return db
    .collection('notes')
    .where('authorId', '==', currentUserId)
    .onSnapshot(
      (snapshot) => {
        const notes = {};
        snapshot.forEach((el) => {
          notes[el.id] = { ...el.data(), id: el.id };
        });
        store.dispatch(getNotes(notes));
      },
      (err) => {
        console.log(err);
      }
    );
};
export const getTagsFromDB = (currentUserId) => {
  return db
    .collection('tags')
    .where('authorId', '==', currentUserId)
    .onSnapshot(
      (snapshot) => {
        const tags = [];
        snapshot.forEach((el) => {
          tags.push({ ...el.data(), id: el.id });
        });
        store.dispatch(getTags(tags));
      },
      (err) => {
        console.log(err);
      }
    );
};
export const getStructureFromDBv2 = (currentUserId) => {
  return db
    .collection('structure')
    .where('authorId', '==', currentUserId)
    .onSnapshot(
      (doc) => {
        let structure;
        doc.forEach((el) => {
          structure = { ...el.data(), structureId: el.id };
        });
        if (!structure) {
          structure = {
            authorId: currentUserId,
            'column-1': {
              id: 'column-1',
              tasksIds: []
            },
            'column-2': {
              id: 'column-2',
              tasksIds: []
            },
            'column-3': {
              id: 'column-3',
              tasksIds: []
            },
            'column-4': {
              id: 'column-4',
              tasksIds: []
            },
            'column-5': {
              id: 'column-5',
              tasksIds: []
            },
            'column-6': {
              id: 'column-6',
              tasksIds: []
            },
            'column-7': {
              id: 'column-7',
              tasksIds: []
            },
            'column-8': {
              id: 'column-8',
              tasksIds: []
            }
          };

          db.collection('structure')
            .add(structure)
            .then((docRef) => {
              store.dispatch(
                getNoteStructure({ ...structure, structureId: docRef.id })
              );
            });
        } else {
          store.dispatch(getNoteStructure(structure));
        }
      },
      (err) => {
        console.log(err);
      }
    );
};
// }

export const updateNote = async (fields, id) => {
  return db
    .collection('notes')
    .doc(id)
    .update(fields)
    .then(function() {
      // console.log('Document successfully updated!');
    })
    .catch(function(error) {
      console.error('Error updating document: ', error);
    });
};

export const getStructureFromDB = (currentUserId) => {
  return db
    .collection('structure')
    .where('authorId', '==', currentUserId)
    .get()
    .then(
      function(doc) {
        let structure;
        doc.forEach((el) => {
          structure = { ...el.data(), structureId: el.id };
        });
        store.dispatch(getNoteStructure(structure));
      },
      function(error) {
        //...
      }
    );
};

export const pushUidToStructure = (uuid, col) => {
  const structureId = store.getState().notes.noteStructure.structureId;

  return db
    .collection('structure')
    .doc(structureId)
    .set(
      {
        [`column-${col}`]: {
          id: `column-${col}`,
          tasksIds: firebase.firestore.FieldValue.arrayUnion(uuid)
        }
      },
      { merge: true }
    );
};

export const removeUidFromStructure = (uuid, column) => {
  const structureId = store.getState().notes.noteStructure.structureId;

  return db
    .collection('structure')
    .doc(structureId)
    .set(
      {
        [column]: {
          id: column,
          tasksIds: firebase.firestore.FieldValue.arrayRemove(uuid)
        }
      },
      { merge: true }
    );
};

export const updateStructure = (newStructure) => {
  const structureId = store.getState().notes.noteStructure.structureId;

  db.collection('structure')
    .doc(structureId)
    .update(newStructure)
    .then(function() {
      // console.log('Document successfully updated!');
    })
    .catch(function(error) {
      console.error('Error updating document: ', error);
    });
};

export const getNotesDB = () => db.collection('test1').get();

export const updatePositionOnNoteList = (id, column, row) =>
  db
    .collection('notes')
    .doc(id)
    .update({
      column,
      row
    })
    .then(function() {
      // console.log('Document successfully updated!');
    })
    .catch(function(error) {
      console.error('Error updating document: ', error);
    });

export const addNoteToDB = (note) => {
  return db
    .collection('notes')
    .add({ ...note, authorId: auth.currentUser.uid })
    .then(() => {
      pushUidToStructure(note.uuid, note.column);
    })
    .catch((err) => console.error(err));
};
export const removeNoteFromDB = (note, column) => {
  return db
    .collection('notes')
    .doc(note.id)
    .delete()
    .then(() => removeUidFromStructure(note.uuid, column))
    .catch((err) => console.error(err));
};

export const addTagToDB = (tag) => {
  db.collection('tags')
    .add({ ...tag, authorId: auth.currentUser.uid })
    .then(() => {
      // console.warn('added tag');
    })
    .catch((err) => console.error(err));
};
