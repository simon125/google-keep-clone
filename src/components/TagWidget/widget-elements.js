import styled from "styled-components";
export const TagWidgetContainer = styled.div`
  position: relative;
`;
export const TagFormContainer = styled.div`
  position: absolute;
  top: 30px;
  left: -50px;
  z-index: 10;
  background: #fff;
  box-shadow: 0px 0px 2px 1px rgba(122, 122, 122, 0.5);
  width: fit-content;
  min-height: 160px;
  max-height: 260px;
  overflow: hidden;
  padding: 8px 0px 0px 0px;
  border-radius: 3px;
`;
export const Icon = styled.span`
  margin-right: 13px;
`;
export const Tool = styled.button`
  color: #666;
  border: none;
  background: transparent;
  outline: none;
  cursor: pointer;
  &:hover {
    color: #333;
  }
`;
export const WidgetTitle = styled.p`
  margin: 0 13px;
  font-size: 16px;
  color: #333;
`;
export const TagInput = styled.input`
  margin: 15px 13px;
  outline: none;
  width: 180px;
  border: none;
  color: #666;
  font-size: 14px;
  line-height: 1.2;
  letter-spacing: 0.4px;
`;

export const AddTagBtn = styled.button`
  width: 100%;
  background: #fff;
  font-size: 14px;
  color: #666;
  background: #fff;
  border: none;
  outline: none;
  border-top: 1px solid rgba(220, 220, 220, 1);
  position: sticky;
  bottom: 0;
  left: 0;
  text-align: left;
  padding: 5px 13px;
  cursor: pointer;
  &:hover {
    background: rgb(247, 247, 247);
  }
`;
export const TagList = styled.ul`
  padding: 10px 0;
  overflow-y: scroll;
  height: 150px;
  list-style: none;
`;

export const Tag = styled.li`
  width: 100%;
  display: flex;
  align-items: center;
  padding: 3px 13px;
  &:hover {
    background: rgb(247, 247, 247);
  }
`;
export const Checkbox = styled.input`
  background: transparent;
`;
export const Label = styled.label`
  margin-left: 7px;
  color: #666;
`;
