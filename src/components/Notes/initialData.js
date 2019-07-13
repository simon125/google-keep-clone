const initialData = {
  tasks: {
    "task-1": { id: "task-1", content: "Take out the garbage" },
    "task-2": {
      id: "task-2",
      content: "Watch my favourite film lorem ipsum dolor set ament test "
    },
    "task-3": { id: "task-3", content: "Charge my phone" },
    "task-4": { id: "task-4", content: "Cook dinner" },
    "task-5": { id: "task-5", content: "Take out the garbage" },
    "task-12": {
      id: "task-12",
      content: "Watch my favourite film lorem ipsum dolor set ament test "
    },
    "task-6": { id: "task-6", content: "Charge my phone" },
    "task-7": { id: "task-7", content: "Cook dinner" },
    "task-8": { id: "task-8", content: "Take out the garbage" },
    "task-9": {
      id: "task-9",
      content: "Watch my favourite film lorem ipsum dolor set ament test "
    },
    "task-10": { id: "task-10", content: "Charge my phone" },
    "task-11": { id: "task-11", content: "Cook dinner" }
  },
  columns: {
    "column-1": {
      id: "column-1",
      title: "To do",
      tasksIds: ["task-1", "task-2", "task-3", "task-4"]
    },
    "column-2": {
      id: "column-2",
      title: "progress",
      tasksIds: ["task-5", "task-6", "task-7", "task-8"]
    },
    "column-3": {
      id: "column-3",
      title: "done",
      tasksIds: ["task-11", "task-10", "task-9"]
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
