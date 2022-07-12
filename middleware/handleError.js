const ErrorResponse  = require('../utils/ErrorResponse')
const handleError = async (err, req, res, next)=>{
    let error = {...err}
    error.message = err.message
    if(err.code === 110000){
        const message = 'Duplicate Field Value Entered'
        error = new ErrorResponse(message, 400)
    }
    if(err.name === 'CastError') {
        const message = 'Resource Not Found'
        error = new ErrorResponse(message, 404)
    }
    if(err.name === 'ValidationError') {
        const message = Object.values(err.errors).map(error=> error.message).join(',')
        error = new ErrorResponse(message, 400)
    }
    res.status(error.statusCode || 500).json({
        success: false,
        error: error.message || 'Server Error'
    })
}
module.exports = handleError;