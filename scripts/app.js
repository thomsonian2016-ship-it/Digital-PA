import { tasks, getFilteredTaskList,deleteTask,addTask,toggleTaskCompletion } from "../data/taskList.js";

let currentFilter = "all";//   all/active/completed
renderTaskList(getFilteredTaskList(currentFilter,tasks));

function renderTaskList(filteredTasks){
    let taskHTML = '';
    filteredTasks.forEach(task => {
        taskHTML += `
        <div class="js-task">
        <p>Title: ${task.title}</p>
        <p>Estimated Time: ${task.estimatedTime}</p>
        <p>Energy Level: ${task.energyLevel}</p>
        <p>Complete ?:${task.completed}</p>
        <button class="dlt-btn" data-id="${task.id}">Delete</button>
        <button class="toggle-btn" data-id="${task.id}">${task.completed? "Make Active" : "complete" }</button>
        </div>
        `;
    });
    document.querySelector('.js-task-container').innerHTML= taskHTML;
}

document.querySelector('.add-btn').addEventListener('click',()=>{
    addTask({
        id: Date.now(),
        title: document.querySelector('.task-title').value.trim(),
        estimatedTime: Number(document.querySelector('.task-time').value), // minutes
        energyLevel: document.querySelector('.task-energy').value,
        completed: false
    },tasks);

    document.querySelector('.task-title').value = '';
    document.querySelector('.task-time').value = '';
    document.querySelector('.task-energy').value = 'med'; // default

    renderTaskList(getFilteredTaskList(currentFilter,tasks));
});

document.querySelector('.filter-btn').addEventListener('click',()=>{
    currentFilter = document.querySelector('.task-filter').value;
    renderTaskList(getFilteredTaskList(currentFilter,tasks));
})

document.querySelector('.js-task-container').addEventListener('click',(e)=>{
    if(e.target.classList.contains("dlt-btn")){
        let id = Number(e.target.dataset.id);
        deleteTask(id,tasks);
        renderTaskList(getFilteredTaskList(currentFilter,tasks));
    }
    if(e.target.classList.contains("toggle-btn")){
        let id = Number(e.target.dataset.id);
        toggleTaskCompletion(id);
        renderTaskList(getFilteredTaskList(currentFilter,tasks));
    }
})