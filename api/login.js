const getConnection = require("../db/mysql_pool");

exports.findOneUser = (userId) => {
    const sql = `select * from shin_games_user_table
    where user_id="${userId}"`;
    return getConnection(sql);
};

exports.findLoginUser = (userId, userPw) => {
    const sql = `select * from shin_games_user_table
    where user_id="${userId}" and user_pw="${userPw}"`;
    return getConnection(sql);
};

exports.Login = (req, res) => {
    const { userId, userPw } = req.body;
    this.findLoginUser(userId, userPw).then((result) => {
        if (result === false) {
            res.json({ msg: "fail" });
        } else {
            if (result.length > 0) {
                req.session.userId = result[0].user_id;
                res.json({ msg: "success" });
            } else {
                res.json({ msg: "fail" });
            }
        }
    });
};

exports.Logout = (req, res) => {
    let code = 200;
    if (req.session.userId) {
        req.session.destroy();
        res.json({ msg: "success", code });
    } else {
        res.json({ msg: "fail", msg: "권한이 없습니다.", code });
    }
};

exports.getUserInfo = (req, res) => {
    if (req.session.userId) {
        this.findOneUser(req.session.userId).then((result) => {
            if (!result) {
                res.json({ msg: "fail", code: 200 });
            } else {
                res.json({
                    data: result[0],
                    msg: "success",
                    code: 200,
                });
            }
        });
    } else {
        res.json({ msg: "fail" });
    }
};
