let input = document.getElementById("input")

let botao = document.getElementById("botao")

let rload = document.getElementById('rload')

let tasks_html = document.getElementById("tasks")

let container = document.getElementById("container")

let buttonEdit = document.getElementById("buttonEdit")

let tasks = []

let personal_tsk = []

let work_tsk = []

let tsk_array = localStorage.getItem('tasks')
let tsk_per = localStorage.getItem('tasks_personal')
let tsk_wor = localStorage.getItem('tasks_work')

let status_html = ''

let dark_m = document.getElementById("change")

let r = document.querySelector(":root")

let buttons = document.querySelectorAll(".filters-buttons")

let current_page = '1'


if (tsk_array === null){
    tasks = []
}
else{
tasks = JSON.parse(tsk_array)
}



if (tsk_per === null){
    personal_tsk = []
}
else{
personal_tsk = JSON.parse(tsk_per)
}



if (tsk_wor === null){
    work_tsk = []
}
else{
work_tsk = JSON.parse(tsk_wor)
}




console.log(tasks)

function addtask(type_str){
    if (input.value === ''){
        
        // alrt = document.getElementById("alert")
        // alrt.style.display = "flex"
        // alrt.style.opacity = "1"
        // setTimeout(function(){
        //     alrt.style.display='none'
        // }, 2000)
    }

    else{

        console.log(type_str)

    let temp_dict = {
        txt : input.value,
        status : "false"

    }

    if (type_str == "1"){
        tasks.push(temp_dict)
        let tsk_string = JSON.stringify(tasks)
        localStorage.setItem('tasks', tsk_string)
        Screen("1")
    }

    else if (type_str == "2"){
        personal_tsk.push(temp_dict)
        let tsk_string = JSON.stringify(personal_tsk)
        localStorage.setItem('tasks_personal', tsk_string)
        Screen("2")
    }

    else if(type_str == "3"){
        work_tsk.push(temp_dict)
        let tsk_string = JSON.stringify(work_tsk)
        localStorage.setItem('tasks_work', tsk_string)
        Screen("3")
    }

    input.value = ''

    }
}

function Screen(type="1"){

    current_page = type

    let checkbox = document.getElementById("completed-status").checked

    if (type == '1'){
        let tamanho = 0
        tasks.forEach(tarefa_check =>{
        if (checkbox == true ){
            tamanho = tasks.length
        }

        else if (checkbox == false && tarefa_check['status'] == "false")
            tamanho +=1
    })

       

        height_tsk = tamanho * 200
        container.style.height = 300+height_tsk+'px'
}

    else if (type == '2'){
        let tamanho = 0
        personal_tsk.forEach(tarefa_check =>{
        if (checkbox == true ){
            tamanho = personal_tsk.length
        }

        else if (checkbox == false && tarefa_check['status'] == "false")
            tamanho +=1
    })

       

        height_tsk = tamanho * 200
        container.style.height = 300+height_tsk+'px'
}

    else if (type == '3'){
        let tamanho = 0
        work_tsk.forEach(tarefa_check =>{
        if (checkbox == true ){
            tamanho = work_tsk.length
        }

        else if (checkbox == false && tarefa_check['status'] == "false")
            tamanho +=1
    })

       

        height_tsk = tamanho * 200
        container.style.height = 300+height_tsk+'px'
}

    let newArray = ''
    let numbers = -1

    let type_list = null

    if (type == '1'){
        type_list = tasks
        console.log(type_list)

    }

    else if (type == '2'){
        type_list = personal_tsk
    }

    else if (type == '3'){
        type_list = work_tsk
    }




    if (type_list.length <= 0){
        tasks_html.innerHTML = newArray

    }
    else{

    type_list.forEach( tarefa =>{

        if (tarefa['status'] == 'false'){
            status_html = 'black'
        }

        else{
            status_html = 'green'
        }

        if (tarefa['status'] == 'true' && checkbox == false){
            console.log(checkbox)
            numbers = numbers+1

        }
        else{



        numbers = numbers+1
        newArray = newArray + `
        <li style="background-color:${status_html}" id='${numbers}' class='lista'>
            <p>${tarefa['txt']}</p>
        </li>
        <div class='buttonEdit'>
            <button onclick="edit_tsk(${numbers})" id='edit'><i style="background-color: transparent;" class="fa-solid fa-pencil"></i></button>
            <button onclick="remove_tsk(${numbers}, ${type})" id='delete'><i style="background-color: transparent;" class="fa-solid fa-trash"></i></button>
            <button onclick="complete_tsk(${numbers}, ${type})" id='complete${numbers}' class="complete"><i style="background-color: transparent;" class="fa-solid fa-check"></i></button>
        </div>
        `
        }
        tasks_html.innerHTML = newArray

    })}
}


