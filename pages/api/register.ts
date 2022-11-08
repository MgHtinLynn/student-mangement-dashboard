import type { NextApiRequest, NextApiResponse } from 'next'
const CryptoJS = require("crypto-js");
const nodemailer = require("nodemailer")

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    const secret = process.env.SECRET
    let transporter = nodemailer.createTransport({
        host: "smtp.mailtrap.io",
        port: 2525,
        auth: {
            user: process.env.MAILTRAP_USER,
            pass: process.env.MAILTRAP_PASS
        }
    });

    const data = JSON.parse(req.body)

    const encryptKey = CryptoJS.AES.encrypt(data.email, secret).toString();

    await transporter.sendMail({
        from: '"Genius 👻" <linzet15@gmail.com>', // sender address
        to: data.email, // list of receivers
        subject: "Confirmation Email - "+ data.name, // Subject line
        html: `<div style="max-width: 56rem; margin-left: auto; margin-right:auto;">
                    <h1>Hi, this is register email from genius student management.</h1>
                    <p>Check Email Verify to click below button</p>
                    <p>Email - ${data.email}</p>
                    <p>Temp Password - ${data.password}</p>
                    <a href="${req.headers.origin}/changePassword?token=${encryptKey}" style="background-color: rgb(34 211 238);padding: 0.5rem 1rem;color: white;font-weight: 500;font-size:1rem;">Verify Account</a>
                </div>`, // html body
    });

    return res.status(200).json({
        message: 'success'
    });
}

export default handler;