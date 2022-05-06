import bcrypt from 'bcrypt';
const saltRound = 8;

const hashingPass = async (data, salt = saltRound) => {
    const hashPass = await bcrypt.hash(data,salt)
    return hashPass
}

const compareHash = async (data, hash) => {
    const compare = await bcrypt.compare(data, hash)
    return compare
}

export {
    hashingPass,
    compareHash
}