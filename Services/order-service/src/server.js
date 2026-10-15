const app = require("./app");
const PORT = process.env.PORT || 4002;
app.listen(PORT, () => console.log(`Order Service running on ${PORT}`));
