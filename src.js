let myLibrary = [];

function book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
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

function addBookToLibrary(bookInput) {
    myLibrary.push(bookInput);
}

// Manually creating some books for now.
// 