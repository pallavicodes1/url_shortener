import User from "../../model/user.js";
export default async function (req, res) {
    try {
        const {email,password}=req?.body;
        console.log(email,password);
        const checkIfUserExist = await User.findOne({ email:email });
        if (checkIfUserExist) {
            return res.status(409).json({
                status:false,
                message:"User already exists"   
            })
        }
        const data = new User(req?.body);
        await data.save();
        return res.status(201).json({
            success: true,
            message: "User created"
        });
    } catch (error) {
        console.log(error);
        
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });

    }

}