import uuid from "uuid";

export const getListBasedOnLineTextBreak = text => {
  return text.split(/\r?\n/).reduce((newCheckList, nameOfListItem) => {
    const uid = uuid();
    return nameOfListItem.trim() === ""
      ? { ...newCheckList }
      : {
          ...newCheckList,
          [uid]: {
            listItemName: nameOfListItem,
            uid
          }
        };
  }, {});
};
export const getSingleNoteBasedOnList = list => {
  return Object.values(list)
    .map(listItem => listItem.listItemName)
    .join("\r\n");
};
export const checkIfTargetIsForm = target => {
  if (!target) return false;
  const className = target.className;
  if (className && className.includes("note-form")) {
    return true;
  }
  return checkIfTargetIsForm(target.parentElement);
};
