const mongoose = require('mongoose')

//Subscription Schema
const subscriptionSchema = new mongoose.Schema({
    user: String,
    movie: String,
    date: Date
  },{collection: 'Subscriptions'})
  
  

const Subscription = mongoose.model('Subscription', subscriptionSchema);


module.exports = Subscription;