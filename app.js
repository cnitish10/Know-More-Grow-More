require('dotenv').config()
const express= require('express')
const methodOverride=require('method-override')
const app=express()
const bodyParser= require('body-parser')
const mongoose=require('mongoose')

mongoose.connect("mongodb://localhost/user_schema",{useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true ,useFindAndModify:false});
app.use(bodyParser.urlencoded({extended:true}))
app.set('view engine','ejs')
app.use(express.static('public'))
app.use(methodOverride("_method"))
const blogSchema=new mongoose.Schema({
    title:String,
    company:String,
    contact:Number,
    body:String,
    created:{type:Date,default:Date.now}

})
const Blog=mongoose.model("Blog",blogSchema);
app.get('/',(req,res)=>{
    res.redirect('/blogs')
    
})

app.get('/blogs',(req,res)=>{
    Blog.find({},(err,blogs)=>{
        if(err)console.log(err)
        else res.render('index',{blogs:blogs})
    })
})
app.get('/blogs/new',(req,res)=>{
    res.render('new')
})
app.post('/blogs',(req,res)=>{
Blog.create( req.body.blog

  ,(err,blog)=>{
if(err)req.render('new')
else res.redirect('/blogs')  
})
})
app.get('/blogs/:id',(req,res)=>{
    Blog.findById(req.params.id,(err,foundBlog)=>{
        if(err)res.redirect('/blogs')
        else res.render('show',{blog:foundBlog})
    })
    
})
app.get('/blogs/:id/edit',(req,res)=>{
    Blog.findById(req.params.id,(err,foundBlog)=>{
        if(err)res.redirect('/blogs')
        else res.render('edit',{blog:foundBlog})
    })
})
app.put('/blogs/:id',(req,res)=>{
    Blog.findByIdAndUpdate(req.params.id,req.body.blog,(err,updatedBlog)=>{
        if(err)res.redirect('/blogs')
        else res.redirect('/blogs/'+req.params.id)
    })
})
app.delete('/blogs/:id',(req,res)=>{
  Blog.findByIdAndDelete(req.params.id,(err)=>{
     res.redirect('/blogs')
  })  
})

const port=process.env.PORT||3000
app.listen(port,()=>{
    console.log('running');
})