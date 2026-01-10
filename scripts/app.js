import { tasks, getFilteredTaskList,deleteTask,addTask } from "../data/taskList.js";

let currentFilter = "completed";//   all/active/completed

function renderTaskList(){
    let taskHTML = '';
    tasks.forEach(task => {
        taskHTML += `
        <div>
        <p>Title: ${task.title}</p>
        <p>Estimated Time: ${task.estimatedTime}</p>
        <p>Energy Level: ${task.energyLevel}</p>
        <p>Complete ?:${task.completed}</p>
        <button>Delete</button>
        </div>
        `;
    });
    document.querySelector('.js-task-container').innerHTML= taskHTML;
}
