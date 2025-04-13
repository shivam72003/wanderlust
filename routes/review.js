const express = require("express");
const router = express.Router({mergeParams:true});
const wrapAsync = require("../utils/wrapAsync.js");
const Review = require("../models/review.js");
const Listing = require("../models/listing.js");
const {validateReview, isLoggedIn, isReviewAuthor} = require("../middleware.js");
const { reviewPost, destroyReview } = require("../controller/review.js");



  ///////// for reviews
  
  router.post("/",isLoggedIn,validateReview,wrapAsync(reviewPost));


  ///////delete review 
  
  router.delete("/:reviewId",isLoggedIn,isReviewAuthor,wrapAsync(destroyReview));
  

module.exports = router;