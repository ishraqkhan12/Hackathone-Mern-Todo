import slugify from "slugify";
import categoryModel from "../models/categoryModal.js";

export const createCategoryController = async (req, res) => {
  try {

    //validation
    const { name } = req.body;
    if (!name) {
      return res
        .status(401)
        .send({ success: false, message: "name is required" });
    }

    const existingCategory = await categoryModel.findOne({ name });
    if (existingCategory) {
      return res
        .status(200)
        .send({ success: false, message: "Category already exist " });
    }
    
    //category create
    const category = await new categoryModel({
      name,
      slug: slugify(name),
    }).save();
    res.status(200).send({
      success: true,
      message: "new category added successfully",
      category
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error in gategory",
      error,
    });
  }
};

export const updateCategoryController = async (req, res) =>{
    try {
        const {name} = req.body
        const {id} = req.params
        const category = await categoryModel.findByIdAndUpdate(id,{name, slug: slugify(name)}, {new: true})
        res.status(200).send({
            success:true,
            message: 'updated category successful',
            category
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message: 'error in update category'
        })
    }
}

export const getAllCategoryController = async (req, res) =>{

    try {
        const categories = await categoryModel.find({})
        res.status(200).send({
            success: true,
            message: 'get all category successfully',
            categories
        })

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'error in get all category'
        })
    }
}

export const deleteCategoryController = async (req, res) =>{

    try {
        const {id} = req.params
        const category = await categoryModel.deleteOne({_id: id})
        if(category.deletedCount == 0) {
            res.status(401).send({message:'No category found with this ID'})
        }

        res.status(200).send({
            success: true,
            message: 'category deleted Successfully',
            category

        })


    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message: 'error in delete category'
        })
    }
}

export const getSingleCategory = async (req, res) =>{
    try {
        
     const category = await categoryModel.findById({_id: req.params.id})
     res.status(200).send({
        success: true,
        message: 'sigle category geted',
        category
     })

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message: 'error in get single category',
            error
        })
        
    }
}