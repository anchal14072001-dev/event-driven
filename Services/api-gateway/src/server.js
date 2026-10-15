const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");
const auth = require("./middlewares/auth.middleware");
// require("dotenv").config();


const app = express();

app.use("/users", createProxyMiddleware({ target: "http://localhost:4001", changeOrigin: true }));
app.use("/orders", auth, createProxyMiddleware({ target: "http://localhost:4002", changeOrigin: true }));

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`API Gateway running on ${PORT}`));
