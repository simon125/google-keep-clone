import React, { useState } from "react";
import styled from "styled-components";

const TagWidgetContainer = styled.div`
  position: relative;
`;
const TagFormContainer = styled.div`
  position: absolute;
  top: 30px;
  left: -50px;
  z-index: 10;
  background: #fff;
  box-shadow: 0px 0px 2px 1px rgba(122, 122, 122, 0.5);
  width: 220px;
  min-height: 160px;
  padding: 8px 12px;
  border-radius: 3px;
`;
const Icon = styled.span``;
const Tool = styled.button`
  color: #666;
  border: none;
  background: transparent;
  outline: none;
  cursor: pointer;
  &:hover {
    color: #333;
  }
`;
const WidgetTitle = styled.p`
  font-size: 16px;
  color: #333;
`;
const TagInput = styled.input`
  margin: 15px 0;
  outline: none;
  width: 180px;
  border: none;
  color: #666;
  font-size: 14px;
  line-height: 1.2;
  letter-spacing: 0.4px;
`;

function TagWidget() {
  const [showWidget, toggleWidget] = useState(true);
  return (
    <TagWidgetContainer>
      <Tool onClick={() => toggleWidget(!showWidget)}>
        <Icon className="fas fa-tags" />
      </Tool>
      {showWidget && (
        <TagFormContainer>
          <WidgetTitle>Etykieta notatki</WidgetTitle>
          <form
            onSubmit={e => e.preventDefault()}
            style={{ display: "flex", alignItems: "center" }}
          >
            <TagInput placeholder="Wpisz nazwę etykiety" type="text" />
            <i
              style={{ fontSize: "13px", color: "#666", marginBottom: "2px" }}
              className="fas fa-search"
            />
          </form>
        </TagFormContainer>
      )}
    </TagWidgetContainer>
  );
}
export default TagWidget;
