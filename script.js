const myLibrary = [];
let addBtn = document.getElementById("addBtn");
let addForm = document.getElementById("addForm");
const radioButtons = document.getElementsByName('readStatus');
let selectedValue;

for (let i = 0; i < radioButtons.length; i++) {
    if (radioButtons[i].checked) {
        selectedValue = radioButtons[i].value;
        break;
    }
}

function Book(author, title, numberOfPages, readStatus) {
    this.author = author;
    this.title = title;
    this.numberOfPages = numberOfPages;
    this.readStatus = readStatus; 
}

Book.prototype.toggleReadStatus = function() {
    this.readStatus = this.readStatus === "Read" ? "Not Read" : "Read";
};

function addBookToLibrary(){
    addForm.style.display = 'inline';
    addForm.addEventListener('submit',function(event) {
        event.preventDefault();
        const author = document.getElementById('author').value;
        const title = document.getElementById('title').value;
        const numberOfPages = document.getElementById('numberOfPages').value;
        const readStatus = document.querySelector('input[name="readStatus"]:checked').value;
        const book = new Book(author, title, numberOfPages, readStatus);
        myLibrary.push(book);

        document.getElementById('author').value = '';
        document.getElementById('title').value = '';
        document.getElementById('numberOfPages').value = '';
        document.querySelector('input[name="readStatus"]:checked').checked = false;

        displayBook(book, myLibrary.length - 1);
    }, { once: true }); 
}

function displayBook(book, index){
    let container = document.getElementById('container');
    addForm.style.display = 'none';

    let card = document.createElement("div");
    card.style.width = '200px';
    card.style.height = '200px';
    card.style.borderRadius = '10px';
    card.style.backgroundColor = 'lightgray';
    card.style.margin = '10px';
    card.style.padding = '10px';
    card.style.boxShadow = '0px 4px 8px rgba(0, 0, 0, 0.1)';

    card.innerHTML = 
        '<strong>Author:</strong> ' + myLibrary[index].author + '<br>' +
        '<strong>Title:</strong> ' + myLibrary[index].title + '<br>' +
        '<strong>Number of Pages:</strong> ' + myLibrary[index].numberOfPages + '<br>' +
        '<strong>Read Status:</strong> <span class="read-status">' + myLibrary[index].readStatus + '</span><br>' + 
        '<button class="toggleStatusBtn">Toggle Read Status</button><br>' +
        '<button class ="deleteBtn"> Delete </delete>';

    container.appendChild(card);

    card.querySelector('.toggleStatusBtn').addEventListener('click', function() {
        toggleReadStatus(index, card);
    });

    card.querySelector('.deleteBtn').addEventListener('click', function() {
        deleteBook(index, card);
    });
}

function toggleReadStatus(index, cardElement) {
    myLibrary[index].toggleReadStatus();
    const readStatusElement = cardElement.querySelector('.read-status');
    readStatusElement.textContent = myLibrary[index].readStatus;
}

function deleteBook(index, cardElement) {
    myLibrary.splice(index, 1); 
    cardElement.remove();
}

addBtn.addEventListener('click', addBookToLibrary);