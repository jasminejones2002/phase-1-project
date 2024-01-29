//intialize books array
let books = [];

document.addEventListener("DOMContentLoaded", () => {
    fetchBooks()
    searchBooks()
    addBook()
})
 // fetch books in db.json
function fetchBooks() {
    fetch('http://localhost:3000/books')
    .then(res => res.json())
    .then(data => {
        books = data;
        renderBooks(data);
    })
    .catch(error => console.log(error))
}
// display db.json data in html
function renderBooks(data) {
    //grab new book containor
    const booksContainer = document.getElementById('new-book-container');
    //clear new book container
    booksContainer.innerHTML = '';
    //loop through data and create HTML for each one
    data.forEach(book => {
        const bookCard = document.createElement('div');
        bookCard.classList.add('book-card');

        const bookTitleElement = document.createElement('h3');
        bookTitleElement.textContent = book.title;
        bookCard.appendChild(bookTitleElement);

        const authorElement = document.createElement('p');
        authorElement.textContent = `By: ${book.author}`;
        bookCard.appendChild(authorElement);

        const genreElement = document.createElement('p');
        genreElement.textContent = `Genre: ${book.genre}`
        bookCard.appendChild(genreElement);

        const dateElement = document.createElement('p');
        dateElement.textContent = `Date: ${book.dateFinished}`;
        bookCard.appendChild(dateElement);

        const deleteButton = document.createElement('button')
        deleteButton.classList.add('delete')
        deleteButton.textContent = 'Delete'
        bookCard.appendChild(deleteButton)

        booksContainer.appendChild(bookCard);

        deleteButton.addEventListener('click', () => {
            const bookId = book.id;
            deleteBook(bookId);
        })
    });
}

function addBook() {
    const newBookForm = document.getElementById('add-books-form');
    newBookForm.addEventListener('submit', (e) => {
        e.preventDefault();
        //first grab the form input values
        const title = document.getElementById('title').value;
        const author = document.getElementById('author').value;
        const genre = document.getElementById('genre-list').value;
        const dateRead = document.getElementById('date-finished').value;
        //then create object with the input values
        const newBook = {
            title: title,
            author: author,
            genre: genre,
            dateFinished: dateRead
        }
        //need to create a POST request to add new book to data array
        fetch('http://localhost:3000/books', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(newBook)
        })
        .then(res => res.json())
        .then(data => {
            //push data to data array
            books.push(data);
            renderBooks(books);
            newBook.reset();
        })
        .catch(error => console.log(error))
    })
}
function deleteBook(id) {
    fetch(`http://localhost:3000/books/${id}`, {
        method: 'DELETE',
    })
    .then(res => res.json())
    .then(data => {
        //Filter out books from books array
        books = books.filter(book => book.id !== id);
        renderBooks(books);
    })
    .catch(error => console.log(error))
}

function searchBooks() {
    const searchedBooks = document.getElementById('search')
    searchedBooks.addEventListener('input', (e) => {
        let value = e.target.value.toLowerCase()
        // filters through books array to see if the input value is included in the title, genre, or author
        const filteredBooks = books.filter(book => 
            book.title.toLowerCase().includes(value) ||
            book.author.toLowerCase().includes(value) ||
            book.genre.toLowerCase().includes(value)
            );
            renderBooks(filteredBooks);
        })
    // clear button just returns the data of the renderBooks function back to the screen
    const clearButton = document.getElementById('clear')
    clearButton.addEventListener('click', () => {
        renderBooks(books)
    })
}