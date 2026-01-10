export const tasks = JSON.parse(localStorage.getItem('tasks')) || [{
    id:1,
    title: "task1",
    estimatedTime:15, // minutes
    energyLevel: "med",
    completed: false
},{
    id:2,
    title: "task2",
    estimatedTime:20, // minutes
    energyLevel: "med",
    completed: true
}];

export function getFilteredTaskList(filter, array){
   if(filter==="active"){
    return array.filter((item)=>item.completed===false);
   }
   if(filter==="completed"){
    return array.filter((item)=>item.completed===true);
   }
   return array;
 }

 export function addTask(task,tasks){
    if(!findTask(task.id,tasks)){
        tasks.push(task);
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }
 }

 export function deleteTask(id,tasks){
    let index = tasks.indexOf(findTask(id,tasks));
    tasks.splice(index,1);
    localStorage.setItem('tasks', JSON.stringify(tasks));
 }

 function findTask(id,tasks){
    let matchingTask;
    tasks.forEach((task) => {
        if(task.id===id){
            matchingTask = task;
        }
    });
    return matchingTask;
 }