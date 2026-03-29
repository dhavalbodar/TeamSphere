const authService = require('./auth.service');

const loginController = (req, res) => {
    // Handle login logic here
    // res.send('Login endpoint');
}

const signupController = async (req, res) => {
    try {
        const result = await authService.signUpService(req.body);
        return res.status(201).json({
            success: true,
            message: "Organization and Organization admin user created successfully",
            data: result
        });
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message || "Signup failed"
        });
    }
}

module.exports = {
    loginController,
    signupController
}