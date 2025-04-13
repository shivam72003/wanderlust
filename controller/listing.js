const Listing = require("../models/listing");

///// INDEX
module.exports.index = async (req, res) => {
  let allListings = await Listing.find({});
  res.render("./listing/index.ejs", { allListings });
};

////create new and post
module.exports.renderNewPost = (req, res) => {
  res.render("./listing/createnew.ejs");
};

module.exports.postNew = async (req, res) => {
  let url = req.file.path;
  let filename = req.file.filename;
  let nlisting = ({
    title: tit,
    description: dec,
    price: pri,
    location: loc,
    country: cou,
  } = req.body);
  let newlisting = new Listing(nlisting);
  newlisting.image = { url, filename };
  newlisting.owner = req.user._id;
  await newlisting.save();
  req.flash("success", "New Listing is created");
  res.redirect("/listings");
};

/////show routes

module.exports.showPost = async (req, res) => {
  let { id: uid } = req.params;
  let idlist = await Listing.findById(uid)
    .populate({
      path: "reviews",
      populate: {
        path: "author",
      },
    })
    .populate("owner");
  console.log(idlist);
  if (!idlist) {
    req.flash("error", "Listing not exist");
    res.redirect("/listings");
  }
  res.render("./listing/showroutes.ejs", { idlist });
};

////// for edit

module.exports.forEditPost = async (req, res) => {
  let { id: nid } = req.params;
  let list = await Listing.findById(nid);
  if (!list) {
    req.flash("error", "Listing not exist");
    res.redirect("/listings");
  }
  res.render("./listing/edit.ejs", { list });
};

/////for update

module.exports.updatePost = async (req, res) => {
  if (!req.body) {
    throw new ExpressErr(400, "Send Valid Data");
  }

  let { id } = req.params;
  let idlist = await Listing.findById(id);
  let nlisting = await ({
    title: tit,
    description: dec,
    price: pri,
    location: loc,
    country: cou,
  } = req.body);

  let listing = await Listing.findByIdAndUpdate(id, nlisting);

  if (typeof req.file !== "undefined") {
    let url = req.file.path;
    let filename = req.file.filename;
    listing.image = { url, filename };
    await listing.save();
  }
  req.flash("success", "Listing is Updated");
  await res.redirect(`/listings/${id}`);
};

////// for delete

module.exports.forDeletePost = async (req, res) => {
  let { id } = req.params;
  await Listing.findByIdAndDelete(id);
  req.flash("success", "Listing is Deleted");
  res.redirect("/listings");
};
