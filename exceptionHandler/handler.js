const ErrorStackParser = require('error-stack-parser')
const ENOENT = require('./ENOENT')

process.on('uncaughtException', (error) => {
    // const errors = {
    //     'ENOENT': -4058 // no file or directory
    // }
   const customError = (ErrorStackParser.parse(error)[0].source.split(':'))
    const errorCode = customError[1].trim();
    
    switch(errorCode){
        case 'ENOENT': {
            let path = customError[3].split('\\')
            if([...path].at(-1).split('.').length > 1){
                path = path.slice(0, -1)
            }
            ENOENT(path.join('/'))
            break
        }
        default: {
            console.log("DEFAULT EXCEPTION HANDLER BLOCK =>", error)
        }
    }

    // Terminate the process
    // process.exit(1);
});