const url = 'http://localhost:3000/films'; // URL to fetch movies
const listHolder = document.getElementById('films');
const posterImage = document.getElementById('poster');
const movieTitle = document.getElementById('title');
const movieRuntime = document.getElementById('runtime');
const movieDescription = document.getElementById('film-info');
const showtimeLabel = document.getElementById('showtime');
const ticketsAvailable = document.getElementById('ticket-num');
const buyTicketButton = document.getElementById('buy-ticket');

let currentMovie; // Variable to hold the current selected movie

document.addEventListener('DOMContentLoaded', () => {
    // Fetch movies when the page loads
    fetchMovies(url);
});

// Fetch Function for Movies
function fetchMovies(url) {
    fetch(url)
        .then(response => response.json())
        .then(data => {
            // Populate the list with movies
            data.forEach(movie => {
                displayMovie(movie);
            });

            // Automatically display the first movie's details if available
            if (data.length > 0) {
                currentMovie = data[0];
                displayMovieDetails(currentMovie);
            }
        })
        .catch(error => console.error('Error fetching movies:', error));
}

// Function to display movies in the list
function displayMovie(movie) {
    const li = document.createElement('li');
    li.textContent = movie.title;
    li.className = 'film item';
    li.addEventListener('click', () => displayMovieDetails(movie));
    listHolder.appendChild(li);
}

// Function to display selected movie's details
function displayMovieDetails(movie) {
    currentMovie = movie;
    const availableTickets = movie.capacity - movie.tickets_sold;

    posterImage.src = movie.poster;
    posterImage.alt = movie.title;
    movieTitle.textContent = movie.title;
    movieRuntime.textContent = `${movie.runtime} minutes`; // Added space before 'minutes'
    movieDescription.textContent = movie.description; // Fixed variable name
    showtimeLabel.textContent = movie.showtime;
    ticketsAvailable.textContent = `${availableTickets} remaining tickets`;
    
    updateBuyTicketButton(availableTickets);
}

// Function to handle the buy ticket button
buyTicketButton.addEventListener('click', () => {
    if (currentMovie && currentMovie.capacity - currentMovie.tickets_sold > 0) {
        currentMovie.tickets_sold++;
        const availableTickets = currentMovie.capacity - currentMovie.tickets_sold;
        ticketsAvailable.textContent = `${availableTickets} remaining tickets`;
        updateBuyTicketButton(availableTickets);
    } else {
        alert('Sorry, tickets are Sold Out');
    }
});

// Function to update the Buy Ticket Button
function updateBuyTicketButton(availableTickets) {
    if (availableTickets > 0) {
        buyTicketButton.classList.remove('disabled');
        buyTicketButton.textContent = "Buy Ticket";
    } else {
        buyTicketButton.classList.add("disabled");
        buyTicketButton.textContent = "Sold Out";
    }
}

