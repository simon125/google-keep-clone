import uuid from 'uuid';

// getListBasedOnLineTextBreak move to the file which is using this function
export const getListBasedOnLineTextBreak = (text) => {
  return text.split(/\r?\n/).reduce((newCheckList, nameOfListItem) => {
    const uid = uuid();
    return nameOfListItem.trim() === ''
      ? { ...newCheckList }
      : {
          ...newCheckList,
          [uid]: {
            listItem: nameOfListItem,
            uid
          }
        };
  }, {});
};
export const getSingleNoteBasedOnList = (list) => {
  return Object.values(list)
    .map((listItem) => listItem.listItem)
    .join('\r\n');
};
export const checkIfTargetIsForm = (target) => {
  if (!target) return false;
  const className = target.className;
  if (className && className.includes('note-form')) {
    return true;
  }
  return checkIfTargetIsForm(target.parentElement);
};
