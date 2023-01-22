//DOM:
// const button= document.querySelector('.button');
// button.addEventListener('click', (event) => {
//     console.log(event);
//     console.log('clicked');
// })

// // Store data in local storage
// localStorage.setItem("name", "John Smith");
// localStorage.setItem("age", "30");

// // Retrieve data from local storage
// var personName = localStorage.getItem("name");
// var personAge = localStorage.getItem("age");

// localStorage.removeItem("name");
// const personName2= localStorage.getItem("name");
// localStorage.clear();
// console.log(personName); // "John Smith"
// console.log(personAge); // "30"
// console.log(personName2)


//Local Storage
const taskAdder = document.querySelector('.taskAdder');
const myTasks = document.querySelector('.myTasks');
// or || ou
const tasks = JSON.parse(localStorage.getItem('taskList')) || [];

taskAdder.addEventListener('submit', addTask);
myTasks.addEventListener('click', toggleDone);
outputTasks();


function addTask(e){
    e.preventDefault();
    const textTask = this.querySelector('[name=task]').value;
    const task = {
        textTask,done:false
    }
//    console.log(textTask);
    tasks.push(task);
    saveStorage();
    outputTasks();
//    console.log(tasks);
    this.reset();
}

function saveStorage(){
    // espera dois parametros, nome e valor
    localStorage.setItem('taskList',JSON.stringify(tasks));
}

function outputTasks() {
    let html = tasks.map(function(data,i) {
        let myClass = data.done ? 'done' : '';
        return '<li data-index='+i+'><div class="'+myClass+'">'+
            data.textTask+'<span class="remove">  X</span></div></li>';
    })
//    html = html.join('');
//    console.log(html);
    myTasks.innerHTML = html.join('');
}

function toggleDone(e) {
    //console.log(e);
    // mudar o dom - para nao realizar reload sempre do dom todo
    const myEl = e.target;
    const mySel = myEl.parentElement;
    if(myEl.className === 'remove') {
        let index = mySel.parentElement.dataset.index;
        let temp = tasks.splice(index,1);
        console.log(temp);
    } else {
    //    console.log(e);
    //    console.log(tasks[mySel]);
        myEl.classList.toggle('done');
    //    console.log(myEl);
        tasks[mySel.dataset.index].done = !tasks[mySel.dataset.index].done;
    }
//    console.log(tasks);
    // reload to propagate
    // recarregar para propagar as mudanças
    //outputTasks();
    saveStorage();
    outputTasks();
}