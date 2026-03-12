async function middlewareLogin(req, res, next) {
    const { email, password, type } = req.body.signData

    console.log(email, password, type)
    res.status(200).json({success: true, message: 'TESTE'})
}

module.exports = {
    middlewareLogin
}