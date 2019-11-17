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

const db = app.firestore();

db.collection('test1').onSnapshot(
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

db.collection('tags').onSnapshot(
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

db.collection('structure')
  .doc('notes')
  .onSnapshot(
    (doc) => {
      // console.log('Current data: ', );
      // const tags = [];
      // snapshot.forEach((el) => {
      //   tags.push({ ...el.data(), id: el.id });
      // });

      // snapshot
      store.dispatch(getNoteStructure(doc.data()));
    },
    (err) => {
      console.log(err);
    }
  );

export const updateNote = (fields, id) => {
  debugger;
  db.collection('test1')
    .doc(id)
    .update(fields)
    .then(function() {
      debugger;
      console.log('Document successfully updated!');
    })
    .catch(function(error) {
      debugger;
      console.error('Error updating document: ', error);
    });
};

// export const updateNote = (checkList, id) => {
//   db.collection('test1')
//     .doc(id)
//     .update({
//       checkList
//     })
//     .then(function() {
//       console.log('Document successfully updated!');
//     })
//     .catch(function(error) {
//       // The document probably doesn't exist.
//       console.error('Error updating document: ', error);
//     });
// };

export const getStructureFromDB = () => {
  return db
    .collection('structure')
    .doc('notes')
    .get()
    .then(
      function(doc) {
        store.dispatch(getNoteStructure(doc.data()));
      },
      function(error) {
        //...
      }
    );
};

export const pushUidToStructure = (uuid) => {
  return db
    .collection('structure')
    .doc('notes')
    .set(
      {
        'column-1': {
          id: 'column-1',
          tasksIds: firebase.firestore.FieldValue.arrayUnion(uuid)
        }
      },
      { merge: true }
    );
};

export const removeUidFromStructure = (uuid, column) => {
  return db
    .collection('structure')
    .doc('notes')
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

export const updateStructure = (newStructure) =>
  db
    .collection('structure')
    .doc('notes')
    .update(newStructure)
    .then(function() {
      console.log('Document successfully updated!');
    })
    .catch(function(error) {
      console.error('Error updating document: ', error);
    });

export const getNotesDB = () => db.collection('test1').get();

export const updatePositionOnNoteList = (id, column, row) =>
  db
    .collection('test1')
    .doc(id)
    .update({
      column,
      row
    })
    .then(function() {
      console.log('Document successfully updated!');
    })
    .catch(function(error) {
      console.error('Error updating document: ', error);
    });

export const addNoteToDB = (note) => {
  return db
    .collection('test1')
    .add(note)
    .then(() => {
      pushUidToStructure(note.uuid);
    })
    .catch((err) => console.error(err));
};
export const removeNoteFromDB = (note, column) => {
  return db
    .collection('test1')
    .doc(note.id)
    .delete()
    .then(() => removeUidFromStructure(note.uuid, column))
    .catch((err) => console.error(err));
};

export const deleteNote = (id) => {};

export const editNote = (id) => {
  console.log('note editet');
};

export const addTagToDB = (tag) => {
  db.collection('tags')
    .add(tag)
    .then(() => {
      console.warn('added tag');
    })
    .catch((err) => console.error(err));
};
