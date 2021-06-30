
const Page =require('../../models/page');


//
// exports.createPage =(req,res)=>{
//     const {banners,products}=req.files;
//
//     if(banners.length > 0){
//         req.body.banners = banners.map((banner,index)=>({
//             img:`${process.env.API}/public/${banner.filename}`,
//             navigateTo:`/bannerClicked?categoryId=${req.body.category}&type=${req.body.type}`
//         }));
//     }
//     if(products.length > 0){
//        req.body.products = products.map((product,index)=>({
//             img:`${process.env.API}/public/${product.filename}`,
//             navigateTo:`/productClicked?categoryId=${req.body.category}&type=${req.body.type}`
//         }));
//     }
//
//     req.body.created=req.user._id;
//
//     const page =new Page(req.body);
//     page.save((error,page)=>{
//
//         if(error){
//            return  res.status(400).json({error});
//         }
//         if(page){
//             return res.status(201).json({page});
//
//         }
//
//     })
//
//     // res.status(200).json({body:req.body});
//
// }
//




exports.createPage = (req, res) => {
    const { banners, products } = req.files;
    if (banners && banners.length > 0) {
        req.body.banners = banners.map((banner, index) => ({
            img: `/public/${banner.filename}`,
            navigateTo: `/bannerClicked?categoryId=${req.body.category}&type=${req.body.type}`,
        }));
    }
    if (products && products.length > 0) {
        req.body.products = products.map((product, index) => ({
            img: `/public/${product.filename}`,
            navigateTo: `/productClicked?categoryId=${req.body.category}&type=${req.body.type}`,
        }));
    }

    req.body.createdBy = req.user._id;

    Page.findOne({ category: req.body.category }).exec((error, page) => {
        if (error) return res.status(400).json({ error });
        if (page) {
            Page.findOneAndUpdate({ category: req.body.category }, req.body).exec(
                (error, updatedPage) => {
                    if (error) return res.status(400).json({ error });
                    if (updatedPage) {
                        return res.status(201).json({ page: updatedPage });
                    }
                }
            );
        } else {
            const page = new Page(req.body);

            page.save((error, page) => {
                if (error) return res.status(400).json({ error });
                if (page) {
                    return res.status(201).json({ page });
                }
            });
        }
    });
};






