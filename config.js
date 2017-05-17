// config.js
/*
"session: false" item is used to inform Passport that the API won’t manage session
*/
module.exports = {
    jwtSecret: "MyS3cr3tK3Y",
    jwtSession: {
        session: false
    }
};
