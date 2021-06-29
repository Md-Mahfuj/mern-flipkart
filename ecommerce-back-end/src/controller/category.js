const Category = require("../models/category");
const slugify = require("slugify");
const shortid=require('shortid')

function createCategories(categories, parentId = null) {
    const categoryList = [];
    let category;
    if (parentId == null) {
        // if the parent id is == null , its means this will be a parent category
        // parent lavel category does not have parentId so that we have written cat.parentId == undefined
        category = categories.filter((cat) => cat.parentId == undefined);
    } else {
        category = categories.filter((cat) => cat.parentId == parentId);
    }

    // console.log(category);

    // mentioned above category is an array now.

    for (let cate of category) {
        categoryList.push({
            _id: cate._id,
            name: cate.name,
            slug: cate.slug,
            parentId: cate.parentId,
            type: cate.type,
            children: createCategories(categories, cate._id),
        });
        /*
            above children: createCategories() code is for recursive function,
            its mean if the category having another child category otr sub category
            suppose a ctegory Electronics havinng a child or sub category which will be Mobile
        */
    }

    return categoryList;
}

exports.addCategory = (req, res) => {


    const categoryObj = {
        name: req.body.name,
        slug:  `${slugify(req.body.name)}-${shortid.generate()}`,

    }

    if (req.file) {
        categoryObj.categoryImage = process.env.API + '/public' + req.file.filename;
    }

    if (req.body.parentId) {
        categoryObj.parentId = req.body.parentId;
    }

    const cat = new Category(categoryObj);
    cat.save((error, category) => {
        if (error) {
            return res.status(400).json({error});
        }
        if (category) {
            return res.status(201).json({category});

        }

    })

};

exports.getCategories = (req, res) => {
    Category.find({})
        .exec((error, categories) => {
            if (error) {
                return res.status(400).json({error});
            }
            if (categories) {
                const categoryList = createCategories(categories);
                return res.status(200).json({categoryList});
            }
        })
}


exports.updateCategories = async (req, res) => {
    const {_id, name, parentId, type} = req.body;

    const updatedCategories = [];

    if (name instanceof Array) {
        for (let i = 0; i < name.length; i++) {
            const category = {
                name: name[i],
                type: type[i]
            };
            if (parentId[i] !== "") {
                category.parentId = parentId[i];

            }

            const updatedCategory = await Category.findOneAndUpdate({_id: _id[i]}, category, {new: true});
            updatedCategories.push(updatedCategory);
        }
        return res.status(201).json({updatedCategories: updatedCategories});
    } else {
        const category = {
            name,
            type
        }
        if (parentId !== "") {
            category.parentId = parentId;
        }
        const updatedCategory = await Category.findOneAndUpdate({_id}, category, {new: true});

        return res.status(200).json({updatedCategory});

    }

}


exports.deleteCategories = async (req, res) => {

    const {ids} = req.body.payload;
    const deletedCategories = [];
    for (let i = 0; i < ids.length; i++) {
        const deleteCategory = await Category.findOneAndDelete({_id: ids[i]._id});
        deletedCategories.push(deleteCategory);
    }

    if (deletedCategories.length === ids.length) {
        return res.status(200).json({message: "Categories removed"});
    } else {
        res.status(400).json({message: "Something went wrong"});
    }


}