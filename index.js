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

// Destination File
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

  // Endpoint untuk user login
  router.post("/login", auth.login);
  // Endpoint untuk user register
  router.post("/register", authenticated, auth.register);

  // Portal API

  // Endpoint untuk user membuat berita
  router.post(
    "/post/:userId/upload",
    authenticated,
    autorized,
    upload.array("fileData", 4),
    portal.postContent
  );
  // Endpoint untuk melihat semua berita
  router.get("/post", portal.showPost);
  // Endpoint untuk melihat detail dari setiap berita
  router.get("/post/:newsId", portal.detailPost);
  // Endpoint untuk user dapat share berita ke platform
  router.get("/share/:userId", portal.storeShare);
  // Endpoint untuk melihat berita apa saja yang sudah di share ke platform
  router.get("/share/portals", authenticated, portal.portalShare);
  // Endpoint untuk melihat apasaja yang telah di share oleh user
  router.get("/shares", authenticated, portal.userShare);
});

app.listen(port, () => console.log(`Listening on port ${port}!`));
