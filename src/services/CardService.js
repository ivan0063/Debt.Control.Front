import RestService from "@/services/RestService";

const doCardPayment = (email, cardNickname) => {
    return RestService.getRequest("/card/doPayment/" + cardNickname + "?email=" + email);
}


export default {
    doCardPayment
}