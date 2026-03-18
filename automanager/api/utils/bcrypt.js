import bcrypt from 'bcryptjs'

export async function compare(password, hash_password) {
    return await bcrypt.compare(password, hash_password)
}