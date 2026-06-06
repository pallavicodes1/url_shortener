export default async function(req,res) {
    console.log(req.query.search);
    res.send("hey there!");
}