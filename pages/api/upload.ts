import type { NextApiRequest, NextApiResponse } from 'next'
import * as fs from 'fs'
import aws from "aws-sdk"
import formidable from "formidable"
import { now } from "moment"

export const config = {
    api: {
        bodyParser: false,
    }
};

const s3 = new aws.S3({
    endpoint: "sgp1.digitaloceanspaces.com",
    accessKeyId: String(process.env.SPACES_KEY),
    secretAccessKey: String(process.env.SPACES_SECRET)
});


const handler = async (req: NextApiRequest, res: NextApiResponse) => {

    if (req.method !== 'POST') {
        return res.status(405).json({message: 'Method Not Allowed'})
    }


    const form = formidable({});

    //
    form.parse(req, async function (err, fields, files) {
        if (files.profile) {
            return await saveFile(files.profile);
        } else if(files.examResult) {
            return await saveExamResult(files.examResult);
        }   else if(files.certificates) {
            return await saveCertificates(files.certificates);
        }   else if(files.transcripts) {
            return await saveTranscripts(files.transcripts);
        }
    });

    const saveFile = async (file: any) => {

        const f = Array.isArray(file) ? file.map((f) => f) : file;
        const fileName = now().valueOf()
        const params = {
            Bucket: "genius", // The path to the directory you want to upload the object to, starting with your Space name.
            Key: "users/" + fileName + '.' + f.originalFilename.split('.').pop(), // Object key, referenced whenever you want to access this file later.
            Body: fs.readFileSync(f.filepath), // The object's contents. This variable is an object, not a string.
            ACL: "public-read", // Defines ACL permissions, such as private or public.
            Metadata: { // Defines metadata tags.
                "Content-Type": f.mimetype,
                "Content-Encoding": 'gzip',
                "x-amz-acl": 'public-read'
            }
        };

        //console.log('params', params)

        s3.upload(params).send((err, data) => {
            if (err) {
                console.log('err', err);
                return res.status(500).json({url: ''});
            }
            return res.status(200).json({
                url: data.Location,
                fileName: f.originalFilename
            });
        });



    };

    const saveExamResult = async (file: any) => {

        const f = Array.isArray(file) ? file.map((f) => f) : file;
        const fileName = now().valueOf()
        const params = {
            Bucket: "genius", // The path to the directory you want to upload the object to, starting with your Space name.
            Key: "examResults/" + fileName + '.' + f.originalFilename.split('.').pop(), // Object key, referenced whenever you want to access this file later.
            Body: fs.readFileSync(f.filepath), // The object's contents. This variable is an object, not a string.
            ACL: "public-read", // Defines ACL permissions, such as private or public.
            Metadata: { // Defines metadata tags.
                "Content-Type": f.mimetype,
                "Content-Encoding": 'gzip',
                "x-amz-acl": 'public-read'
            }
        };

        //console.log('params', params)

        s3.upload(params).send((err, data) => {
            if (err) {
                console.log('err', err);
                return res.status(500).json({url: ''});
            }
            return res.status(200).json({
                url: data.Location,
                fileName: f.originalFilename
            });
        });



    };

    const saveCertificates = async (file: any) => {

        const f = Array.isArray(file) ? file.map((f) => f) : file;
        const fileName = now().valueOf()
        const params = {
            Bucket: "genius", // The path to the directory you want to upload the object to, starting with your Space name.
            Key: "certificates/" + fileName + '.' + f.originalFilename.split('.').pop(), // Object key, referenced whenever you want to access this file later.
            Body: fs.readFileSync(f.filepath), // The object's contents. This variable is an object, not a string.
            ACL: "public-read", // Defines ACL permissions, such as private or public.
            Metadata: { // Defines metadata tags.
                "Content-Type": f.mimetype,
                "Content-Encoding": 'gzip',
                "x-amz-acl": 'public-read'
            }
        };

        //console.log('params', params)

        s3.upload(params).send((err, data) => {
            if (err) {
                console.log('err', err);
                return res.status(500).json({url: ''});
            }
            return res.status(200).json({
                url: data.Location,
                fileName: f.originalFilename
            });
        });



    };

    const saveTranscripts = async (file: any) => {

        const f = Array.isArray(file) ? file.map((f) => f) : file;
        const fileName = now().valueOf()
        const params = {
            Bucket: "genius", // The path to the directory you want to upload the object to, starting with your Space name.
            Key: "transcripts/" + fileName + '.' + f.originalFilename.split('.').pop(), // Object key, referenced whenever you want to access this file later.
            Body: fs.readFileSync(f.filepath), // The object's contents. This variable is an object, not a string.
            ACL: "public-read", // Defines ACL permissions, such as private or public.
            Metadata: { // Defines metadata tags.
                "Content-Type": f.mimetype,
                "Content-Encoding": 'gzip',
                "x-amz-acl": 'public-read'
            }
        };

        //console.log('params', params)

        s3.upload(params).send((err, data) => {
            if (err) {
                console.log('err', err);
                return res.status(500).json({url: ''});
            }
            return res.status(200).json({
                url: data.Location,
                fileName: f.originalFilename
            });
        });



    };
}

export default handler;