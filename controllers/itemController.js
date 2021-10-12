const fs = require('fs');

const Item = require('../models/itemModel');
const cloudinary = require('../utils/cloudinary');

//READ
exports.getItems = async (req,res) => {

  try {
    const data = await Item.find().sort({date_added: -1})
    
    res.status(200).json({
      status: 'success',
      result: data.length,
      data
    });  
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      error: err.message
    });  
  }
  
}
// Create and Save a new User
exports.create = async (req, res) => {

  try {
    // Validate request
    const {name, price, sub_description, description, category } = req.body;
    const {files} = req

  if (!name, !price, !sub_description, !description, !category, !files) {

    return res.status(400).send({ message: "Content cannot be empty!" });
  }

  const imageArr = []

  const imagePromises = files.map(file => {
    return cloudinary.uploader.upload(file.path, {
      folder: 'mommycare'
    })
  })

  files.map(file => {
    fs.unlinkSync(file.path)
  })

  const result = await Promise.all(imagePromises)

  result.forEach(image => {
    imageArr.push(image.secure_url)
  })

  // console.log(imageArr)

 // Create an Item
 const item = await Item.create({
    name,
    price,
    sub_description,
    description,
    category,
    image: imageArr
  });

  res.status(201).json({
    status: 'success',
    data: item

  })
    
  } catch (err) {

    res.status(400).json({
      status: 'fail',
      error: err
    })
    
  }
    



  // Save Item in the database
}

// item
//   .save(item)
//   .then(data => {
//     res.send(data);
//   })
//   .catch(err => {
//     res.status(500).send({
//       message:
//         err.message || "Some error occurred while creating the item."
//     });
//   });


//CREATE
// exports.postItem = (req,res) => {
//     const newItem = new Item(req.body);
//     newItem.save().then(item => res.json(item));
//}

exports.findOne = (req, res) => {
  const id = req.params.id;

  Item.findById(id)
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found Item with id " + id });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving Item with id=" + id });
    });
};



//UPDATE
exports.updateItem = (req,res) => {
    Item.findByIdAndUpdate({_id: req.params.id},req.body).then(function(item){
        Item.findOne({_id: req.params.id}).then(function(item){
            res.json(item);
        });
    });
}

//DELETE
exports.deleteItem = (req,res) => {
    Item.findByIdAndDelete({_id: req.params.id}).then(function(item){
        res.json({success: true});
    });
}

//GETBYCATEGORY

// exports.getbycategory = async (req, res) => {
//   try{
//     let newGroup = await Item.find({category: req.params.category}).populate(
//       "BoysClothes",
//       "GirlClothes",
//       "Shoes",
//       "toys"

//     );
//     ; 
//     if (!newGroup)
//       return res.status(404).json({
//         message: "not found",
//         success: false,
//       });
//     res.json({ newGroup });
//   }catch (err) {
//     return res.staus(500).json({
//       message: err.message,
//       success: false,
//     });
//   }
// };

exports.getbycategory = async (req, res) => {
  const categoryName = req.params.category
  let newCategoryArray = ""
  try{
     newCategoryArray = await Item.find({category: categoryName});
     
    if (!newCategoryArray)
      return res.status(404).json({
        message: "not found",
        success: false,
      });
    res.json({ newCategoryArray });
  }catch (err) {
    return res.status(500).json({
      message: err.message,
      success: false,
    });
  }

  return newCategoryArray
};