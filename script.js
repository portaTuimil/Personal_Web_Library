/*Styles*/ 

let btn =document.querySelector('.btn');
let addMenu = document.querySelector('.add-menu');
let close = document.querySelector('.close-btn');
let menu = false;

btn.addEventListener('click', ()=>{

    addMenu.setAttribute(`style`, `display: inline;`);
    menu = true;
})

close.addEventListener('click', ()=>{

    addMenu.setAttribute(`style`, `display: none;`);
    menu = false;
})

document.onclick = function (e){
    if (menu === true && e.target.id !== 'false'){
        addMenu.setAttribute(`style`, `display: none;`);
        menu = false;
    }
}



/*Logic*/ 
let myLibrary = [];

function Book(title, author, pages, readed){
    this.title = title,
    this.author = author,
    this.pages = pages,
    this.readed = readed
}

function addBookToLibrary(book){
    let title = 'x';
    let author = 'y';
    let pages = 'z';
    let readed = 'q'
    myLibrary.push(new Book(title, author, pages, readed))


}

addBookToLibrary('Lord Of The Rings')
console.log(myLibrary)
