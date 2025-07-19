import categoryModel from '../models/categorymodel.js'
import ProductModel from '../models/productmodel.js'
import deleteImageCloudinary from '../utils/deleteImageCloudinary.js'
const addCategoryController = async (req, res) => {
    try {
        const { name, image } = req.body
        if (!name || !image) return res.status(404).json({
            message: "enter required fields", error: true
            , success: false
        })
        const addCategory = new categoryModel({ name, image })
        const saveCategory = await addCategory.save()
        if (!saveCategory) return res.status(404).json({
            message: "Failed to add category", error: true, success: false
        })
        return res.json({
            message: "Category added successfully",
            data: saveCategory,
            error: false,
            success: true
        })

    } catch (err) {
        return res.status(500).json({
            message: err.message,
            error: true,
            success: false
        });

    }
}
const getCategoryController = async (req, res) => {
    try {
        const data = await categoryModel.find();
        return res.json({
            data,
            success: true,
            error: false
        })
    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            success: false,
            error: true
        })
    }
}
const updateCategoryController = async (req, res) => {
    try {
        const { id, name, image } = req.body;
        const update = await categoryModel.updateOne({ _id: id }, {
            name, image
        });
        return res.status(200).json({
            message: "Category updated successfully",
            data: update,
            success: true,
            error: false
        })
    } catch (error) {
        return res.status(500).json({ message: error.message || error, success: false, error: true });
    }
}
const deleteCategoryController = async (req, res) => {
    try {
        const { id } = req.body;
        
        const checkproduct = await ProductModel.find({
            category: {
                "$in": [id]
            }
        }).countDocuments()
        console.log(checkproduct);
        if (checkproduct > 0 ) {
            return res.status(400).json({
                message: "Cannot delete category, it contains subcategories or products",
                error: true,
                success: false
            })
        }
        const category = await categoryModel.findById({_id: id})
        console.log(category);
        const imageid=category.image;
        await deleteImageCloudinary(imageid);
        const deleteCategory = await categoryModel.deleteOne({ _id: id });
        return res.status(200).json({
            message: "Category deleted successfully",
            data: deleteCategory,
            success: true,
            error: false
        })
    } catch (error) {
        
        return res.status(500).json({ message: error.message || error, success: false, error: true });
    }
}

export {
    addCategoryController,
    getCategoryController,
    updateCategoryController,
    deleteCategoryController
}