function complete_tsk(number, list){

    let tskID = document.getElementById(number)
    tskID.style.transition = '1.5s'
    tskID.style.backgroundColor = 'green'

    if ( list == '1'){
        tasks[number]['status'] = 'true'
        let tsk_string = JSON.stringify(tasks)
        localStorage.setItem('tasks', tsk_string)

    }

    if ( list == '2'){
        personal_tsk[number]['status'] = 'true'
        let tsk_string = JSON.stringify(personal_tsk)
        localStorage.setItem('tasks_personal', tsk_string)

    }

    if ( list == '3'){
        work_tsk[number]['status'] = 'true'
        let tsk_string = JSON.stringify(work_tsk)
        localStorage.setItem('tasks_work', tsk_string)

    }






}

function edit_tsk(number, list){

    let edit_txt = prompt('Digite o novo texto')

    if ( list == '1'){

    tasks[number]['txt'] = edit_txt
    let tsk_string = JSON.stringify(tasks)
    localStorage.setItem('tasks', tsk_string)
    }
    if ( list == '2'){

        personal_tsk[number]['txt'] = edit_txt
        let tsk_string = JSON.stringify(personal_tsk)
        localStorage.setItem('tasks_personal', tsk_string)
    }

    if ( list == '3'){

        work_tsk[number]['txt'] = edit_txt
        let tsk_string = JSON.stringify(work_tsk)
        localStorage.setItem('tasks_work', tsk_string)
    }



    let tskID = document.getElementById(number)
    tskID.innerHTML = edit_txt
}

function remove_tsk(number, list){
    if ( list == "1"){
        tasks.splice(number,1)
        console.log(tasks)
        let tsk_string = JSON.stringify(tasks)
        localStorage.setItem('tasks', tsk_string)
        Screen("1")

    }

    else if ( list == "2"){
        personal_tsk.splice(number,1)
        console.log(personal_tsk)
        let tsk_string = JSON.stringify(personal_tsk)
        localStorage.setItem('tasks_personal', tsk_string)
        Screen("2")
    
        let containerH =style.height.replace(/[a-z]/gi, '')
    
        containerH = parseInt(containerH)
    
        container.style.height = containerH-200+'px'
    }

    else if ( list == "3"){
        work_tsk.splice(number,1)
        console.log(work_tsk)
        let tsk_string = JSON.stringify(work_tsk)
        localStorage.setItem('tasks_work', tsk_string)
        Screen("3")
    
        let containerH =style.height.replace(/[a-z]/gi, '')
    
        containerH = parseInt(containerH)
    
        container.style.height = containerH-200+'px'
    }

}

input.addEventListener("keyup", function(e) {
    console.log(e)
    if (e.key === 'Enter') {
        addtask('1')
    }
    })



function change_color(){
    var r_current = getComputedStyle(r)

    if (r_current.getPropertyValue("--text-color") == "black"){
    r.style.setProperty("--text-color","white")
    r.style.setProperty("--bg-tsk", "black")
    }

    else{
    r.style.setProperty("--text-color","black")
    r.style.setProperty("--bg-tsk", "aliceblue")
    }

}

let personal = document.getElementById("personal")

let work = document.getElementById("work")

let filter_n = document.getElementById("filter_n")

let filter_p = document.getElementById("filter_p")

let filter_w = document.getElementById("filter_w")

botao.addEventListener("click", function(){
    addtask("1")
    buttons.forEach( button => {
        button.classList.remove('selected')})

    buttons[0].classList.add('selected');
})

personal.addEventListener("click", function(){
    addtask("2")
    buttons.forEach( button => {
        button.classList.remove('selected')})

    buttons[1].classList.add('selected');
})

work.addEventListener("click", function(){
    addtask("3")
    buttons.forEach( button => {
        button.classList.remove('selected')})

    buttons[2].classList.add('selected');
})


filter_n.addEventListener("click", function(){
    Screen("1")})

filter_p.addEventListener("click", function(){
    Screen("2")

})

filter_w.addEventListener("click", function(){
    Screen("3")

})


buttons.forEach( button => {
    button.addEventListener('click',() => {
        buttons.forEach( button => {
            button.classList.remove('selected')})

        button.classList.add('selected')});
})

dark_m.addEventListener("click", change_color)

let checkbox_1 = document.getElementById("completed-status")
checkbox_1.addEventListener("click", function(){
    Screen(current_page)
})

Screen()