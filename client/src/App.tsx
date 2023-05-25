import React from "react";
import { useRecoilValue } from "recoil";
import { loginInfo } from "./atom";
import Login from "./components/login/login";
import MyPage from "./components/login/mypage";

function App() {
    const loginUser = useRecoilValue(loginInfo);
    return (
        <div className="App">{loginUser !== "" ? <MyPage /> : <Login />}</div>
    );
}

export default App;
