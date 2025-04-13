const Listing = require("../models/listing");
const Review = require("../models/review");

module.exports.reviewPost = async (req, res) => {
  let listing = await Listing.findById(req.params.id);
  let bodymes = ({ comment, rating } = req.body);
  let newreview = new Review(bodymes);
  newreview.author = req.user._id;

  listing.reviews.push(newreview);

  console.log(newreview);

  await newreview.save();
  await listing.save();
  req.flash("success", "New Review is created");

  res.redirect(`/listings/${listing._id}`);
};

module.exports.destroyReview = async (req, res) => {
  let { id, reviewId } = req.params;
  await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
  await Review.findByIdAndDelete(reviewId);
  req.flash("success", "Review is Deleted");

  res.redirect(`/listings/${id}`);
};
