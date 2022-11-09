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
    res.send(postData);
})

app.listen(PORT, () => console.log(`Server started on PORT ${PORT}`));
