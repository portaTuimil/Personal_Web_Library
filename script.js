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

//Constructor
function Book(title, author, pages, isRead){
    this.title = title,
    this.author = author,
    this.pages = pages,
    this.isRead = isRead
}

//Add Books:
function addBookToLibrary(Title, Author, Pages, IsRead){
    myLibrary.push(new Book(Title, Author, Pages, IsRead))
}

//Submit button:
Form.addEventListener('submit', (e)=>{
    e.preventDefault();

    titleVal = Title.value;
    authorVal = Author.value;
    pagesVal = Pages.value;
    isReadVal = IsRead.checked;

    if (pagesVal === ""){
        pagesVal = "unknown"
    }

    addBookToLibrary(titleVal, authorVal, pagesVal, isReadVal)

    console.log(titleVal)
    console.log(authorVal)
    console.log(pagesVal)
    console.log(isReadVal)
    console.log(myLibrary)

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
    div.classList.add('book')

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


// Test:
addBookToLibrary('The Pracmatic Programmer', 'Andy Hunt and Dave Thomas', '572', true)
addBookToLibrary('Línea de Fuego', 'Arturo Pérez Reverte', '480', false)
createBook()