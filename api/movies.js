const app = require("./app");
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const Subscriptions = require('./subscriptionsModel')


// old: index -> movies -> app -> movies -> app
// now: index -> app
// movies -> app

// Movie Schema
const movieSchema = new mongoose.Schema(
  {
    name: String,
    premiered: String,
    genres: [String],
    img: String,
  },
  { collection: "Movies" }
);

const Movie = mongoose.model("Movie", movieSchema);

// Routes
// Movie Routes
// fetching movies
app.get("/movies/allMovies", async (req, res) => {
  try {
    const movies = await Movie.find({});
    const moviesOut = [];
    for (const movie of movies) {
        const subscriptionsForMovie = await Subscriptions.find({movie: movie.name})
        movie._doc.subscriptions = subscriptionsForMovie.map(sub => sub._doc)
        moviesOut.push({...movie._doc});
    }
    res.json(moviesOut);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch movies" });
  }
});

// adding a new movie
app.post("/addMovie", async (req, res) => {
  const { name, premiered, genres, img } = req.body;

  if (!name || !premiered || !genres || !img) {
    return res.status(400).json({ message: "All fields are required" });
  }
  try {
    const newMovie = new Movie({
      name,
      premiered,
      genres,
      img,
    });
    await newMovie.save();
    res
      .status(201)
      .json({ message: "Movie added successfully", movie: newMovie });
  } catch (error) {
    res.status(500).json({ message: "Failed to add movie", error });
  }
});

// Movie deletion
app.delete('/movies/allMovies/:id', async (req, res) => {
    try {
      // Find the movie to be deleted
      const movie = await Movie.findById(req.params.id);
  
      if (!movie) {
        return res.status(404).json({ message: 'Movie not found' });
      }
  
      // Delete the movie
      await Movie.findByIdAndDelete(req.params.id);
  
      // Delete subscriptions related to this movie
      const deleteResult = await Subscriptions.deleteMany({ movie: movie.name });
  
      res.status(200).json({ message: 'Movie and related subscriptions deleted successfully', deletedCount: deleteResult.deletedCount });
    } catch (error) {
      console.error('Error deleting movie and subscriptions:', error);
      res.status(500).json({ message: 'Error deleting movie and subscriptions', error });
    }
  });

// updating a movie
app.put("/movies/editMovie/:id", async (req, res) => {
  const { id } = req.params;
  const { name, premiered, genres, img } = req.body;

  if (!name || !premiered || !genres || !img) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const updatedMovie = await Movie.findByIdAndUpdate(
      id,
      { name, premiered, genres, img },
      { new: true } // Return the updated document
    );

    if (!updatedMovie) {
      return res.status(404).json({ message: "Movie not found" });
    }

    res.json({ message: "Movie updated successfully", movie: updatedMovie });
  } catch (error) {
    res.status(500).json({ message: "Error updating movie", error });
  }
});

// Movie Search
app.get('/movies/search', async (req, res) => {
    const { query } = req.query;
  
    try {
      const movies = await Movie.find({
        name: { $regex: query, $options: 'i' } // Case-insensitive search
      });
      res.status(200).json(movies);
    } catch (error) {
      console.error('Error fetching movies:', error);
      res.status(500).json({ message: 'Failed to fetch movies', error });
    }
  });
  
  // Backend endpoint to get movies that the user hasn't watched yet
app.get('/movies/unwatched', async (req, res) => {
    const { user } = req.query;
  
    try {
      // Get all movies
      const allMovies = await Movie.find({});
      
      // Get all subscriptions for the user
      const userSubscriptions = await Subscriptions.find({ user: user });
  
      // Extract the names of the movies the user has already watched
      const watchedMovies = userSubscriptions.map(sub => sub.movie);
  
      // Filter out the movies that the user has already watched
      const unwatchedMovies = allMovies.filter(movie => !watchedMovies.includes(movie.name));
  
      res.status(200).json(unwatchedMovies);
    } catch (error) {
      console.error('Error fetching unwatched movies:', error);
      res.status(500).json({ message: 'Failed to fetch unwatched movies', error });
    }
  });

// Getting all subscription info for a specific movie using query parameters
app.get('/subscriptions/specificMovie', async (req, res) => {
    try {
      const { movie } = req.query; // Use query parameters instead of params
      if (!movie) {
        return res.status(400).json({ message: 'Movie query parameter is required' });
      }
      const subscriptions = await Subscriptions.find({ movie });
      res.status(200).json(subscriptions);
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch subscriptions', error });
    }
  });
  
  
