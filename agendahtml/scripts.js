let input = document.getElementById("input")

let botao = document.getElementById("botao")

let rload = document.getElementById('rload')

let tasks_html = document.getElementById("tasks")

let container = document.getElementById("container")

let tasks = []

let tsk_array = localStorage.getItem('tasks')

let status_html = ''

if (tsk_array === null){
    tasks = []
}
else{
tasks = JSON.parse(tsk_array)
}

console.log(tasks)

function addtask(){
    if (input.value === ''){

    }

    else{

    let temp_dict = {
        txt : input.value,
        status : "false"

    }


    tasks.push(temp_dict)

    input.value = ''

    let tsk_string = JSON.stringify(tasks)
    localStorage.setItem('tasks', tsk_string)
    Screen()
    let complete = document.getElementById("")
    }
}

function Screen(){

    style = getComputedStyle(container)
    let containerH =style.height.replace(/[a-z]/gi, '')

    containerH = parseInt(containerH)

    height_tsk = tasks.length * 200
    console.log(tasks.length)

    if (300+height_tsk <= containerH){ 
    }

    else{

    container.style.height = 300+height_tsk+'px'

    }

    let newArray = ''
    let numbers = -1

    if (tasks.length <= 0){
        tasks_html.innerHTML = newArray

    }
    else{
    tasks.forEach( tarefa =>{

        if (tarefa['status'] == 'false'){
            status_html = 'black'
        }

        else{
            status_html = 'green'
        }



        numbers = numbers+1
        newArray = newArray + `
        <li style="background-color:${status_html}" id='${numbers}' class='lista'>
            <p>${tarefa['txt']}</p>
        </li>
        <div class='buttonEdit'>
            <button onclick="edit_tsk(${numbers})" id='edit'>Edit</button>
            <button onclick="remove_tsk(${numbers})" id='delete'>Delete</button>
            <button onclick="complete_tsk(${numbers})" id='complete${numbers}' class="complete">Complete</button>
        </div>
        `

        tasks_html.innerHTML = newArray

    })}
}


function complete_tsk(number){
    console.log(number)

    let tskID = document.getElementById(number)
    tskID.style.transition = '1.5s'
    tskID.style.backgroundColor = 'green'
    tasks[number]['status'] = 'true'

    console.log(tasks)

    let tsk_string = JSON.stringify(tasks)
    localStorage.setItem('tasks', tsk_string)



}

function edit_tsk(number){
    console.log(number)
    let edit_txt = prompt('Digite o novo texto')
    tasks[number] = edit_txt

    let tsk_string = JSON.stringify(tasks)
    localStorage.setItem('tasks', tsk_string)

    let tskID = document.getElementById(number)
    tskID.innerHTML = edit_txt
}

function remove_tsk(number){
    tasks.splice(number,1)
    console.log(tasks)
    let tsk_string = JSON.stringify(tasks)
    localStorage.setItem('tasks', tsk_string)
    Screen()

    let containerH =style.height.replace(/[a-z]/gi, '')

    containerH = parseInt(containerH)

    container.style.height = containerH-200+'px'
}

botao.addEventListener("click", addtask)

Screen()
