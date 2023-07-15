const express =  require('express');

const cors = require('cors');
const mongoose = require('mongoose');
const User = require('./models/userModel');
const Post = require('./models/PostModel');
const bcrypt = require('bcryptjs');

const app = express();
app.use(cors({credentials:true,origin:'http://localhost:3000'}));
app.use(express.json());
const cookieParser = require('cookie-parser');
app.use(cookieParser());
// password : 5hGHsgJjZU0p6dxK
const salt = bcrypt.genSaltSync(10);
const secret = 'scjb2euhbchin';

const jwt = require('jsonwebtoken');

const multer = require('multer');
const uploadMiddleware = multer({dest:'uploads/'});

const fs = require('fs');

mongoose.connect('mongodb+srv://fakrudeenfazil:5hGHsgJjZU0p6dxK@cluster0.jgh90bh.mongodb.net/?retryWrites=true&w=majority')


app.use('/uploads',express.static(__dirname + '/uploads'));

app.post('/register',async (req,res) =>{
    const {userName,password} = req.body;
    try{
        const userDoc = await User.create({
            userName,
            password:bcrypt.hashSync(password,salt),
        });
        res.json(userDoc);
    }catch(e){
        res.status(400).json(0);
    }
});

app.post('/login',async (req,res) =>{
    const {userName,password} = req.body;
    const userDoc = await User.findOne({userName});
    const passok = bcrypt.compareSync(password,userDoc.password);
    if(passok){
        //logged in
        jwt.sign({userName,id:userDoc._id},secret,{},(err,token) =>{
            if(err) throw err;
            res.cookie('token',token).json({
                id:userDoc._id,
                userName,
            });
        });
    }else{
        res.status(400).json('Wrong Credential');
    }
})

app.get('/profile' ,(req,res) =>{
    const {token} = req.cookies;
    jwt.verify(token,secret,{},(err,info) => {
        if(err) throw err;
        res.json(info);
    });
})

app.post('/logout',(req,res) =>{
    res.cookie('token','').json('ok');
});

app.post('/post' ,uploadMiddleware.single('file'),async (req,res) => {
    const {originalname,path} = req.file;
    const parts = originalname.split('.');
    const ext = parts[parts.length - 1];
    const newPath = path+'.'+ext;
    fs.renameSync(path,newPath);

    const {token} = req.cookies;
    jwt.verify(token,secret,{},async (err,info) => {
        if(err) throw err;
        const {title,summary,content} = req.body;
        const postDoc = await Post.create({
        title,
        summary,
        content,
        cover:newPath,
        author:info.id,
    });

        res.json(postDoc);
    });

    
});

app.get('/post',async (req,res) => {
    res.json(
        await Post.find()
            .populate('author',['userName'])
            .sort({createdAt:-1})
            .limit(20)
    );
})

app.get('/post/:id' ,async(req,res) => {
    const {id} = req.params;
    const postDoc = await Post.findById(id).populate('author',['username']);
    res.json(postDoc);
})

app.listen(5000);