const User = require("../model/UserModel")

const createUser = (newUSer) => {
    return new Promise(asycn (resolve, reject) => {
        const {name, email, password, confirmPassword, phone} = newUSer
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