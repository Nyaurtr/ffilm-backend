const jwt = require('jsonwebtoken')
const dotenv = require('dotenv');
const { refreshTokenService } = require('./UserService');
dotenv.config()

const genneralAccessToken = async (payload) => {
    const access_token = jwt.sign({
        payload
    }, process.env.ACCESS_TOKEN, {expiresIn: '30s'})
    return access_token
}

const genneralRefreshToken = async (token) => {
    const refresh_token = jwt.sign({
        payload
    }, process.env.REFRESH_TOKEN, {expiresIn: '365d'})
    return refresh_token
}

const refreshTokenJwtService = async (token) => {
    return new Promise(async (resolve, reject) => {
        try {
            console.log('token', token)
            jwt.verify(token, process.env.REFRESH_TOKEN, (err, user) =>{
                if(err) {
                    resolve({
                        status: 'ERROR',
                        message: 'The authemtication'
                    })
                }
                console.log('user', user)
            })
            resolve({
                status: 'ok',
                message: 'SUCCESS'
            })
        } catch(e) {
            reject(e)
        }
    })
}

module.exports = {
    genneralAccessToken,
    genneralRefreshToken,
    refreshTokenJwtService
}