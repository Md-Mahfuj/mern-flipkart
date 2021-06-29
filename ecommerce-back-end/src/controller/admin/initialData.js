const Category = require('../../models/category');
const Product = require('../../models/product');


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

exports.initialData = async (req, res) => {
    const categories = await Category.find({}).exec();
    const products = await Product.find({})
                                  .select('_id name price quantity slug description  productPictures  category ')
                                  .populate({path:'category',select:'_id name'})
                                   .exec();

    res.status(200).json({
        categories:createCategories(categories),
        products
    })

}


