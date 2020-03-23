const todos = document.getElementById("todos")

const check = "fa-check-circle"
const uncheck = "fa-circle-thin"
const linethrough = "lineThrough"

function noContentAdd() {
    document.getElementById("todos").innerHTML = "<div class='no-content'><p>Let's do something today</p></div>"
    document.querySelector(".content").classList.toggle("flex")
}
function noContentDelete() {
    document.querySelector(".no-content").remove()
    document.querySelector(".content").classList.toggle("flex")
}
//function adds toDo
function addToDo(toDo, id, done, trash) {

    if (trash) { return }

    const checkDone = done ? check : uncheck
    const line = done ? linethrough : ""
    const text = `<li class="item">
                     <i class="co fa ${checkDone}" job="complete" id="${id}"></i>
                     <p class="text ${line}" job="complete">${toDo}</p>
                     <i class="de fa fa-trash-o" job="delete" id="${id}"></i>
                 </li>`

    todos.insertAdjacentHTML("afterbegin", text)
}



//when the user click on a button, to delete or make done
todos.addEventListener('click', function (e) {
    let element = e.target
    const elementJob = e.target.attributes.job.value
    if (elementJob == "complete") {
        completeToDo(element)
    } if (elementJob == "delete") {
        removeToDo(element)
    }

    if (document.querySelector(".no-content")) {
        noContentDelete()
    }
    if (data.length == 0) {
        noContentAdd()
    }

    console.log(element.id)
    //update local storage
    localStorage.setItem("TODO", JSON.stringify(data))
})

//when task is complete -> change styles
function completeToDo(element) {
    if (data[element.id].done == false) {
        var audio = new Audio('done.wav');
        audio.volume = 0.4;
        audio.play();
    }
    console.log(data)
    element.classList.toggle(check)
    element.classList.toggle(uncheck)
    element.parentNode.querySelector(".text").classList.toggle(linethrough)
    data[element.id].done = data[element.id].done ? false : true
    console.log(data)
}

//remove toDo
function removeToDo(element) {
    element.parentNode.parentNode.removeChild(element.parentNode)
    element.id.trash = true
    id--
    // element.splice(element.id, 1)
    data = data.filter(function (data) { return data.id != element.id; });
    console.log(data)
}


let data, id


let localData = localStorage.getItem("TODO")

if (localData) {

    data = JSON.parse(localData)
    loadToDo(data)
    id = data.length
} else {
    data = []
    id = 0
}

console.log(data)

//no-content activate
if (data.length == 0) {
    noContentAdd()
}

function loadToDo(array) {
    array.forEach(function (item) {
        addToDo(item.name, item.id, item.done, item.trash)
    })
}

//adding task
const input = document.getElementById('input')
function submitToDo() {
    const toDo = input.value

    if (toDo) {

        addToDo(toDo, id, false, false)
        data.push(
            {
                name: toDo,
                id: id,
                done: false,
                trash: false
            }
        )
        if (document.querySelector(".no-content")) {
            noContentDelete()
        }
        input.value = ""
        id++
        localStorage.setItem("TODO", JSON.stringify(data))
    }

}


document.addEventListener('keydown', function (event) {
    if (event.keyCode == 13) {
        submitToDo()
    }

})

document.getElementById("submitButton").addEventListener('click', function (e) {

    submitToDo()

})
//adding task END

//show the date
// var dt = new Date();
// document.getElementById("date").innerHTML = dt.toLocaleDateString();
const dateElement = document.getElementById("date")

let options = { weekday: 'long', month: 'short', day: 'numeric' }

let today = new Date()
dateElement.innerHTML = today.toLocaleDateString("en-US", options)

//clear local storage
const clear = document.querySelector(".clear")

clear.addEventListener("click", function () {
    localStorage.clear()
    location.reload()
})

//Swipe
// Swiped.init({
//     query: '.item',
//     right: 400,
//     onOpen: function() {
//         this.destroy(true)
//     }
// });

//Change background image depends on day
var day = new Date()
day = 2
let root = document.documentElement
var header = document.querySelector('.header')
header.style.setProperty('--image-url', "url('img/background-image-" + day + ".png')")

// document.querySelector('.header').addEventListener('mousedown', function (e) {
//     root.addEventListener('mousemove', function (e) {
//         root.style.setProperty('--mouse-x', e.clientX + "px");
//         root.style.setProperty('--mouse-y', e.clientY + "px");
//     })

// })

// var mousedownID = -1;  //Global ID of mouse down interval
// function mousedown(event) {
//     if (mousedownID == -1)  //Prevent multimple loops!
//         mousedownID = setInterval(whilemousedown, 100 /*execute every 100ms*/);



// }
// function mouseup(event) {
//     if (mousedownID != -1) {  //Only stop if exists
//         clearInterval(mousedownID);
//         mousedownID = -1;
//     }

// }
// document.querySelector('.header').addEventListener('mousedown', function (e) {
// function whilemousedown() {
    
//     root.addEventListener('mousemove', function (e) {
//         root.style.setProperty('--mouse-x', e.clientX + "px");
//         root.style.setProperty('--mouse-y', e.clientY + "px");
//     })
// }
// })

// //Assign events
// document.addEventListener("mousedown", mousedown);
// document.addEventListener("mouseup", mouseup);
// //Also clear the interval when user leaves the window with mouse
// document.addEventListener("mouseout", mouseup);


var lFollowX = 0,
    lFollowY = 0,
    x = 0,
    y = 0,
    friction = 1 / 60;

function moveBackground() {
  x += (lFollowX - x) * friction;
  y += (lFollowY - y) * friction;
  
  translate = 'translate(' + x + 'px, ' + y + 'px) scale(1.1)';

  $('.bg').css({
    '-webit-transform': translate,
    '-moz-transform': translate,
    'transform': translate
  });

  window.requestAnimationFrame(moveBackground);
}

$(window).on('mousemove click', function(e) {

  var lMouseX = Math.max(-100, Math.min(100, $(window).width() / 2 - e.clientX));
  var lMouseY = Math.max(-100, Math.min(100, $(window).height() / 2 - e.clientY));
  lFollowX = (20 * lMouseX) / 100; // 100 : 12 = lMouxeX : lFollow
  lFollowY = (10 * lMouseY) / 100;

});

moveBackground();