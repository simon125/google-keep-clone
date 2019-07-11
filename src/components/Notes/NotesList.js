import React from "react";
import { connect } from "react-redux";
import styled from "styled-components";

import Masonry from "react-masonry-component";
import RGL, { WidthProvider } from "react-grid-layout";
import ".../../../node_modules/react-grid-layout/css/styles.css";
import "../../../node_modules/react-resizable/css/styles.css";
const ReactGridLayout = WidthProvider(RGL);

export const NoteListContainer = styled.div`
  margin: 50px;
  max-width: 100vw;
`;

function NoteList({ notes }) {
  return (
    <NoteListContainer>
      <ReactGridLayout
        className="layout"
        cols={3}
        rowHeight={30}
        isResizable={false}
      >
        <div
          data-grid={{ x: 1, y: 0, w: 1, h: 6 }}
          style={{
            background: "#eee",
            margin: "5px",
            overflow: "hidden"
          }}
          key="b"
        >
          badfasfdasdfasfdasdfasdf asdfasdfasdfasfasdfasdfasdf
          asdfasdfasdfasfasdfasdfasdfasdf a dsf
          asdfasdfasdfasfasdfasdfasdfasdffadf a sf
          asdfasdfasdfasfasdfasdfasdfasdffasdf andasfd
        </div>
        <div
          data-grid={{ x: 1, y: 0, w: 1, h: 3 }}
          style={{ background: "#eee", margin: "5px" }}
          key="c"
        >
          adfadfdfasdf c
        </div>
        <div
          data-grid={{ x: 2, y: 0, w: 1, h: 4 }}
          style={{ background: "#eee", margin: "5px" }}
          key="a"
        >
          aadfadfsafd
        </div>
      </ReactGridLayout>

      {/* <Masonry
        className={"my-gallery-class"} // default ''
        elementType={"div"} // default 'div'
        options={{}} // default {}
        disableImagesLoaded={false} // default false
        updateOnEachImageLoad={false} // default false and works only if disableImagesLoaded is false
        imagesLoadedOptions={{}} // default {}
      > */}
      {/* <ReactGridLayout
        layout={this.state.layout}
        // onLayoutChange={this.onLayoutChange}
        {...this.props}
      > */}
      {/* {notes.map(note => {
          return (
            <div
              style={{
                width: "200px",
                margin: "5px",
                padding: "10px",
                backgroundColor: "#eee",
                overflow: "auto"
              }}
              data-grid={{ x: 4, y: 0, w: 1, h: 2 }}
              key={note.id}
            >
              {note.note}
            </div>
          );
        })} */}
      {/* </Masonry> */}
      {/* </ReactGridLayout> */}
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
