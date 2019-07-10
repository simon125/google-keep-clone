import React from "react";
import { connect } from "react-redux";
function NoteList({ notes }) {
  return (
    <div>
      {notes.map(note => {
        return <div key={note.id}>{note.note}</div>;
      })}
    </div>
  );
}

const mapStateToProps = state => {
  return {
    notes: state.notes.notes
  };
};

export default connect(
  mapStateToProps,
  {}
)(NoteList);
