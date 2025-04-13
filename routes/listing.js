const express = require("express");
const router = express.Router();
const Listing = require("../models/listing.js");
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressErr = require("../utils/ExpressErr.js");
const { isLoggedIn, isOwner, validateListing } = require("../middleware.js");
const ListingController = require("../controller/listing.js");
const multer  = require('multer');
const { storage, cloudinary } = require("../cloudConfig.js");
const upload = multer({ storage })

/////for index route


router
  .route("/")
  .get(wrapAsync(ListingController.index))
  .post( isLoggedIn,upload.single("image"),validateListing, wrapAsync(ListingController.postNew));
  // .post(,(req,res)=>{
  //   res.send(req.file)
  // })

router.get("/new", isLoggedIn, ListingController.renderNewPost);

router
  .route("/:id")
  .get(wrapAsync(ListingController.showPost))
  .put(
    isLoggedIn,
    isOwner,
    upload.single("image"),
    validateListing,
    wrapAsync(ListingController.updatePost)
  )
  .delete(isLoggedIn, isOwner, wrapAsync(ListingController.forDeletePost));

router.get(
  "/:id/edit",
  isLoggedIn,
  isOwner,
  wrapAsync(ListingController.forEditPost)
);

module.exports = router;
