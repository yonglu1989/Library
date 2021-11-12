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
    this.indexID = myLibrary.length;
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
    this.update = function () {
        if (this.read == false) {
            this.read = true;
        }
        else if(this.read == true){
            this.read = false;
        }
    }
    this.updateID = function () {
        this.indexID = myLibrary.indexOf(this);
    }
}

function addBookToLibrary(title, author, pages, read) {
    let newBook = new book(title, author, pages, read);
    myLibrary.push(newBook);
}

function closeForm() {
    document.querySelector(".bg-modal").style.display = 'none';
    document.getElementById("book-form").reset();
}

function updateIDS() {
    myLibrary.forEach((book) => {
        let domCard = document.querySelector(`[data-index='${book.indexID}']`);
        book.updateID();
        domCard.setAttribute('data-index', book.indexID.toString());
    });
}
function displayBooks() {
    for (let i = 0; i < myLibrary.length; i++) {
        if(myLibrary[i].displayed == false) {
            let card = document.createElement("div");
            let cardTitle = document.createElement("div");
            let cardAuthor = document.createElement("div");
            let cardPages = document.createElement("div");
            let cardRead = document.createElement("div");
            let cardUpdate = document.createElement("div");
            let cardDelete = document.createElement("div");
            let iconUpdate = document.createElement("i");
            let iconDelete = document.createElement("i");

            cardTitle.textContent = "Title: " + myLibrary[i].title.toString();
            cardAuthor.textContent = "Author: " + myLibrary[i].author.toString();
            cardPages.textContent = "Pages: " + myLibrary[i].pages.toString();
            cardRead.textContent = "Read: " + myLibrary[i].read.toString();
            iconUpdate.textContent = "edit";
            iconDelete.textContent = "delete_forever";

            iconUpdate.classList.add('material-icons', 'size');
            iconDelete.classList.add('material-icons', 'size');
            cardTitle.classList.add('title-info');
            cardAuthor.classList.add('author-info');
            cardPages.classList.add('pages-info');
            cardRead.classList.add('read-info');
            cardUpdate.classList.add('update-info');
            cardDelete.classList.add('delete-info');
            card.classList.add('card');
            
            cardUpdate.addEventListener('click', updateCard);
            cardDelete.addEventListener('click', deleteCard);

            cardUpdate.innerHTML = iconUpdate.outerHTML + "Update";
            cardDelete.innerHTML = iconDelete.outerHTML + "Delete";
 
            card.appendChild(cardTitle);
            card.appendChild(cardAuthor);
            card.appendChild(cardPages);
            card.appendChild(cardRead);
            card.appendChild(cardUpdate);
            card.appendChild(cardDelete);
            card.setAttribute('data-index', myLibrary[i].indexID);
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

// Update Read Status on mylibrary array and DOM
function updateCard(e) {
    let element = this.parentElement;
    let dataIndex = element.getAttribute('data-index');
    myLibrary[dataIndex].update();
    element.children[3].textContent = "Read: " + myLibrary[dataIndex].read.toString();
}   

// Remove the element from the DOM
// Remove the element from the library array and update the
// data-attributes and ids.
function deleteCard(e) {
    let element = this.parentElement;
    let dataIndex = element.getAttribute('data-index');

    element.remove();
    myLibrary.splice(dataIndex, 1);
    updateIDS();
}

addButton.addEventListener('click', () => {
    document.querySelector(".bg-modal").style.display = 'flex';
});

closeButton.addEventListener('click', () => {
    closeForm();
});

form.addEventListener('submit', submitDataForm);

