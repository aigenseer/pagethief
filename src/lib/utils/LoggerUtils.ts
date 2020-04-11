
const ACTIVE_LOGGING = true;

export default class LoggerUtils {

    static log(...args){
        if(ACTIVE_LOGGING){
            console.log(...args);
        }        
    }

}