
const ACTIVE_LOGGING = true;

export default class ParameterUtils {

    public static DEFAULT_REGEX: string = "href=\"([^\"]*)\"";

    static getRegEx(): RegExp
    {
        return  new RegExp(ParameterUtils.DEFAULT_REGEX, "ig");
        //return new RegExp("(.css)+|(.js)+|(.html)+|(.png)+|(.gif)+(.jpg)+|(.jpeg)+", "g");
    }

}