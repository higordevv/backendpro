import express from "express";

import Routes from "./routes";

const app = express();

app.use(express.json());
app.use(Routes);

app.listen(4003, () => console.log("Server is running on PORT 4003"));
