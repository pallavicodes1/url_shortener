import Analytics from "../../model/analytics.js";
import ShortUrl from "../../model/shortUrl.js";

export default async function (req, res) {
    const country = req.query.country;
    const checkIfUrlExists=await ShortUrl.findOne({shortCode:req.params.shortCode});
    if(!checkIfUrlExists)
{
    return res.status(404).json({
        success:false,
        message:"Url not found"
    })
}

    const result = await Analytics.aggregate([
        {
            $match:{
                urlId:checkIfUrlExists._id
            }
        },
        {
            $group: {
                _id: '$country',
                visits: { $sum: 1 }
            }
        }
    ]);
    console.log(result);
    res.send(result);
}