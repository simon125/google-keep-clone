import React from 'react';
import { connect } from 'react-redux';
import Note from './Note';

const NotesListMobile = ({ notes }) => {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        marginTop: '20px'
      }}
    >
      {Object.values(notes).map((note, index) => (
        <Note key={note.uuid} task={note} index={index} />
      ))}
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    notes: state.notes.notes
  };
};

export default connect(mapStateToProps, {})(NotesListMobile);
