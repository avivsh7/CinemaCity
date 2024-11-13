# CinemaCity Project

This site allows only registered users to log in. 
The site contains the following pages: 
Login.jsx: The home page of the site, username and password fields and a login button.
Movies.jsx: Has a menu with 2 options: all movies page and add movie page.
AllMovies.jsx: Presents all movies in a list. Each movie has its name, year, image, edit and delete buttons, and a list of all the users subscriptions that watched that movie. Each movie subscription is the user name plus the date of the subscription. Below there are edit and delete buttons.
AddMovie.js: Allows users to create a new movie and has three text inputs: the movie name, genres, image url, and a date input for premiered. Below are save and cancel buttons.
EditMovie.jsx: Allows users to edit and update movie data.
Subscriptions.jsx: Presents all the members and the movies they have subscribed to. Each movie name is a link that redirects to the specific movie page. There is also a "Subscribe to a new movie" button, which, when clicked, opens a div that allows to pick a new movie and a date to subscribe to.
AllMembers.jsx: Presents all the members and the movies they have subscribed to. A click on the movie name redirects to the specific movie page. Below there are edit, delete and "Subscribe to a new movie" buttons.

FrontEnd was made using React Vite. BackEnd was made using Mongoose and Express.
