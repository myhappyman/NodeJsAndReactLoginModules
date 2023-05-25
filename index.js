const express = require("express");
const app = express();
const port = process.env.PORT || 3001;

app.listen(port, function () {
    console.log(`server running on ${port}`);
});

app.use("/login/test", function (req, res) {
    res.json({ test: "success" });
});
