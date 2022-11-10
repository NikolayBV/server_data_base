import {Router} from "express";
import { PrismaClient } from '@prisma/client'


const prisma = new PrismaClient();
const router = Router();

router.get('/', async (req, res) => {
    const posts = await prisma.post.findMany()
    res.send(posts);
});

router.get('/posts', async (req, res) => {
    if(req.query.page === '1'){
        const {page, limit} = req.query;
        const posts = await prisma.post.findMany({take: +limit!});
        const postsId = posts.map(item => item.id);
        const comments = await prisma.comment.findMany({where: {id: {in: postsId}}});
        const count = await prisma.post.findMany();
        res.send({posts, comments, count: count.length});
    }
    else{
        const limit = req.query.limit;
        const page = req.query.page + '0';
        const posts = await prisma.post.findMany({skip: +page - +limit!, take: +limit!});
        const postsId = posts.map(item => item.id);
        const comments = await prisma.comment.findMany({where: {id: {in: postsId}}});
        const count = await prisma.post.findMany();
        res.send({posts, comments, count: count.length});
    }
});

router.get('/posts/:id', async (req, res) => {
    const param = req.params.id;
    const post = await prisma.post.findMany({where: {id: Number(param)}});
    //const comments = await prisma.comment.findMany({where: {postId: Number(param)}});
    res.send(post[0]);
});

router.post('/posts', async (req, res) => {
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
    res.send(post);
});
router.put('/posts/:id', async (req, res) => {
    const {id, title, body} = req.body;
    const post = await prisma.post.update({where: {id}, data: {title, body}});
    res.send(post);
});

router.delete('/posts/:id', async (req, res) => {
    const param = req.params.id;
    const post = await prisma.post.delete({where: {id: Number(param)}});
    const comments = await prisma.comment.deleteMany({where: {postId: Number(param)}});
    res.send({post, comments});
});

router.get('/users', async (req, res) => {
    const users = await prisma.user.findMany()
    res.send(users);
});

export default router;