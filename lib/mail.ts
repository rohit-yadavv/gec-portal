'use server'
import nodemailer from 'nodemailer'


export async function sendMail({ to, name, subject, body }: any) {

    const SMTP_EMAIL = process.env.SMTP_EMAIL;
    const SMTP_PASSWORD = process.env.SMTP_PASSWORD; 
    const transport = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: SMTP_EMAIL,
            pass: SMTP_PASSWORD
        }
    });

    await new Promise((resolve, reject) => {
        // verify connection configuration
        transport.verify(function (error, success) {
            if (error) {
                console.log(error);
                reject(error);
            } else {
                console.log("Server is ready to take our messages");
                resolve(success);
            }
        });
    });

    
    const mailOptions = {
        from: {
            name,
            // @ts-ignore
            address: SMTP_EMAIL,
        }, to, subject, html: body, 
    };

    await new Promise((resolve, reject) => {
        // send mail
        // @ts-ignore
        transport.sendMail(mailOptions, (err, info) => {
            if (err) {
                console.error(err);
                reject(err);
            } else {
                console.log(info);
                resolve(info);
            }
        });
    });
 
}



