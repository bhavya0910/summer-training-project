// select the elements
const clear = document.querySelector(".clear");
const dateElement = document.getElementById("date");
const list = document.getElementById("list");
const input = document.getElementById("input");
// Classes names
const CHECK = "fa-check-circle";
const UNCHECK = " fa-circle-thin";
const LINE_THROUGH = "lineThrough";
// variables
let LIST, id;
//get item from localstorage
let data = localStorage.getItem("TODO");
//check if data is not empty
if (data) {
    LIST = JSON.parse(data);
    id = LIST.length;// set the id to the last one in the list
    loadList(LIST);// load the list to the user interface
} else {
    // if data is empty
    LIST = [];
    id = 0;
}
// load items to the user's interface
function loadList(array) {
    array.forEach(function (item) {
        addToDo(item.name, item.id, item.done, item.trash);
    });
}
// clear the local storage
clear.addEventListener("click", function () {
    localStorage.clear();
    location.reload();
})
// Shows todays date
const options = { weekday: "long", month: "short", day: "numeric" };
const today = new Date();
dateElement.innerHTML = today.toLocaleDateString("en-US", options)
// add to do function
function addToDo(todo, id, done, trash) {
    if (trash) {
        return;
    }
    const DONE = done ? CHECK : UNCHECK;
    const LINE = done ? LINE_THROUGH : "";
    const item =
        `
        <li class="item">

            <i class="fa ${DONE} co" job="complete" id="${id}"></i>
            <p class="text ${LINE}">${todo}</p>
            <i class="fa fa-trash-o de" job="delete" id="${id}"> </i>

        </li>
        `
    const position = "beforeend";
    list.insertAdjacentHTML(position, item);

}
// to add the item to list user should press the enter key
document.addEventListener("keyup", function (event) {
    if (event.keyCode == 13) {
        const todo = input.value;
        //if the todo isnt empty
        if (todo) {
            addToDo(todo, id, false, false)
            LIST.push(
                {
                    name: todo,
                    id: id,
                    done: false,
                    trash: false,
                })
            //add item to local storage(this code must b written every where the list array is updated)

            localStorage.setItem("TODO", JSON.stringify(LIST));
            id++;
        }

        input.value = "";
    }
});
// complete to do
function completeTODO(element) {
    element.classList.toggle(CHECK);
    element.parentNode.querySelector(".text").classList.toggle(LINE_THROUGH);
    LIST[element.id].done = LIST[element.id].done ? false : true;
}
// remove to do
function removeToDo(element) {
    element.parentNode.parentNode.removeChild(element.parentNode)
    LIST[element.id].trash = true;
}
//target the items created dyanmically
list.addEventListener("click", function (event) {
    const element = event.target;// return the  html of clicked elements inside the list
    const elementJob = element.attributes.job.value;// returns the attribute job which is either complete or delete
    if (elementJob == "complete") {
        completeTODO(element);
    }
    else if (elementJob == "delete") {
        removeToDo(element);
    }
    //add item to local storage(this code must b written every where the list array is updated)
    localStorage.setItem("TODO", JSON.stringify(LIST));
});







