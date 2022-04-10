'use strict'

const express = require ('express')


const api = express.Router()
const userCtrl = require ('../controllers/users')





api.post('/signup', userCtrl.signup)
api.post('/signin', userCtrl.signin)
api.put('/updateuser', userCtrl.updateUser)
api.delete('/down', userCtrl.deleteStuff)
api.post('/getcheckboxes', userCtrl.getCheckBoxes)




//=========================================================MANGAS
const mangaCtrl = require ('../controllers/manga')

api.post('/savemanga', mangaCtrl.saveManga)
api.get('/findmangas', mangaCtrl.findMangas)
api.post('/updatemanga', mangaCtrl.updateManga)
api.delete('/deletemanga', mangaCtrl.deleteManga)


//=========================================================CHAPTERS
const chapterCtrl = require ('../controllers/chapters')

api.post('/savechapter', chapterCtrl.saveChapter)
api.post('/findchapters', chapterCtrl.findChapters)
api.put('/updatechapter', chapterCtrl.updateChapter)
api.delete('/deletechapter', chapterCtrl.deleteChapter)


//=========================================================IMAGES
const imageCtrl = require ('../controllers/images')

api.post('/saveimage', imageCtrl.saveImage)
api.post('/findimages', imageCtrl.findImages)
api.delete('/deleteimage', imageCtrl.deleteImage)




//=========================================================COMMENTS

const commentCtrl = require ('../controllers/comments')

api.post('/savecomment', commentCtrl.saveComment)
api.post('/findcomments', commentCtrl.findComments)
api.put('/updatecomment', commentCtrl.updateComment)
api.delete('/deletecomment', commentCtrl.deleteComment)


//==========================================================FOLLOWS

const followCtrl = require ('../controllers/follows')

api.post('/savefollow', followCtrl.saveFollow)
api.post('/findfollow', followCtrl.findFollow)
api.post('/findfollowsmanga', followCtrl.findFollowsManga)
api.post('/findfollowsmangas', followCtrl.findFollowsMangas)
api.delete('/deletefollow', followCtrl.deleteFollow)


//==========================================================INDEXACTIVE

const indexactiveCtrl = require ('../controllers/indexactive')

api.post('/saveindexactive', indexactiveCtrl.saveIndexActive)
api.post('/findindexactive', indexactiveCtrl.findIndexActive)
api.put('/updateindexactive', indexactiveCtrl.updateIndexActive)


//=========================================================REPLIES

const replyCtrl = require ('../controllers/replies')

api.post('/savereply', replyCtrl.saveReply)
api.post('/findreplies', replyCtrl.findReplies)
api.delete('/deletereply', replyCtrl.deleteReply)






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
const { saveImage } = require('../controllers/images')

api.post('/saveratingreview', ratingReviews.saveRatingReview)
api.post('/findratingreview', ratingReviews.findRatingReview)
api.post('/findratingreviewpersonal', ratingReviews.findRatingReviewPersonal)
api.delete('/deleteratingreview', ratingReviews.deleteRatingReview)




module.exports = api

