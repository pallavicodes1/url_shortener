import ShortUrl from "../../model/shortUrl.js";
import { UAParser } from "ua-parser-js";
import geoip from "geoip-lite";
export default async function (req, res) {
    try {
        const shortCode = req.params.shortCode;
        const url = await ShortUrl.findOneAndUpdate(
            { shortCode },
            { $inc: { totalClicks: 1 } }
        );

        if (url) {

            // let ip = req.ip;

            // const geo = geoip.lookup(ip);
            // console.log(geo)
            res.redirect(302, url.originalUrl);

        }
        else {
            return res.status(404).json({
                success: false,
                message: "Short URL not found"
            });
        }
        // const data=await ShortUrl.findOne({shortCode:req?.params?.shortCode})
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }

}