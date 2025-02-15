import ProductModel from '../models/productmodel.js'

const addProductController = async (req, res) => {
    try {
        console.log(req.body)
        const { name,
            image,
            category,
            unit,
            stock,
            price,
            discount,
            description,
        } = req.body
        if (!name || !image[0] || !category[0] || !unit || !stock || !price || !discount || !description) {
            return res.status(404).json({
                message: "Please fill all required fields",
                error: true,
                success: false,
            })
        }
        const newproduct = new ProductModel({
            name,
            image,
            category,
            unit,
            stock,
            price,
            discount,
            description,
        })
        console.log("NEW PRODUCT", newproduct)

        const product = await newproduct.save();
        console.log(product)
        if (!product) return res.status(404).json({
            message: "Failed to add product",
            error: true,
            success: false,
        })
        return res.json({
            message: "Product added successfully",
            data: product,
            success: true,
            error: false,
        })

    } catch (error) {
        return res.status(404).json({
            message: error.message || error,
            error: true,
            success: false,

        })
    }

}

const getProductController = async (req, res) => {
    try {
        const products = await ProductModel.find({});

        if (products.length === 0) {
            return res.status(404).json({
                message: "No products found",
                error: true,
                success: false,
            });
        }

        return res.status(200).json({
            message: "Products fetched successfully",
            data: products,
            success: true,
            error: false,
        });

    } catch (error) {
        return res.status(500).json({
            message: error.message || "Server error",
            error: true,
            success: false,
        });
    }
};

const getProductsByCategoryController = async (req, res) => {
    try {
        const {id} = req.body;
        if(!id)return res.status(404).json({message: "provide category id", error:true,success:false});
        const products = await ProductModel.find({ category:{$in:id} }).limit(10);

        return res.json({
            message: "Products fetched successfully",
            data: products,
            success: true,
            error: false,
        })

    } catch (error) {
        return res.status(500).json({
            message: error.message || "Server error",
            error: true,
            success: false,
        });
    }

}
const getProductDetailsController = async (req, res) => {
    try {
        const {id}=req.body
        if(!id)return res.status(404).json({message: "provide product id", error:true,success:false});
        const product = await ProductModel.findById(id);
        if (!product) return res.status(404).json({
            message: "Product not found",
            error: true,
            success: false,
        })
        return res.status(200).json({
            message: "Product fetched successfully",
            data: product,
            success: true,
            error: false,
        })

    } catch (error) {
        return res.status(500).json({
            message: error.message || "Server error",
            error: true,
            success: false,

        })
    }
}

const updateProductController = async (req, res) => {
    try {
        const {id }=req.body
        if(!id)return res.status(404).json({message:"provide id",error:true,success:false})
        const updatedproduct = await ProductModel.updateOne({_id:id},{...req.body})
        return res.json({
            message: "Product updated successfully",
            data: updatedproduct,
            success: true,
            error: false,
        })

    } catch (error) {
        return res.status(500).json({
            message: error.message || "Server error",
            error: true,
            success: false,
        })
        
    }
}
const deleteProductController = async (req, res) => {
    try {
        const {id }=req.body
        console.log(req.body)
        if(!id)return res.status(404).json({message:"provide id",error:true,success:false})
            //remove images form cloudinary
        
        const deletedproduct = await ProductModel.deleteOne({_id:id})
        return res.json({
            message: "Product deleted successfully",
            data: deletedproduct,
            success: true,
            error: false,
        })
        
    } catch (error) {
     return res.status(500).json({
        message: error.message || "Server error",
        error: true,
        success: false,
     })   
    }
}
const searchProductController=async (req, res) => {
    try {
        
        const {search}=req.body;
       
        if(!search)return res.status(404).json({message:"provide search query",error:true,success:false})
            
            const products = await ProductModel.find({
                name: { $regex: search, $options: "i" } 
            }).lean();
                return res.json({
            message: "Products fetched successfully",
            data: products,
            success: true,
            error: false,
        })
    } catch (error) {
        return res.status(500).json({
            message: error.message || "Server error",
            error: true,
            success: false,
        })
    }
}
export {
    addProductController,
    getProductController,
    getProductsByCategoryController,
    getProductDetailsController,
    updateProductController,
    deleteProductController,
    searchProductController
}