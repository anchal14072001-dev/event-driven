const validator = require("validator");

function validateRegister(req, res, next) {
    const { userName, userEmail, userPassword, userMobileNo } = req.body;

    if (!userName || !/^[A-Za-z\s]{3,50}$/.test(userName)) {
        return res.status(400).json({ message: "Name must be at least 3 letters" });
    }

    if (userEmail.length < 6 || userEmail.length > 100) {
        return res.status(400).json({ message: "Email length must be between 6 and 100 characters" });
    }
    const allowedDomains = ["gmail.com", "yahoo.com", "outlook.com"];
    const emailDomain = userEmail.split("@")[1];
    if (!allowedDomains.includes(emailDomain)) {
        return res.status(400).json({ message: "Email domain is not allowed" });
    }

    if (
        !userPassword ||
        !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/.test(userPassword)
    ) {
        return res.status(400).json({
            message:
                "Password must be at least 6 characters and include uppercase, lowercase, and a number"
        });
    }
    if (!userMobileNo || !/^\d{10}$/.test(userMobileNo)) {
        return res.status(400).json({ message: "Mobile number must be 10 digits" });
    }

    next();
}

function validateLogin(req, res, next) {
    const { userEmail, userPassword } = req.body;

    if (!userEmail || !validator.isEmail(userEmail, { require_tld: true })) {
        return res.status(400).json({ message: "Invalid email format" });
    }

    if (!userPassword) {
        return res.status(400).json({ message: "Password is required" });
    }

    next();
}

module.exports = { validateRegister, validateLogin };
