

export const generateVerificationCode = function (){
    const verifyCode= String(Math.floor(100000+Math.random()*90000));
    return verifyCode;
}
