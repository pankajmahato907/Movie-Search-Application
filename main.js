function work() {
  let title = document.getElementById('search').value;
  console.log(title);

  // Check if the search input is empty
  if (title === '') {
    showError('Please enter a movie title.');
    return;
  }

  const apikey = "b4cdfba7";
  const url = `https://www.omdbapi.com/?t=${title}&apikey=b4cdfba7`;

  fetch(url)    //initiates a network request to specified url and used to fetch resources such as data or file from a server.
    .then((response) => {  //handle the response once it received from the server('response'parameter respresents the response object)
      if (!response.ok) {   //ok property indicates whether the response was successful or not (i.e., if the status code is within the range of 200-299).
        throw new Error('Failed to fetch movie data.');
      }
      return response.json(); //If the response is successful (status code 200-299), this line extracts the JSON body content from the response.
    })
    .then((data) => {
      console.log(data);
      if (data.Response === 'False') {
        showError('Movie not found. Please try a different title.');
        return;
      }
      displayMovieDetails(data);
    })
    .catch((error) => { //This line attaches a callback function to handle any errors that occur in the Promise chain.
      showError(error.message);
    });
}

function showError(message) {  //If an error occurs at any point in the Promise chain, this function is called to display the error message to the user
  const errorContainer = document.getElementById('error');
  errorContainer.textContent = message;
}

function displayMovieDetails(data) {
  const movieTitle = document.getElementById('movieTitle');
  const rating = document.getElementById('rating');

  movieTitle.innerHTML = `Title: <b>${data.Title}</b>`;
  rating.innerHTML = `IMDB Rating: <b>${data.imdbRating}</b><br>Release Year: <b>${data.Year}</b><br>Director Name: <b>${data.Director}</b><br><br><img src="${data.Poster}">`;

  // Clear any previous error message
  const errorContainer = document.getElementById('error');
  errorContainer.textContent = '';
}
