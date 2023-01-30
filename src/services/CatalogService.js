import RestService from '@/services/RestService';

let getFixedExpensesByUser = (email) => {
    return RestService.getRequest("/catalog/fixedExpenses?email=" + email);
}

export default {
    getFixedExpensesByUser
}