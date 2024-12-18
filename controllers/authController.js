const AuthService = require('../services/authService')
const Signup = async (req, res) => {

    const payload = req.body; // firstName, lastName, password, email

    const signupResponse = await AuthService.Signup({
        firstName: payload.firstName,
        lastName: payload.lastName,
        email: payload.email,
        password: payload.password,
    })

    res.status(signupResponse.code).json(signupResponse)
}

const Login = async (req, res) => {

    const payload = req.body;

    const loginResponse = await AuthService.Login({
        email: payload.email,
        password: payload.password,
    })

    res.status(loginResponse.code).json(loginResponse)
}

module.exports = {
    Signup,
    Login
}