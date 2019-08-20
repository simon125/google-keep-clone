const initialData = {
  tasks: {
    "task-1": { id: "task-1", content: "Take out the garbage" }
  },
  columns: {
    "column-1": {
      id: "column-1",
      title: "To do",
      tasksIds: []
    },
    "column-2": {
      id: "column-2",
      title: "progress",
      tasksIds: []
    },
    "column-3": {
      id: "column-3",
      title: "done",
      tasksIds: []
    },
    "column-4": {
      id: "column-4",
      title: "done",
      tasksIds: ["task-12"]
    },
    "column-5": {
      id: "column-5",
      title: "done",
      tasksIds: []
    }
  },
  columnOrder: ["column-1", "column-2", "column-3", "column-4", "column-5"]
};

export default initialData;
