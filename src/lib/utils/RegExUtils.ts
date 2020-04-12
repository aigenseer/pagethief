
export default class RegExUtils {

    static getMatchList(source: string, regExp: RegExp): RegExpExecArray[]
    {
        let m: RegExpExecArray;
        let matches             = [];
        do {
            m = regExp.exec(source);
            if (m) {
                matches.push(m);
            }
        } while (m);    
        return matches;
    } 

  
}