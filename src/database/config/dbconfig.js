module.exports = {
    dialect: 'mysql',
    host: process.env.MYSQL_HOST,
    port: process.env.MYSQL_LOCAL_PORT,
    username: process.env.MYSQL_USERNAME,
    password: process.env.MYSQL_ROOT_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    timezone: '-03:00',
    define: {
        timestamps: true,
    }
}