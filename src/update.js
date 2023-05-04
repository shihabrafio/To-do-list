let tasks = [];
if (localStorage.tasks) {
  tasks = JSON.parse(localStorage.tasks);
}
const updateIndexes = () => {
  for (let i = 0; i < tasks.length; i += 1) {
    tasks[i].index = i;
  }
};

export default updateIndexes;