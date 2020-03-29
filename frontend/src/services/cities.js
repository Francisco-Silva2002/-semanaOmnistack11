const axios = require("axios");
const baseURL = "https://servicodados.ibge.gov.br/api/v1";

const location = axios.create({
    baseURL
});

export default location;
