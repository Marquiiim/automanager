import user from '../models/usermodels.js'
import bcrypt from 'bcryptjs'

async function serviceLogin(signData) {
    const userInfo = await user.findByEmail(signData.email)

    console.log(userInfo)
}

export default serviceLogin