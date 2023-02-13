import RestService from "@/services/RestService";

const findAllPaymentsMade = (email) => {
    return RestService.getRequest("/payments/made?email=" + email);
}

export default {
    findAllPaymentsMade
}