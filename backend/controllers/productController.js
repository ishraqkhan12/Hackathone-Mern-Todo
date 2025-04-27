import slugify from "slugify";
import productModals from "../models/productModals.js";
import fs from "fs";

export const createProductController = async (req, res) => {
  try {
    const { name, description, price, category, quantity, shipping } =
      req.fields;
    const { photo } = req.files;

    switch (true) {
      case !name:
        return res.status(400).send({ message: "Name is required" });

      case !description:
        return res.status(400).send({ message: "Description is required" });

      case !price:
        return res.status(400).send({ message: "Price is required" });

      case !category:
        return res.status(400).send({ message: "Category is required" });

      case !quantity:
        return res.status(400).send({ message: "Quantity is required" });

      case photo && photo.size > 1000000:
        return res
          .status(400)
          .send({ message: "Photo should be less than 1MB" });

      default:
        break;
    }

    const existingProduct = await productModals.findOne({ name });
    if (existingProduct) {
      return res.status(400).send({
        success: false,
        message: "Product already exists",
      });
    }

    const products = new productModals({ ...req.fields, slug: slugify(name) })
    if (photo) {
      products.photo.data = fs.readFileSync(photo.path);
      products.photo.contentType = photo.type;
    }
    await products.save();
    res
      .status(200)
      .send({ success: true, message: "Product added successfully", products });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      message: "error in create products",
    });
  }
};

export const getProductController = async (req, res) =>{
    try {
        
        const Products = await productModals.find({}).select("-photo").populate("category").limit(12).sort({createdAt:-1})
        res.status(200).send({
            success: true,
            CountTotal: Products.length ,
            message: 'Getting products successfully',
            Products
        })
    } catch (error) {
        console.log(error);
        res.status(400).send({
            success: false,
            message:'Error in get all products',
            error
        })
        
    }
}

export const singleProductController = async (req, res) =>{
  try {
    
    const singleProduct = await productModals.findOne({slug:req.params.slug}).select("-photo").populate("category")
    res.status(200).send({
        success:true,
        message: 'Product fetched successfully.',
        singleProduct
    })

  } catch (error) {
    console.log(error);
    res.status(400).send({
        success:false,
        message: 'Error in get single category'
    })
    
  }
}

export const getPhoto = async (req, res) =>{
  try {
    const product = await productModals.findById(req.params.pid).select("photo")
    if(product.photo.data){
      res.set('Content-type', product.photo.contentType)
      return   res.status(200).send(product.photo.data)
    }
  
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: 'Error while getting photo',
      error
    })
  }
   
}

export const deleteProductController = async (req, res) => {
  try {
    const product = await productModals.findByIdAndDelete(req.params.pid);

    if (!product) {
      return res.status(404).send({
        success: false,
        message: 'Product not found',
      });
    }

    res.status(200).send({
      success: true,
      message: 'Product deleted successfully',
      deletedProduct: product.name
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: 'Error while deleting product',
      error
    });
  }
};



export const updateProductController = async (req, res) => {
  try {
    const { name, description, price, category, quantity, shipping } =
      req.fields;
    const { photo } = req.files;

    switch (true) {
      case !name:
        return res.status(400).send({ message: "Name is required" });

      case !description:
        return res.status(400).send({ message: "Description is required" });

      case !price:
        return res.status(400).send({ message: "Price is required" });

      case !category:
        return res.status(400).send({ message: "Category is required" });

      case !quantity:
        return res.status(400).send({ message: "Quantity is required" });

      case photo && photo.size > 1000000:
        return res
          .status(400)
          .send({ message: "Photo should be less than 1MB" });

      default:
        break;
    }

    // const existingProduct = await productModals.find({});
    // if (existingProduct) {
    //   return res.status(400).send({
    //     success: false,
    //     message: "Product already exists",
    //   });
    // }

    const products = await productModals.findByIdAndUpdate(req.params.pid, { ...req.fields, slug: slugify(name) },  // Update fields
    { new: true })
    if (photo) {
      products.photo.data = fs.readFileSync(photo.path);
      products.photo.contentType = photo.type;
    }
    await products.save();
    res
      .status(200)
      .send({ success: true, message: "Product updated successfully", products });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      message: "Error while updating product",
      error
    });
  }
};
export const ProductFilterController = async (req, res) => {
  try {
    const { checked, radio } = req.body;
    let args = {};

    // Filter by categories
    if (checked.length > 0) args.category = checked;

    // Filter by price range
    if (radio.length > 0) {
      args.price = { $gte: radio[0], $lte: radio[1] };
    }

    // Fetch filtered products
    const products = await productModals.find(args);
    res.status(200).send({
      success: true,
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Error in filteration",
    });
  }
};
