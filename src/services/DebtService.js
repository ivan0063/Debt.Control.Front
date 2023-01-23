import RestService from '../services/RestService';

let addMultiDebt = (email, cardNickname, debts) => {
    let body = {
        "cardNickname": cardNickname,
        "email": email,
        "debtData": debts
    }

    return RestService.postRequest('/debt/multi/add', body);
}


export default {
    addMultiDebt
}