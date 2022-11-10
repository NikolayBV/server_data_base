import express from 'express';
import { PrismaClient } from '@prisma/client'
import {userData} from "./prisma/dataBaseUsers";
import {postData} from "./prisma/dataBasePosts";
import {commentData} from "./prisma/dataBaseComments";


const PORT = process.env.PORT || 8080;

const prisma = new PrismaClient();
const app = express();
app.use(express.json());

app.get('/', async (req, res) => {
    const posts = await prisma.post.findMany()
    res.send(posts);
});

app.get('/posts', async (req, res) => {
    if(req.body.page === '1'){
        const {page, limit} = req.body;
        const posts = await prisma.post.findMany({take: +limit});
        const postsId = posts.map(item => item.id);
        const comments = await prisma.comment.findMany({where: {id: {in: postsId}}});
        const count = await prisma.post.findMany();
        res.send({posts, comments, count: count.length});
    }
    else{
        const limit = req.body.limit;
        const page = req.body.page + '0';
        const posts = await prisma.post.findMany({skip: +page - +limit, take: +limit});
        const postsId = posts.map(item => item.id);
        const comments = await prisma.comment.findMany({where: {id: {in: postsId}}});
        const count = await prisma.post.findMany();
        res.json({posts, comments, count: count.length});
    }
});

app.get('/posts/:id', async (req, res) => {
    const param = req.params.id;
    const post = await prisma.post.findMany({where: {id: Number(param)}});
    const comments = await prisma.comment.findMany({where: {postId: Number(param)}});
    res.json({post, comments});
});

app.post('/posts/:id', async (req, res) => {
    const {title, body, author} = req.body;
    const user = await prisma.user.findMany({where: {name: author}})
    const userId = user.map(item => item.id);
    const post = await prisma.post.create({
        data: {
            userId: userId[0],
            title,
            body,
        }
    })
     res.json(post);
});
app.put('/posts/:id', async (req, res) => {
    const {id, title, body} = req.body;
    const post = await prisma.post.update({where: {id}, data: {title, body}});
    res.json(post);
});

app.delete('/posts/:id', async (req, res) => {
    const param = req.params.id;
    const post = await prisma.post.delete({where: {id: Number(param)}});
    const comments = await prisma.comment.deleteMany({where: {postId: Number(param)}});
    res.json({post, comments});
});

app.get('/users', async (req, res) => {
    const users = await prisma.user.findMany()
    res.send(users);
});


app.listen(PORT, () => console.log(`Server started on PORT ${PORT}`));
