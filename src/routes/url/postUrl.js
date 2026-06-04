import ShortUrl from "../../model/shortUrl.js";
import { nanoid } from "nanoid";
export default async function (req, res) {
    try {
        let { originalUrl,shortCode } = req.body;
        if (shortCode) {
            const checkIfCodeExists = await ShortUrl.findOne({ shortCode });
            if(checkIfCodeExists){
                return res.status(409).json({
                    success:false,
                    message:"short code still exist"
                })
            }
        }
        let urlValid=URL.canParse(originalUrl);
        if(!urlValid){
            return res.status(400).json({
                success:false,
                message:`${originalUrl} is not a valid url`
            })
        }
        const data = {
            ...req.body,
            shortCode: shortCode ?? nanoid(8),
            owner: req.user._id
        };
        const result = await ShortUrl.create(data);
        const shortUrl = `${process.env.BASEURL}/${result.shortCode}`
        return res.status(201).json({
            success: true,
            message: "resource created",
            shortUrl: shortUrl
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }

}