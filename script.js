//Buttons and modal:

let btn =document.querySelector('.btn');
let addMenu = document.querySelector('.add-menu');
let close = document.querySelector('.close-btn');
let menu = false;

btn.addEventListener('click', ()=>{

    addMenu.setAttribute(`style`, `display: flex;`);
    menu = true;
})

close.addEventListener('click', ()=>{

    addMenu.setAttribute(`style`, `display: none;`);
    menu = false;
})

document.onclick = function (e){
    if (menu === true && e.target.id === 'close'){
        addMenu.setAttribute(`style`, `display: none;`);
        menu = false;
    }
}

//Logic 
let Title = document.querySelector('#title');
let Author = document.querySelector('#author');
let Pages = document.querySelector('#pages');
let IsRead = document.querySelector('#read');
let Form = document.querySelector('.form')
let myLibrary = [];
let storedNames = JSON.parse(localStorage.getItem('list_Library_TheOdinProject'));
myLibrary = storedNames || []   //Check for null
let storedMaxID = JSON.parse(localStorage.getItem('ID'));
if (storedMaxID == '' || storedMaxID == null){
    storedMaxID = 0;
}
let maxID = parseInt(storedMaxID)

//Constructor
function Book(title, author, pages, isRead, id){
    this.title = title,
    this.author = author,
    this.pages = pages,
    this.isRead = isRead
    this.id = maxID
    maxID +=1
    localStorage.setItem('ID', JSON.stringify(maxID));
    storedMaxID = JSON.parse(localStorage.getItem('ID'));
}

//Add Books:
function addBookToLibrary(Title, Author, Pages, IsRead, id){
    myLibrary.push(new Book(Title, Author, Pages, IsRead, id))
    if(myLibrary.length !== 0){
        localStorage.setItem('list_Library_TheOdinProject', JSON.stringify(myLibrary));
    }
    storedNames = JSON.parse(localStorage.getItem('list_Library_TheOdinProject'));
}

//Submit button:
Form.addEventListener('submit', (e)=>{
    e.preventDefault();

    titleVal = Title.value;
    authorVal = Author.value;
    pagesVal = Pages.value;
    isReadVal = IsRead.checked;
    id = maxID;

    if (pagesVal === ""){
        pagesVal = "unknown"
    }

    addBookToLibrary(titleVal, authorVal, pagesVal, isReadVal, id)

    addMenu.setAttribute(`style`, `display: none;`);
    menu = false;

    Title.value="";
    Author.value="";
    Pages.value="";
    IsRead.checked= false;

    createBook()
})

//Generate divs:
let container = document.querySelector('.books')


function createBook(){
    container.textContent = '';
    for (let book of myLibrary){

    //Creates a div and gives a class:
    let div = document.createElement('div')
    div.classList.add('book');
    div.classList.add('dropzone');
    div.classList.add(book.id);
    div.setAttribute('draggable', 'true');
    div.setAttribute('ondragstart', `event.dataTransfer.setData('text/plain',null)`);

    //Creates title:

    let divTitle = document.createElement('h1');
    divTitle.textContent = book.title;

    //Author:

    let divAuthor = document.createElement('h2')
    divAuthor.textContent = 'by '+book.author;

    //Read:

    let divRead = document.createElement('h3')
    divRead.textContent = book.isRead ? 'Status: Completed' : 'Status: On Progress';

    //Pages:
    let divPages = document.createElement('p');
    divPages.textContent = 'Nº of Pages: '+ book.pages;

    //Button Delete:
    let buttonDelete = document.createElement('button');
    buttonDelete.classList.add('delete')
    buttonDelete.textContent = 'Delete';

    //Delete Sistem:
    buttonDelete.addEventListener('click', ()=>{
        myLibrary.splice(myLibrary.indexOf(book),1);
        localStorage.setItem('list_Library_TheOdinProject', JSON.stringify(myLibrary));
        createBook();
    })
    
    //Button Read:
    let buttonRead = document.createElement('button');
    buttonRead.classList.add('read')
    buttonRead.textContent = 'Change Status';


    //Change Status:
    buttonRead.addEventListener('click', ()=>{
        if (book.isRead){
            book.isRead = false;
        } else{
            book.isRead = true;
        }
        localStorage.setItem('list_Library_TheOdinProject', JSON.stringify(myLibrary));
        createBook();
    })


    //Publish div:
    container.appendChild(div);
    div.appendChild(divTitle);
    div.appendChild(divAuthor);
    div.appendChild(divPages);
    div.appendChild(divRead)
    div.appendChild(buttonDelete);
    div.appendChild(buttonRead)
}}

//Change Order:

function changeOrder(from, to) {
    let firstID = findIndexForID(from);
    let secondID = findIndexForID(to);
    let first = myLibrary[firstID]
    let second = myLibrary[secondID]
    myLibrary[firstID] = second;
    myLibrary[secondID] = first;
    createBook()
    localStorage.setItem('list_Library_TheOdinProject', JSON.stringify(myLibrary));
}

function findIndexForID(ID){
    let result;
        for (let i = 0; i < myLibrary.length; i++){
            if (myLibrary[i].id == ID){
                result = i;
            }
        }
    return result;
}

//Drag:
var dragged;

document.addEventListener("drag", function (event) {
}, false);

document.addEventListener("dragstart", function (event) {
    dragged = event.target;
    event.target.style.opacity = .5;
}, false);

document.addEventListener("dragend", function (event) {
    event.target.style.opacity = "";
}, false);

document.addEventListener("dragover", function (event) {
    event.preventDefault();
}, false);

let firsElClasses, secondElClasses, firstID, secondID;
document.addEventListener("dragenter", function (event) {
    if (event.target != this && event.target.className.includes("dropzone")) {
            firsElClasses = dragged.classList.value;
            secondElClasses = event.target.classList.value;
            firstID = firsElClasses.slice(14);
            secondID = secondElClasses.slice(14);
    }
}, false);

document.addEventListener("drop", function (event) {
    changeOrder(firstID, secondID);
    event.preventDefault();
}, false);

// Test:
if(myLibrary.length == 0){
    addBookToLibrary('The Pracmatic Programmer', 'Andy Hunt and Dave Thomas', '572', true);
    addBookToLibrary('Línea de Fuego', 'Arturo Pérez Reverte', '480', false);
}
createBook()