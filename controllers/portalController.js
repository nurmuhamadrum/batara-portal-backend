const models = require("../models");

const User = models.user;
const Portal = models.portal;
const Files = models.file;
const News = models.news;
const Share = models.share;

exports.postContent = (req, res) => {
  if (req.role == 1 || req.role == 2) {
    if (req.userId != req.params.userId) {
      res.status(403).json({ messege: "Forbidden Access" });
    } else {
      News.create({
        title: req.body.title,
        content: req.body.content,
        createdBy: req.params.userId
      })
        .then(status => {
          req.files.map(x => {
            Files.create({ fileName: x.filename, newsId: status.id });
          });
          res.status(200).json({
            message: "success"
          });
        })
        .catch(err => {
          console.log(err);
        });
    }
  } else {
    res.status(401).send({ message: "Unauthorized" });
  }
};

exports.showPost = (req, res) => {
  News.findAll({
    include: [
      {
        model: Files,
        attributes: {
          exclude: ["createdAt", "newsId", "updatedAt"]
        }
      }
    ]
  })
    .then(news => {
      res.json(news);
    })
    .catch(() => {
      res.json({
        error: true,
        message: "Error Fatch Data"
      });
    });
};

exports.detailPost = (req, res) => {
  News.findOne({
    include: [
      {
        model: Files,
        attributes: {
          exclude: ["createdAt", "newsId", "updatedAt"]
        }
      }
    ],
    where: {
      id: req.params.newsId
    }
  })
    .then(news => {
      res.json(news);
    })
    .catch(() => {
      res.json({
        error: true,
        message: "Error Fatch Data"
      });
    });
};

exports.storeShare = (req, res) => {
  Share.findOne({
    where: {
      userId: req.params.userId,
      portalId: req.body.portal
    }
  }).then(respon => {
    if (respon) {
      res.json({
        message: "You Already Share in this platform"
      });
    } else if (req.body.portal > 3 || req.body.portal < 1) {
      res.json({
        message: "Invalid Platform"
      });
    } else {
      Share.create({
        userId: req.params.userId,
        portalId: req.body.portal,
        newsId: req.body.news
      })
        .then(() => {
          res.status(200).json({
            message: "Success"
          });
        })
        .catch(err => {
          res.json({
            message: err
          });
        });
    }
  });
};

exports.userShare = (req, res) => {
  if (req.role == 1 || req.role == 2) {
    User.findAll({
      include: [
        {
          model: News,
          require: false,
          as: "news",
          attributes: {
            exclude: ["createdAt", "createdBy", "content", "updatedAt"]
          },
          include: [
            {
              model: Portal,
              attributes: {
                exclude: ["createdAt", "updatedAt"]
              },
              through: { attributes: [] }
            }
          ],
          through: { attributes: [] }
        }
      ],
      attributes: {
        exclude: ["password", "role", "createdAt", "updatedAt"]
      }
    })
      .then(respon => {
        res.json(respon);
      })
      .catch(err => {
        console.log(err);
      });
  } else {
    res.status(401).send({ message: "Unauthorized" });
  }
};

exports.portalShare = (req, res) => {
  if (req.role == 1 || req.role == 2) {
    User.findAll({
      include: [
        {
          model: Portal,
          require: false,
          attributes: {
            exclude: ["createdAt", "updatedAt"]
          },
          include: [
            {
              model: News,
              attributes: {
                exclude: ["content", "createdAt", "updatedAt"]
              },
              through: { attributes: [] }
            }
          ],
          through: { attributes: [] }
        }
      ],
      attributes: {
        exclude: ["password", "role", "createdAt", "updatedAt"]
      }
    })
      .then(respon => {
        res.json(respon);
      })
      .catch(err => {
        console.log(err);
      });
  } else {
    res.status(401).send({ message: "Unauthorized" });
  }
};
