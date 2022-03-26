'use strict'

const express = require ('express')


const api = express.Router()
const userCtrl = require ('../controllers/users')





api.post('/signup', userCtrl.signup)
api.post('/signin', userCtrl.signin)
api.put('/update', userCtrl.updateUser)
api.delete('/down', userCtrl.deleteStuff)
api.post('/getcheckboxes', userCtrl.getCheckBoxes)




//=========================================================MANGAS
const mangaCtrl = require ('../controllers/manga')

api.post('/savemanga', mangaCtrl.saveManga)
api.get('/findmangas', mangaCtrl.findMangas)


//=========================================================CHAPTERS
const chapterCtrl = require ('../controllers/chapters')

api.post('/savechapter', chapterCtrl.saveChapter)
api.post('/findchapters', chapterCtrl.findChapters)





//=========================================================COMMENTS

const commentCtrl = require ('../controllers/comments')

api.post('/savecomment', commentCtrl.saveComment)
api.post('/findcomments', commentCtrl.findComments)
api.post('/find5lastcomments', commentCtrl.find5LastComments)
api.delete('/deletecomment', commentCtrl.deleteComment)




//==========================================================RATINGS

const ratingCtrl = require ('../controllers/ratings')

api.post('/saverating', ratingCtrl.saveRating)
api.post('/findrating', ratingCtrl.findRating)
api.delete('/deleterating', ratingCtrl.deleteRating)
api.post('/find5lastratings', ratingCtrl.find5LastRatings)


//==========================================================FAVORITES

const favoriteCtrl = require ('../controllers/favorites')

api.post('/savefavorite', favoriteCtrl.saveFavorite)
api.post('/findfavorites', favoriteCtrl.findFavorites)


//==========================================================REVIEWS

const reviewsCtrl = require('../controllers/reviews')

api.post('/savereview', reviewsCtrl.saveReview)
api.post('/findreviews', reviewsCtrl.findReviews)
api.delete('/deletereview', reviewsCtrl.deleteReview)



//==========================================================RATINGREVIEWS

const ratingReviews = require('../controllers/ratingreviews')

api.post('/saveratingreview', ratingReviews.saveRatingReview)
api.post('/findratingreview', ratingReviews.findRatingReview)
api.post('/findratingreviewpersonal', ratingReviews.findRatingReviewPersonal)
api.delete('/deleteratingreview', ratingReviews.deleteRatingReview)




module.exports = api

