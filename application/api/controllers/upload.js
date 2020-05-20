/**
 *
 * copyright from bezkoder, nodejs-upload-image-mysql, 2020, GitHub repository
 * https://github.com/bezkoder/nodejs-upload-image-mysql.git
 */

const fs = require("fs");
const media = require("../model/database");
const Image = media.images;

const uploadFiles = async (req, res) => {
    try {
      console.log(req.file);

      if (req.file == undefined) {
        return res.send(`You must select a file.`);
      }

      Image.create({
        type: req.file.mimetype,
        name: req.file.originalname,
        description: req.body.description,
        title: req.body.title,
        isFree : req.body.isFree,
        user_id: req.user.id,
        category: req.body.category,
        status: "pending",
        data: fs.readFileSync(
          __basedir + "/resources/static/assets/uploads/" + req.file.filename
        ),
      }).then((image) => {
        fs.writeFileSync(
          __basedir + "/resources/static/assets/tmp/" + image.name,
          image.data
        );

        return res.redirect('/');
      });
    } catch (error) {
      console.log(error);
      return res.send(`Error when trying upload images: ${error}`);
    }

};



module.exports = {
  uploadFiles,
};
