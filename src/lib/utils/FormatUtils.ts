export default class FormatUtils {

    static getDataURLFromBlob(blob): Promise<string>
    {
        return new Promise((resolve, reject)=>{
            let reader = new FileReader();
            reader.onload = function() {
              let dataUrl = reader.result as string;
              let base64  = dataUrl.split(',')[1];
              resolve(base64);
            };
            reader.readAsDataURL(blob);
        });        
    }

    static getBlobFromDataURL(dataURL: string): Promise<Blob>
    {
        return new Promise((resolve, reject)=>{
            let byteString = atob(dataURL.split(',')[1]);
            let mimeString = dataURL.split(',')[0].split(':')[1].split(';')[0];

            var ab = new ArrayBuffer(byteString.length);
            var ia = new Uint8Array(ab);
            for (var i = 0; i < byteString.length; i++) {
                ia[i] = byteString.charCodeAt(i);
            }

            var blob = new Blob([ia], {type: mimeString});
            resolve(blob)
        });        
    }

    static getBlobFromBase64(base64: string): Promise<Blob>
    {
        return fetch(base64).then(res => res.blob())
    }

}