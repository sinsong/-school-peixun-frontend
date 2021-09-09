module.exports = (req, res, next) => {
    if (req.method.toUpperCase() === "POST"
        && req.path === "/login")
    {
        return res.status(200).json({
            message: "ok"
        })
    }
    next()
}