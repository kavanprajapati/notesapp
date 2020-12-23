console.log('notes app');
showNotes();
//if user adds a note, store into a local storage
let addBtn = document.getElementById("addBtn");
addBtn.addEventListener("click", function (params) {

    let addTxt = document.getElementById("addTxt");
    let addTitle = document.getElementById("addTitle");
    let notes = localStorage.getItem("notes");

    if (notes == null) {
        notesObj = [];
    } else {
        notesObj = JSON.parse(notes);
    }

    let myObj = {
        title: addTitle.value,
        text: addTxt.value
    }

    if (addTxt.value != "") {
        notesObj.push(myObj);
    } else {
        alert("Please enter something")
    }
    localStorage.setItem("notes", JSON.stringify(notesObj));
    addTitle.value = "";
    addTxt.value = "";
    //console.log(notesObj);
    showNotes();
});

// Function to show elements from localStorage 
function showNotes() {
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
    } else {
        notesObj = JSON.parse(notes);
    }

    let html = '';

    notesObj.forEach(function (element, index) {
        html += `<div class="noteCard my-2 mx-2 card" style="width: 18rem;">
        <div class="card-body">
            <h5 class="card-title">${element.title}</h5>
            <p class="card-text">${element.text}</p>
            <button id="${index}" onclick="deleteNote(this.id)" class="btn btn-primary">Delete Note</button>
        </div>
    </div>`;
    });

    let notesElem = document.getElementById("notes");
    if (notesObj.length != 0) {
        notesElem.innerHTML = html;
    }
    else {
        notesElem.innerHTML = `Nothing to show. Use above "Add a note" section to add notes`;
    }
}

// Function to delete a note
function deleteNote(index) {
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
    } else {
        notesObj = JSON.parse(notes);
    }

    let delSure = confirm('Are you sure you want to delete this note?');
    if (delSure == true) {
        notesObj.splice(index, 1);
    }
    localStorage.setItem("notes", JSON.stringify(notesObj));
    showNotes()
}

// To search the notes elements
let search = document.getElementById("searchTxt");

search.addEventListener("input", function (params) {
    let inputVal = search.value.toLowerCase();
    console.log("input value is", inputVal);
    let noteCards = document.getElementsByClassName("noteCard");

    Array.from(noteCards).forEach(function (element, index) {
        let cardTxt = document.getElementsByTagName("p")[index].innerText;
        console.log(cardTxt);
        if (cardTxt.includes(inputVal)) {
            element.style.display = "block";
        }
        else {
            element.style.display = "none";
        }
    });
});