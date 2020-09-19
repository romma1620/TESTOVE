const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const errorHandler = require('../../error/errorHandler');
const User = require('../../models/User');
const {JWT} = require('../../config/keys');

module.exports = {
    login: async (req, res) => {
        const candidate = await User.findOne({email: req.body.email});

        if (candidate){
        //    check password
            const passwordResult = bcrypt.compareSync(req.body.password, candidate.password);
            if (passwordResult){
            //    generate token
                const token = jwt.sign({
                    email: candidate.email,
                    userId: candidate._id
                }, JWT , {expiresIn: 60 * 60});
                res.status(200).json({
                    token: `Bearer ${token}`
                })

            }else {
                res.status(401).json({
                    message: 'Invalid user, try again!'
                })
            }

        }else {
        //    user is not exist. handle error
            res.status(404).json({
                message: 'User is not exist'
            })

        }


    },

    register: async (req, res) => {
        // user exist
        const candidate = await User.findOne({email: req.body.email});

        if (candidate){
        //    if user exist send error
            res.status(409).json({
                message: 'User with this email exist! Try another email please.'
            });
        }else {
        //    create user
            const salt = bcrypt.genSaltSync(10);
            const password = req.body.password;
            const user = new User({
                email: req.body.email,
                password: bcrypt.hashSync(password, salt),
                name: req.body.name,
                surname: req.body.surname
            });

            try {
                await user.save();
                res.status(201).json(user)
            }catch (e) {
                errorHandler(res, e)

            }
        }



    }
};
