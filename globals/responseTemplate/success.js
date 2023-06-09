global.successResponse = (code, data, message = '') => {
    return {
        status: true,
        statusCode: code,
        successMessage: message,
        responseData: data,
        errors: []
    }
}