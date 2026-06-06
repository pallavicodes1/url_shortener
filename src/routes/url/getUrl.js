import ShortUrl from "../../model/shortUrl.js";

export default async function (req, res) {
    try {
        const shortCode = req.params.shortCode;
        console.log('in getting url for admin');
    
        const url=await ShortUrl.findOne({shortCode:shortCode});
        if (!url) {
            return res.status(404).json({
                success: false,
                message: "Short URL not found"
            });
        }
        res.status(200).json({
            success:true,
            message:"Url found",
            originalUrl:`${process.env.BASEURL}${url.shortCode}`
        })

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
}