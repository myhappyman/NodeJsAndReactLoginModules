import { useState, useEffect } from "react";
import { useSetRecoilState } from "recoil";
import { loginInfo } from "../../atom";

export default function Login() {
    const [userId, setUserId] = useState("");
    const [userPw, setUserPw] = useState("");
    const setLoginInfo = useSetRecoilState(loginInfo);

    const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.name === "userId") {
            setUserId(e.target.value);
        } else if (e.target.name === "userPw") {
            setUserPw(e.target.value);
        }
    };

    const goLogin = () => {
        const data = {
            userId: userId,
            userPw: userPw,
        };
        fetch("/login/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application / json",
            },
            body: JSON.stringify(data),
        })
            .then((res) => res.json())
            .then((data) => {
                const { msg } = data;
                if (msg === "success") {
                    setLoginInfo(userId);
                }
            })
            .catch((err) => console.log(err));
    };

    useEffect(() => {
        fetch("/login/getUserInfo")
            .then((res) => res.json())
            .then((res) => {
                const { msg, data } = res;
                if (msg === "success" && data?.user_id) {
                    setLoginInfo(data?.user_id);
                }
            });
    }, [setLoginInfo]);

    return (
        <div>
            <h2>Login Test</h2>
            <div>
                <label htmlFor="">아이디</label>
                <input
                    type="text"
                    name="userId"
                    value={userId}
                    onChange={handleInput}
                />
            </div>
            <div>
                <label htmlFor="">비밀번호</label>
                <input
                    type="password"
                    name="userPw"
                    value={userPw}
                    onChange={handleInput}
                />
            </div>
            <div>
                <button type="button" onClick={goLogin}>
                    로그인
                </button>
            </div>
        </div>
    );
}
