
const ACTIVE_LOGGING = true;

export default class LoggerUtils {

    static log(...args){
        if(ACTIVE_LOGGING){
            console.log(...args);
        }        
    }

    static warn(...args){
        if(ACTIVE_LOGGING){
            console.warn(...args);
        }        
    }

    static error(error: string, throwError = false){
        if(ACTIVE_LOGGING){
            console.error(error);
            if(throwError){
                throw error;
            }
        }
    }

}