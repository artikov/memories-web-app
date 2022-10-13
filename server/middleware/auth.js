import jwt from 'jsonwebtoken'

const SECRET = process.env.JWT_SECRET || 'test'

const auth = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1]
        const isCustomAuth = token.length < 500

        // console.log(token)


        let decodedData

        if (token && isCustomAuth) {
            decodedData = jwt.verify(token, SECRET)

            req.userId = decodedData?.id
        } else {
            decodedData = jwt.decode(token)

            req.userId = decodedData?.sub
        }

        next()
    } catch (error) {
        console.log(error)
    }
}

export default auth