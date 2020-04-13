export default class StringUtils {
    
    static getHash(s: string){
        let hash = 0;
        for (let i = 0; i < s.length; i++) {
          let chr   = s.charCodeAt(i);
          hash  = ((hash << 5) - hash) + chr;
          hash |= 0; 
        }
        return hash;
    }

    static getHashString(s: string){
        return StringUtils.getHash(s).toString();
    }

}