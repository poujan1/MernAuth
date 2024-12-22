export const verificationCodeExpiry= function (){
    const expiryDate= Date.now()+24*60*60*100;
    return expiryDate;
}