document.addEventListener("DOMContentLoaded", () => {
    function fetchBooks() {
        fetch("http://localhost:3000/books")
        .then(res => res.json())
        .then(data => console.log(data))
    }
})