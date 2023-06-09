global.failResponse = (code, error = []) => {
    return {
        status: false,
        statusCode: code,
        successMessage: null,
        responseData: null,
        errors: error
    }
}