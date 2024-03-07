import bcrypt from "bcryptjs";
 
export const hashPassword = async (password: string) => {
    const saltRounds = 10;
    return bcrypt.hash(password, saltRounds);
};


export const comparePassword = async (password: any, hashedPassword: any) => {
    return bcrypt.compare(password, hashedPassword);
};
 