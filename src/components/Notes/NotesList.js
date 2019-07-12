import React from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import initialData from "./initialData.js";

export const NoteListContainer = styled.div`
  margin: 50px;
  max-width: 100vw;
`;

function NoteList({ notes }) {
  const onDragEnd = result => {
    const { destination, source, draggableId } = result;

    if (!destination) {
      return;
    }
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const column = notes.columns[source.droppableId];
    const newNotesIds = Array.from(column.tasksIds);
    newNotesIds.splice(source.index, 1);
    newNotesIds.splice(destination.index, draggableId);

    const newColumn = {
      ...column,
      tasksIds: newNotesIds
    };
  };

  return (
    <NoteListContainer>
      <div
        style={{
          background: "#eee",
          margin: "5px",
          overflow: "hidden"
        }}
      >
        badfasfdasdfasfdasdfasdf asdfasdfasdfasfasdfasdfasdf
        asdfasdfasdfasfasdfasdfasdfasdf a dsf
        asdfasdfasdfasfasdfasdfasdfasdffadf a sf
        asdfasdfasdfasfasdfasdfasdfasdffasdf andasfd
      </div>
      <div style={{ background: "#eee", margin: "5px" }}>adfadfdfasdf c</div>
      <div style={{ background: "#eee", margin: "5px" }}>aadfadfsafd</div>
    </NoteListContainer>
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
