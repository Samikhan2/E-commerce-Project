const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');

const User = require('../model/user');

// @route POST api/users/sign-up
// @desc Create new user/vendor
// @access Public

router.post('/sign-up', [
    check('FirstName').not().isEmpty(),
    check('LastName').not().isEmpty(),
    check('UserName').not().isEmpty(),
    check('Phone').not().isEmpty(),
    check('Email').not().isEmpty(),
    check('Password').not().isEmpty(),
], async (req, res) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
        return res.status(400).json({ errors: result.array() });
    }

    const { FirstName, LastName, UserName, Phone, Email, Password, Address, role } = req.body;

    try {
        let user = await User.findOne({ Email });

        if (user) {
            return res.status(400).json({ msg: 'User already exists' });
        }

        user = new User({
            FirstName,
            LastName,
            UserName,
            Phone,
            Email,
            Password,
            Address,
            role,
        });

        // Hash the password before saving to the database
        const salt = await bcrypt.genSalt(10);
        user.Password = await bcrypt.hash(Password, salt);

        await user.save();

        // Create and return a JWT token for the newly created user
        const payload = {
            user: {
                id: user.id,
            },
        };

        jwt.sign(
            payload,
            process.env.JWTSECRET, // Replace with your actual secret key
            { expiresIn: 3600 }, // Token expires in 1 hour, adjust as needed
            (err, token) => {
                if (err) throw err;
                res.json({ token });
            }
        );
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
