// group routes
require("express-group-routes");

// instatiate express module
const express = require("express");

// use express in app variable
const app = express();

// define the server port
const port = 5000;

// define json parser
app.use(express.json());

// Multer
const multer = require("multer");

// Controllers
const auth = require("./controllers/authController");
const portal = require("./controllers/portalController");

// Middleware
const { authenticated, autorized } = require("./middleware");

// Destination
const Storage = multer.diskStorage({
  destination(req, file, callback) {
    callback(null, "./uploads");
  },
  filename(req, file, callback) {
    callback(null, `${file.fieldname}_${Date.now()}_${file.originalname}`);
  }
});

// Use Variable
const upload = multer({ storage: Storage });
// For Look the File
app.use("/file", express.static("uploads"));

app.group("/portal/api/", router => {
  router.get("/", (req, res) => {
    res.status(200).json("OK");
  });

  // Auth API
  router.post("/login", auth.login);
  router.post("/register", authenticated, auth.register);

  // Portal API
  router.post(
    "/post/:userId/upload",
    authenticated,
    autorized,
    upload.array("fileData", 4),
    portal.postContent
  );
  router.get("/post", portal.showPost);
  router.get("/post/:newsId", portal.detailPost);
  router.get("/shares", authenticated, portal.userShare);
  router.get("/share/portals", authenticated, portal.portalShare);
  router.get("/share/:userId", portal.storeShare);
});

app.use((err, req, res, next) => {
  if (err.name === "UnauthorizedError") {
    res.status(401).json({
      message: "You're Unauthorized"
    });
  } else {
    next(err);
  }
});

app.listen(port, () => console.log(`Listening on port ${port}!`));
