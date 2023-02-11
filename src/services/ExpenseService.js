import RestService from "@/services/RestService";

const nextFixedExpenses = (email) => {
    return RestService.getRequest("/expsense/next?email=" + email);
}

export default {
    nextFixedExpenses
}