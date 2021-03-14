const isProduction = process.env.NODE_ENV === 'production';

module.exports = {
    env: {
        contentApi: 'labs.cdn.content.amplience.net'
        //default: labs.cdn.content.amplience.net
        //mine: machathon2.cdn.content.amplience.net
    },
    poweredByHeader: false
}