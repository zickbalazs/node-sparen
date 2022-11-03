require('dotenv').config();
module.exports = {
    port: process.env.PORT,
    pool: {
        host:process.env.DBHOST,
        password:process.env.DBPASS,
        connectionLimit:process.env.DBLIMIT,
        user:process.env.DBUSER,
        database:process.env.DBNAME,
        dateStrings: true
    },
    pageData:{
        name:process.env.PAGENAME,
        creator:process.env.PAGEMKR,
        date:process.env.PAGEDATE
    }
}