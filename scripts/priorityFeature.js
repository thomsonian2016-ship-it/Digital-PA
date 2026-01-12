export function getWhatToDoNow(tasks){
    let score = 0;
    let recommendedTask ;
    tasks.forEach(task => {
        if(getTaskScore(task)>score){
            recommendedTask = task;
            score=getTaskScore(task);
        }
    });
    return recommendedTask;
}

//morning priority of energy- high>med>low
//afternoon- low>med>high
//evening- high>med>low
//night - low>med>high
//short task always > long task

function getDayTime(){
    const hour = new Date().getHours(); // 0–23
    let timeOfDay;

    if (hour >= 5 && hour < 12) {
    timeOfDay = "M"; // Morning
    } else if (hour >= 12 && hour < 16) {
    timeOfDay = "A"; //Afternoon
    } else if (hour >= 16 && hour < 20) {
    timeOfDay = "E"; //Evening
    } else {
    timeOfDay = "N"; //Night
    }

    return timeOfDay;
}

function getTaskScore(task){

    let scoreMap = {
        M : {
                High : 4,
                Medium : 2,
                Low : 0,
                Short : 1,
                Long : 0
            },
        A : {
                High : 0,
                Medium : 2,
                Low :4,
                Short : 1,
                Long : 0
            },
        E : {
                High : 4,
                Medium : 2,
                Low : 0,
                Short : 1,
                Long : 0
            },
        N : {
                High : 0,
                Medium : 2,
                Low :4,
                Short : 1,
                Long : 0
            }
    };
    let time = getDayTime();
    let scoreTime = scoreMap[time];
    let taskDuration = task.estimatedTime <=15 ? "Short" : "Long" ;
    return scoreTime[taskDuration] + scoreTime[task.energyLevel];
}