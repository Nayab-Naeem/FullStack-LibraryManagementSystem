const apiResponse = (req, res, next) => {

    res.success = (data, message = null) => {
        return res.json({
            success: true,
            message,
            data
        });
    };

    next();
};


module.exports = apiResponse;