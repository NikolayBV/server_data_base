import express from 'express';
import { PrismaClient } from '@prisma/client'
import {userData} from "./prisma/dataBase";


const PORT = process.env.PORT || 8080;

const prisma = new PrismaClient();
const app = express();
app.use(express.json());

async function main() {
    console.log(`Start seeding ...`)
    await prisma.user.createMany({
        data: userData,
    })
    console.log(`Seeding finished.`)
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })

app.get('/', async (req, res) => {
    res.send('Hello');
})

app.listen(PORT, () => console.log(`Server started on PORT ${PORT}`));
