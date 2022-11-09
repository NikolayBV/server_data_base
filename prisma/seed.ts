import {userData} from "./dataBaseUsers";
import {postData} from "./dataBasePosts";
import {commentData} from "./dataBaseComments";
import {PrismaClient} from "@prisma/client";

const prisma = new PrismaClient()

async function main() {
    console.log(`Start seeding ...`)
    await prisma.user.createMany({
        data: userData,
    });
    await prisma.post.createMany({
        data: postData,
    });
    await prisma.comment.createMany({
        data: commentData,
    });
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