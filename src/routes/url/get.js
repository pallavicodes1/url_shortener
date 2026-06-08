import ShortUrl from "../../model/shortUrl.js";
import { UAParser } from "ua-parser-js";
import geoip from "geoip-lite";
import Analytics from "../../model/analytics.js";
import countries from "i18n-iso-countries";
import en from "i18n-iso-countries/langs/en.json" with { type: "json" };


const RESERVED = new Set(['favicon.ico', 'robots.txt', 'sitemap.xml', 'apple-touch-icon.png']);

export default async function (req, res) {
    try {
        countries.registerLocale(en);
        const shortCode = req.params.shortCode;
        // Block reserved browser auto-requests
        if (RESERVED.has(shortCode)) {
            return res.status(204).end();
        }

        // Block Chrome prefetch/prerender
        const purpose = req.headers['purpose'] || req.headers['sec-purpose'] || '';
        const fetchDest = req.headers['sec-fetch-dest'] || '';
        if (purpose.includes('prefetch') || purpose.includes('prerender')) {
            return res.status(204).end();
        }
        if (fetchDest && fetchDest !== 'document') {
            return res.status(204).end();
        }
        if (RESERVED.has(shortCode)) {
            return res.status(404).end();
        }

        const url = await ShortUrl.findOneAndUpdate(
            { shortCode },
            { $inc: { totalClicks: 1 } },
            { returnDocument: 'before' } // return original doc before update
        );
        if (!url) {
            return res.status(404).json({
                success: false,
                message: "Short URL not found"
            });
        }
        res.redirect(302, url.originalUrl);

        // Analytics in background — after response is sent
        setImmediate(async () => {
            try {
                let ip = req.ip;
                if (ip === "::1" || ip === "127.0.0.1") ip = "8.8.8.8";

                const parser = new UAParser(req.headers['user-agent']);
                const result = parser.getResult();
                const geo = geoip.lookup(ip);

                const countryCode = geo?.country || "Unknown";
                const countryName =
                    countries.getName(countryCode, "en") || "Unknown";

                await Analytics.create({
                    urlId: url._id,
                    countryCode: countryCode,
                    country:countryName,
                    browser: result.browser.name,
                    os: result.os.name,
                    device: result.device.type || 'desktop',
                    clickedAt: Date.now()
                });
            } catch (err) {
                console.error("Analytics error:", err);
            }
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
}