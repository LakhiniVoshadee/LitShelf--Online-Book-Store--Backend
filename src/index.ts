import dotenv from "dotenv";
import app from "./app";
import DBConnection from "./db/DBConnection";

dotenv.config();

const port = process.env.PORT || 3001;

DBConnection().then(result => console.log(result));


app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
})


