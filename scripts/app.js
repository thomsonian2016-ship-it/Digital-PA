import { tasks, getFilteredTaskList,deleteTask,addTask,toggleTaskCompletion } from "../data/taskList.js";
import { getWhatToDoNow } from "./priorityFeature.js";

let currentFilter = "all";//   all/active/completed
renderTaskList(getFilteredTaskList(currentFilter,tasks),'.js-task-container');

function renderTaskList(filteredTasks, className){
    let taskHTML = '';
    filteredTasks.forEach(task => {
        taskHTML += `
        <div class="js-task">
        <p class="render-title">${task.title}</p>
        <p class="render-time">⏱ ${task.estimatedTime} min.</p>
        <p class="render-energy">Energy : ${task.energyLevel}</p>
        <button class="toggle-btn" data-id="${task.id}">${task.completed? "Make Active" : "Complete" }</button>
        <button class="dlt-btn" data-id="${task.id}">Delete</button>  
        </div>
        `;
    });
    document.querySelector(className).innerHTML= taskHTML;
}

document.querySelector('.add-btn').addEventListener('click',()=>{
    if(!document.querySelector('.task-title').value.trim() || Number(document.querySelector('.task-time').value)<=0){ // validation
        alert('Enter valid Title and Time');
        return;
    }
    addTask({
        id: Date.now(),
        title: document.querySelector('.task-title').value.trim(),
        estimatedTime: Number(document.querySelector('.task-time').value), // minutes
        energyLevel: document.querySelector('.task-energy').value,
        completed: false
    },tasks);

    document.querySelector('.task-title').value = '';
    document.querySelector('.task-time').value = '';
    document.querySelector('.task-energy').value = 'Medium'; // default

    renderTaskList(getFilteredTaskList(currentFilter,tasks),'.js-task-container');
});

document.querySelector('.filter-btn').addEventListener('click',()=>{
    currentFilter = document.querySelector('.task-filter').value;
    renderTaskList(getFilteredTaskList(currentFilter,tasks),'.js-task-container');
})

document.querySelector('.priorty-btn').addEventListener('click',()=>{
    let activeTasks = getFilteredTaskList("active",tasks);
    if(activeTasks.length ===0){
        alert('No active task !');
        return;
    }
    renderTaskList([getWhatToDoNow(activeTasks)],'.wtdn-content');
})

document.querySelector('.js-task-container').addEventListener('click',(e)=>{
    if(e.target.classList.contains("dlt-btn")){
        let id = Number(e.target.dataset.id);
        deleteTask(id,tasks);
        renderTaskList(getFilteredTaskList(currentFilter,tasks),'.js-task-container');
    }
    if(e.target.classList.contains("toggle-btn")){
        let id = Number(e.target.dataset.id);
        toggleTaskCompletion(id);
        renderTaskList(getFilteredTaskList(currentFilter,tasks),'.js-task-container');
    }
})
