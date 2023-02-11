import RestService from '../services/RestService';

let addMultiDebt = (email, cardNickname, debts) => {
    let body = {
        "cardNickname": cardNickname,
        "email": email,
        "debtData": debts
    }

    return RestService.postRequest('/debt/multi/add', body);
}

let getDebtsByCard = (email, cardNickname) => {
    return RestService.getRequest("/debt/all/card/" + cardNickname + "?email=" + email);
}

let getDebtsByUser = (email) => {
    return RestService.getRequest("/debt/all/user?email=" + email);
}

let getFinishedDebts = (email) => {
    return RestService.getRequest("/debt/finished/all/user?email=" + email);
}

let getDebtAboutFinish = (email) => {
    return RestService.getRequest("/debt/about/finish?email=" + email);
}

export default {
    addMultiDebt,
    getDebtsByCard,
    getDebtsByUser,
    getFinishedDebts,
    getDebtAboutFinish
}