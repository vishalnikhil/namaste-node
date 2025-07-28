const validator = require('validator');

// Signup validation
const validateSignUpData = (req) => {
    const { firstName, lastName, emailId, password } = req.body;

    if (!firstName || !lastName) {
        throw new Error("name is not valid");
    } else if (!validator.isEmail(emailId)) {
        throw new Error("please enter a valid email");
    } else if (!validator.isStrongPassword(password)) {
        throw new Error("please enter a strong password");
    }
};

// Edit Profile validation
const validateEditprofileData = (req) => {
    const allowedEdit = ["firstName", "lastName", "emailId","gender", "about", "skills", "age","photoUrl"];

    const isEditAllowed = Object.keys(req.body).every((field) => {
        return allowedEdit.includes(field);
    });

    if (!isEditAllowed) {
        throw new Error("YOU CAN'T EDIT THIS");
    }

    // Convert age string to number if present
    if (req.body.age) {
        req.body.age = parseInt(req.body.age);
    }
};

module.exports = {
    validateSignUpData,
    validateEditprofileData
};
