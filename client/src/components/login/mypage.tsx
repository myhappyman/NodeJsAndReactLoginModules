import { useRecoilState } from "recoil";
import { loginInfo } from "../../atom";
import { useEffect, useState } from "react";

export default function MyPage() {
    const [loginUser, setLoginUser] = useRecoilState(loginInfo);
    const [userEmail, setUserEmail] = useState("");

    const logout = () => {
        fetch("/login/logout")
            .then((res) => res.json())
            .then((res) => {
                console.log(res);
                setLoginUser("");
            });
    };

    useEffect(() => {
        fetch("/login/getUserInfo")
            .then((res) => res.json())
            .then((res) => {
                const { user_email } = res.data;
                setUserEmail(user_email);
            });
    }, []);
    return (
        <div>
            <h2>My Page!</h2>
            <div>
                <label htmlFor="">접속한 아이디</label>
                <div>{loginUser}</div>
            </div>
            <div>
                <label htmlFor="">이메일</label>
                <div>{userEmail}</div>
            </div>
            <div>
                <button onClick={logout}>로그아웃</button>
            </div>
        </div>
    );
}
