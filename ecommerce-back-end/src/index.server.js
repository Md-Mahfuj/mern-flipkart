const express =require('express');
const env =require('dotenv');
const mongoose =require('mongoose');
const path =require('path');
const cors =require('cors');


const app= express();

//routes
const authRoutes =require('./routes/auth');
const adminRoutes =require('./routes/admin/auth');
const categoryRoutes =require("./routes/category");
const productRoutes =require("./routes/product");
const cartRoutes =require("./routes/cart");
const initialDataRoutes =require('./routes/admin/initialData');

//environment variable or you can say constants

env.config()
app.use(cors());
app.use(express.json());
app.use('/public',express.static(path.join(__dirname,'uploads')));
app.use('/api',authRoutes);
app.use('/api',adminRoutes);
app.use('/api',categoryRoutes);
app.use('/api',productRoutes);
app.use('/api',cartRoutes);
app.use('/api',initialDataRoutes);


// database connect

const  connect=async ()=>{
    try{
        const response =await  mongoose.connect(process.env.URL,{
            useUnifiedTopology: true,
            useNewUrlParser: true,
            useFindAndModify:false,
            useCreateIndex:true

        });
        console.log(" Database connection created");

    }catch (error){
        console.log(error);

    }

}
connect()


app.get('/',(req,res)=>{
    res.status(200).json({
        message:"Hello from server "
    });

});
app.post('/data',(req,res)=>{
    res.status(200).json({
        message:req.body
    });

});

app.listen(process.env.PORT,()=>{
    console.log(`server is running on port ${process.env.PORT}`);
})