const User = require("../models/UserModel")

const createUser = (newUser) => {
    return new Promise(asycn (resolve, reject) => {
        const {name, email, password, confirmPassword, phone} = newUser
        try {
            const createUser = await User.create ({
                name, 
                email, 
                password, 
                confirmPassword, 
                phone
            })
            if(createUser){
                resolve({
                    status: 'ok',
                    message: 'SUCCESS',
                    data: createUser
                })
            }
        } catch(e) {
            reject(e)
        }
    })
}

module.exports = {
    createUser
}