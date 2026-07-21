const myLibrary = [];

function Book(title, author, pages, read) {
    this.id = crypto.randomUUID();
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

Book.prototype.toggleRead = function () {
    this.read = !this.read;
};

function addBookToLibrary(title, author, pages, read) {
    const book = new Book(title, author, pages, read);
    myLibrary.push(book);
}

function removeBook(id) {
    const index = myLibrary.findIndex((book) => book.id === id);

    if (index !== -1) {
        myLibrary.splice(index, 1);
    }

    displayBooks();
}

const library = document.querySelector("#library");

function displayBooks() {
    library.innerHTML = "";

    myLibrary.forEach((book) => {
        const card = document.createElement("div");
        card.classList.add("card");

        card.dataset.id = book.id;

        card.innerHTML = `
            <h2>${book.title}</h2>
            <p>Author: ${book.author}</p>
            <p>${book.pages} pages</p>
            <p class="${book.read ? "read" : "unread"}">
                Status: ${book.read ? "Read ✅" : "Not Read ❌"}
            </p>

            <div class="card-buttons">
                <button class="toggle-btn">
                    ${book.read ? "Mark Unread" : "Mark Read"}
                </button>

                <button class="remove-btn">
                 Remove
                </button>
            </div>
        `;

        const toggleBtn = card.querySelector(".toggle-btn");

        toggleBtn.addEventListener("click", () => {
            book.toggleRead();
            displayBooks();
        });

        const removeBtn = card.querySelector(".remove-btn");

        removeBtn.addEventListener("click", () => {
            removeBook(card.dataset.id);
        });

        library.appendChild(card);
    });
}

const form = document.querySelector("#book-form");
const dialog = document.querySelector("#book-dialog");
const cancelBtn = document.querySelector("#cancel-btn");

const titleInput = document.querySelector("#title");
const authorInput = document.querySelector("#author");
const pagesInput = document.querySelector("#pages");
const readInput = document.querySelector("#read");

form.addEventListener("submit", function (event) {
    event.preventDefault();

    const title = titleInput.value;
    const author = authorInput.value;
    const pages = pagesInput.value;
    const read = readInput.checked;

    addBookToLibrary(title, author, pages, read);

    displayBooks();

    form.reset();

    dialog.close();
});

const newBookBtn = document.querySelector("#new-book-btn");

newBookBtn.addEventListener("click", () => {
    dialog.showModal();
});

cancelBtn.addEventListener("click", () => {
    form.reset();
    dialog.close();
});
