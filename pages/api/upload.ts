import type { NextApiRequest, NextApiResponse } from 'next'
import * as fs from 'fs';
import aws from "aws-sdk";
import formidable from "formidable"

export const config = {
    api: {
        bodyParser: false,
    }
};

interface FileWithPath extends File {
    path: any
}

interface FileWithName extends File {
    name: string
}

type ProcessedFiles = Array<[string, File]>;

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
        return await saveFile(files.profile);
    });

    const saveFile = async (file: any) => {

        const f = Array.isArray(file) ? file.map((f) => f) : file;

        const params = {
            Bucket: "genius", // The path to the directory you want to upload the object to, starting with your Space name.
            Key: "users/" + f.originalFilename, // Object key, referenced whenever you want to access this file later.
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
                url: data.Location
            });
        });



    };
}

export default handler;