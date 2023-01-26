import RestService from "@/services/RestService";

const doCardPayment = (email, cardNickname) => {
    return RestService.getRequest("/debt/all/card/" + cardNickname + "?email=" + email);
}


export default {
    doCardPayment
}