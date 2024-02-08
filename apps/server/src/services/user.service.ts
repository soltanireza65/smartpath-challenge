import prisma from "@/utils/prisma";

export class UserService {
    public static async findUsers() {
        const user = await prisma.user.findMany();
        return user;
    }
}
