const mysql = require("mysql2/promise");

require("dotenv").config();

const config = {
    host: process.env.host,
    user: process.env.user,
    password: process.env.password,
    database: process.env.database,
};

//mysql connection pool 생성
let pool = mysql.createPool(config);

/**
 * 1. 생성한 커넥션 풀을 통해 비동기로 쿼리를 던짐
 * 2. 응답이 오면 리소스 제거
 * 3. 조회된 결과값 리턴
 * @param {*} query
 * @returns array || boolean
 */
async function getConnection(query) {
    try {
        const connect = await pool.getConnection(async (conn) => conn);
        try {
            const [rows] = await connect.query(query);
            connect.release();
            return rows;
        } catch (err) {
            console.log("Error", err);
            connect.release();
            return false;
        }
    } catch (err) {
        console.log("DB Error");
        return false;
    }
}

module.exports = getConnection;
