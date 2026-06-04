import User from "../../model/user.js";
import bcrypt from "bcrypt";
export default async function (req, res) {
    try {
        const { email, password } = req?.body;
        const existingUser = await User.findOne({ email });
        if (!existingUser) {
            return res.status(401).json({
                status:false,
                message: "Invalid credentials"
            });
        } else {
            const match = await bcrypt.compare(password, existingUser.password);
            if (!match) {
                return res.status(401).json({
                    success: false,
                    message: "Wrong Password"
                });
            } else {
                const token = await existingUser.generateAuthToken();
                res.cookie('token', token, {
                    httpOnly: true, secure: false,
                    sameSite: "lax"
                });

                return res.status(200).json({
                    success: true,
                    message: "Logged in Successfully"
                });
            }
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }

}