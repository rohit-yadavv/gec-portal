'use server'
import nodemailer from 'nodemailer'


export async function sendMail({ to, name, subject, body, recipients }: any) {

    const SMTP_EMAIL = process.env.SMTP_EMAIL;
    const SMTP_PASSWORD = process.env.SMTP_PASSWORD; 
    const transport = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: SMTP_EMAIL,
            pass: SMTP_PASSWORD
        }
    });
    try {
        // to create verify transport 
        await transport.verify();
    } catch (error) {
        console.log(error)
    }
    try {
        const mailOptions = {
            from: {
                name,
                // @ts-ignore
                address: SMTP_EMAIL,
            }, to, subject, html: body, 
        };

        // to send mail 
        // @ts-ignore
        transport.sendMail(mailOptions)
    } catch (error) {
        console.log(error)
    }
}



