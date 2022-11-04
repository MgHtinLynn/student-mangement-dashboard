import type { NextApiRequest, NextApiResponse } from 'next'
const nodemailer = require("nodemailer")

const handler = async (req: NextApiRequest, res: NextApiResponse) => {

    let transporter = nodemailer.createTransport({
        host: "smtp.mailtrap.io",
        port: 2525,
        auth: {
            user: process.env.MAILTRAP_USER,
            pass: process.env.MAILTRAP_PASS
        }
    });

    const data = JSON.parse(req.body)

    let info = await transporter.sendMail({
        from: '"Genius 👻" <linzet15@gmail.com>', // sender address
        to: "sales@genius.com, admin@genius.com", // list of receivers
        subject: "Enquiry Email From "+ data.first_name, // Subject line
        html: `<div style="max-width: 56rem; margin-left: auto; margin-right:auto;">
                    <h1>Hi, this is the new enquiry email from customer. Check it out.</h1>
                    <div style="display: flex;justify-content: space-between;font-size: 18px;">
                        <div>
                            <span>First Name</span>
                            <span style="margin-left: 1rem; margin-right:1rem">:</span>
                            <span style="margin-left: 1rem;">${data.first_name}</span>
                        </div>
                    </div>
                    <div style="display: flex;justify-content: space-between;font-size: 18px;">
                        <div>
                            <span>Last Name</span>
                            <span style="margin-left: 1rem; margin-right:1rem">:</span>
                            <span style="margin-left: 1rem;">${data.last_name}</span>
                        </div>
                    </div>
                    <div style="display: flex;justify-content: space-between;font-size: 18px;">
                        <div>
                            <span>Email</span>
                            <span style="margin-left: 1rem; margin-right:1rem">:</span>
                            <span style="margin-left: 1rem;">${data.email}</span>
                        </div>
                    </div>
                    <div style="display: flex;justify-content: space-between;font-size: 18px;">
                        <div>
                            <span>Phone</span>
                            <span style="margin-left: 1rem; margin-right:1rem">:</span>
                            <span style="margin-left: 1rem;">${data.phone}</span>
                        </div>
                    </div>
                    <div style="display: flex;justify-content: space-between;font-size: 18px;">
                        <div>
                            <span>Subject</span>
                            <span style="margin-left: 1rem; margin-right:1rem">:</span>
                            <span style="margin-left: 1rem;">${data.subject}</span>
                        </div>
                    </div>
                    <div style="display: flex;justify-content: space-between;font-size: 18px;">
                        <div>
                            <span>Message</span>
                            <span style="margin-left: 1rem; margin-right:1rem">:</span>
                            <span style="margin-left: 1rem;">${data.message}</span>
                        </div>
                    </div>
                </div>`, // html body
    });

    return res.status(200).json({
        message: 'success'
    });
}

export default handler;