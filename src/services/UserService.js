import RestService from '../services/RestService';

let userExist = (email) => {
    return RestService.getRequest('/user/validate?email=' + email);
}

let getCardsByUser = (email) => {
    return RestService.getRequest('/user/cards?email=' + email)
}

let getSavingsUpdates = (email) => {
    return RestService.getRequest('/user/savings/updated/values?email=' + email);
}

let getSalaryUpdates = (email) => {
    return RestService.getRequest('/user/salary/updated/values?email=' + email);
}

let getFinancialStatus = (email) => {
    return RestService.getRequest('/user/financial/status?email=' + email);
}

let getNextCardsToBePaid = (email) => {
    return RestService.getRequest('/card/next/payments?email=' + email);
}

let updateSavings = (email, updatedAmount, description) => {
    let body = {
        email: email,
        savingsAmountUpdate: updatedAmount,
        description: description
    }
    return RestService.postRequest('/user/update/savings', body);
}

let updateSalary = (email, updatedAmount, description) => {
    let body = {
        email: email,
        salaryAmountUpdate: updatedAmount,
        description: description
    };
    return RestService.postRequest('/user/update/salary', body);
}


export default {
    userExist,
    getCardsByUser,
    getSavingsUpdates,
    getFinancialStatus,
    getNextCardsToBePaid,
    updateSavings,
    updateSalary,
    getSalaryUpdates
}