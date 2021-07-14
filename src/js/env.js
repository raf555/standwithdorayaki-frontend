const env = process.env;

module.exports = {
    API_URL: env.NODE_ENV === "production" ? env.API_URL_PRODUCTION : env.API_URL_DEVELOPMENT
}
