const { isValidObjectId } = require("mongoose");
const Blog = require("../models/blog");
const { TandD } = require("../services/getTimeAndDate");

module.exports.blog_get=(req,res)=> {
    Blog.find().sort({'updatedAt':-1})
    .then(resp=> {

        res.json({data: resp,status:true})
    })
    .catch(err=> {
        res.json({status:false})
    })
}
module.exports.blog_post=(req,res)=> {
    const {title,body} = req.body; // get title and body from frontend
    let upd = {title,body}; // add to an object
    const toDb = new Blog(upd); // creating a new model to be saved on db
    toDb.save() // saving to db
    .then(resp=> {
        res.json({status: true, data: resp})
    })
    .catch(err=> {
        res.json({status:false,msg: "Unable to add blog"})
    })
}
module.exports.blog_patch=(req,res)=> {
    let {id,title,body} = req.body;
    let upd= {}
    if(isValidObjectId(id)) {
        if(title !== undefined) {
            // to update
            upd.title=title;
        }
        if(body !== undefined) {
            // to update
            upd.body=body;
        }
        upd.date = TandD();

        if(title === undefined && body === undefined) {
            res.json({msg: "nothing to update",status:false})
        }else{
            Blog.findByIdAndUpdate({"_id":id},upd,{returnOriginal:false})
            .then(resp=> {
                res.json({status:true,data:resp})
            })
            .catch(err=> {
                res.json({status:false,msg: "unable to update"})
            })
        }
      
    }else{
        res.json({status:false,msg: "invalid blog id"})
    }

}
module.exports.blog_delete=(req,res)=> {
    const {id} = req.body;
    // check if its a valid id
    if(isValidObjectId(id)) {
        // find by id and delete
        Blog.findByIdAndDelete({"_id":id})
        .then(resp=> {
            if(resp) {
                res.json({msg: "Blog deleted",status:true})
                
            }else{
                res.json({msg: "Blog id not found",status:false})

            }

        })
        .catch(err=> {
            res.json({status:false, msg: "error deleting blog"})
        })
    }else{
        res.json({status:false,msg: "invalid id"})
    }

}
module.exports.blog_single=(req,res)=> {
    const {id} = req.params;
    // check if its a valid id
    if(isValidObjectId(id)) {
        // find a singl blog by id
        Blog.findById({"_id":id})
        .then(resp=> {
            if(resp) {
                res.json({data: resp,status:true,msg: "blog found"})
                
            }else{
                res.json({msg: "Blog id not found",status:false})

            }

        })
        .catch(err=> {
            res.json({status:false, msg: "error finding blog"})
        })
    }else{
        res.json({status:false,msg: "invalid id"})
    }
}

module.exports.blog_like = (req, res) => {
    let { id, email } = req.body;
    if (isValidObjectId(id)) {
      Blog.findByIdAndUpdate(
        { _id: id },
        { $addToSet: { like: email }, $pull: { dislike: email } },
        { returnDocument: "after" }
      )
        .then((rep) => {
          if (rep === null) {
            res.json({ status: false });
          } else {
            res.json({ status: true, data: rep });
          }
        })
        .catch((err) => {
          res.json({ err });
        });
    } else {
      res.json({ err: "Please provide a valid blog id" });
    }
  };

  module.exports.blog_unlike = (req, res) => {
    let { id, email } = req.body;
    if (isValidObjectId(id)) {
      Blog.findByIdAndUpdate(
        { _id: id },
        { $pull: { like: email }, $addToSet: { dislike: email } },
        { returnDocument: "after" }
      )
        .then((rep) => {
          if (rep === null) {
            res.json({ status: false });
          } else {
            res.json({ status: true, data: rep });
          }
        })
        .catch((err) => {
          res.json({ err: err.message });
        });
    } else {
      res.json({ err: "Please provide a valid blog id" });
    }
  };

  module.exports.get_blog_comments = (req, res) => {
    let { id } = req.body;
    if (isValidObjectId(id)) {
      Blog.findById({ _id: id }, { comments: 1 })
        .then((ans) => {
          res.json(ans);
        })
        .catch((err) => {
          res.json({ status: false, err });
        });
    } else {
      res.json({ status: false, msg: "invalid blog id" });
    }
  };

  module.exports.blog_comments = (req, res) => {
    let { id, content, name } = req.body;
    if (
      content !== undefined &&
      name !== undefined &&
      isValidObjectId(id)
    ) {
      Blog.findOneAndUpdate(
        { _id: id },
        { $addToSet: { comments: { img, content, name, date: TandD() } } },
        { returnDocument: "after" }
      )
        .then((rep) => {
          res.json({ status: true, msg: "comment added!", data: rep });
        })
        .catch((err) => {
          res.json(err.message);
        });
    } else {
      res.json({
        status: false,
        msg: "Please empty comment or invalid id or not img,content and name",
      });
    }
  };