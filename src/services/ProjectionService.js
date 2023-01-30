import RestService from "@/services/RestService";

const getProjectionByCard = (requestBody) => {
    return RestService.postRequest("/projection/card", requestBody);
}

const getSavingsProjection = (requestBody) => {
    return RestService.postRequest("/projection/savings", requestBody);
}

export default {
    getProjectionByCard,
    getSavingsProjection
}