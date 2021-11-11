// Initializations
const cardsContainer = document.querySelector(".cards-container");
const addButton      = document.querySelector(".add-button");
const closeButton    = document.querySelector(".close-button");
const form           = document.getElementById("book-form");
let myLibrary = [];

function book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.displayed = false;
    this.info = function () {
        let res = "";
        if(this.read == true) {
            res = "Read already";
        }
        else {
            res = "not read yet";
        }
        return this.title + " by " + this.author + ", " + this.pages + " pages, " + res;
    };
}

function addBookToLibrary(title, author, pages, read) {
    let newBook = new book(title, author, pages, read);
    myLibrary.push(newBook);
}

function closeForm() {
    document.querySelector(".bg-modal").style.display = 'none';
    document.getElementById("book-form").reset();
}

function displayBooks() {
    for (let i = 0; i < myLibrary.length; i++) {
        if(myLibrary[i].displayed == false) {
            let card = document.createElement("div");
            let cardTitle = document.createElement("div");
            let cardAuthor = document.createElement("div");
            let cardPages = document.createElement("div");
            let cardRead = document.createElement("div");
    
            cardTitle.textContent = "Title: " + myLibrary[i].title.toString();
            cardAuthor.textContent = "Author: " + myLibrary[i].author.toString();
            cardPages.textContent = "Pages: " + myLibrary[i].pages.toString();
            cardRead.textContent = "Read: " + myLibrary[i].read.toString();
    
            cardTitle.classList.add('title-info');
            cardAuthor.classList.add('author-info');
            cardPages.classList.add('pages-info');
            cardRead.classList.add('read-info');
            card.classList.add('card');
    
            card.appendChild(cardTitle);
            card.appendChild(cardAuthor);
            card.appendChild(cardPages);
            card.appendChild(cardRead);
            cardsContainer.appendChild(card);

            myLibrary[i].displayed = true;
        }


    }
}

function submitDataForm(e) {
    e.preventDefault();
    let inputTitle = document.getElementById('title').value;
    let inputAuthor = document.getElementById('author').value;
    let inputPages = document.getElementById('number').value;
    let radios = document.getElementsByName('read');
    let bRead = false;
    for (let i = 0; i < radios.length; i++) {
        if(radios[i].checked) {
            console.log(radios[i].value);
            if (radios[i].value == "no"){
                bRead = false;
            }
            else {
                bRead = true;
            }
        }
    }

    addBookToLibrary(inputTitle, inputAuthor, inputPages, bRead);
    displayBooks();
    closeForm();
}

// Manually creating some books for now.
addBookToLibrary("Legends of Smithy Jones", "Pen Island", 255, true);
addBookToLibrary("Legends of King Arthur", "Pen Island", 255, true);
addBookToLibrary("Legends of Grey Hound", "Pen Island", 255, true);
displayBooks();

addButton.addEventListener('click', () => {
    document.querySelector(".bg-modal").style.display = 'flex';
});

closeButton.addEventListener('click', () => {
    closeForm();
});

form.addEventListener('submit', submitDataForm);

