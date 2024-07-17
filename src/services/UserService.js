const User = require("../models/UserModel")
const bcrypt = require("bcrypt")
const { genneralAccessToken, genneralRefreshToken } = require("./JwtService")

const createUser = (newUser) => {
    return new Promise(async (resolve, reject) => {
        const {name, email, password, confirmPassword, phone} = newUser
        try {
            const checkUser = await User.findOne({
                email:email
            })
            if (checkUser !== null){
                resolve({
                    status: 'OK',
                    message: 'the email had already'
                })
            }
            const hash = bcrypt.hashSync(password, 10)
            console.log('hash', hash)
            const createdUser = await User.create ({
                name, 
                email, 
                password : hash, 
                phone
            })
            if(createdUser){
                resolve({
                    status: 'ok',
                    message: 'SUCCESS',
                    data: createdUser
                })
            }
        } catch(e) {
            reject(e)
        }
    })
}

const loginUser = (userLogin) => {
    return new Promise(async (resolve, reject) => {
        const {name, email, password, confirmPassword, phone} = userLogin
        try {
            const checkUser = await User.findOne({
                email:email
            })
            if (checkUser === null){
                resolve({
                    status: 'OK',
                    message: 'the user is not defined'
                })
            }
            const comparePassword = bcrypt.compareSync(password, checkUser.password)
            if (!comparePassword){
                resolve({
                    status: 'OK',
                    message: 'the pass or user is incorrect'
                })
            }
            const access_token = await genneralAccessToken({
                id: checkUser.id,
                isAdmin: checkUser.isAdmin
            })

            const refresh_token = await genneralRefreshToken({
                id: checkUser.id,
                isAdmin: checkUser.isAdmin
            })

            resolve({
                status: 'ok',
                message: 'SUCCESS',
                access_token,
                refresh_token
            })
        } catch(e) {
            reject(e)
        }
    })
}


module.exports = {
    createUser,
    loginUser
}