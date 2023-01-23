import RestService from '../services/RestService';

let userExist = (email) => {
    return RestService.getRequest('/user/validate?email=' + email);
}

let getCardsByUser = (email) => {
    return RestService.getRequest('/user/cards?email=' + email)
}


export default {
    userExist,
    getCardsByUser
}