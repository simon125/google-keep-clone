import React, { useEffect, useState } from 'react';
import ReactDom from 'react-dom';
import { connect } from 'react-redux';
import styled from 'styled-components';
import NoteForm from '../NoteForm/NoteForm';

const Overlay = styled.div`
  position: fixed;
  z-index: 10;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(155, 155, 155, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  visibility: ${(props) => (props.hiddenProp ? 'hidden' : 'visible')};
  opacity: ${(props) => (props.hiddenProp ? '0' : '1')};
`;

const Modal = styled.div`
  transform: ${(props) => (props.editModeOn ? 'scale(1)' : 'scale(0.4)')};
  transition: all 0.1s;
`;

const modalRoot = document.getElementById('modal-root');

const EditNoteModal = ({ editedNote }) => {
  const [temp, setTemp] = useState(false);
  const [temp1, setTemp1] = useState(false);

  useEffect(() => {
    if (editedNote.hasOwnProperty('title')) {
      setTemp1(true);
      setTimeout(() => setTemp(true), 0);
    } else {
      setTemp(false);
      setTimeout(() => setTemp1(false), 100);
    }
  }, [editedNote]);

  return ReactDom.createPortal(
    <Overlay hiddenProp={!temp1}>
      <Modal editModeOn={temp}>{temp1 && <NoteForm editMode={true} />}</Modal>
    </Overlay>,
    modalRoot
  );
};

EditNoteModal.propTypes = {};

const mapStateToProps = (state) => {
  return {
    editedNote: state.notes.editedNote
  };
};

export default connect(mapStateToProps, {})(EditNoteModal);
