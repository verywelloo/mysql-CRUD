require("dotenv").config();

const express = require("express");
//rest object
const app = express();
const mySqlPool = require("./config/db");

const morgan = require("morgan");
const rateLimiter = require("express-rate-limit");
const helmet = require("helmet");
const xss = require("xss-clean");
const cors = require("cors");

const swaggerUI = require("swagger-ui-express");
const YAML = require("yamljs");
const swaggerDocument = YAML.load("./swagger.yaml");
const fs = require("fs");
const path = require("path");

const studentRouter = require("./routes/studentRoute");

const customCss = fs.readFileSync(
  path.join(__dirname, "SwaggerDark.css"),
  "utf8"
);

app.set("trust proxy");

app.use(
  rateLimiter({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 60, // limit each IP to 60 requests per windowMs
  })
);

app.use(helmet()); // Security headers
app.use(cors()); // Allow cross-origin requests
app.use(xss()); // Prevent XSS attacks

//middleware
app.use(express.json());
app.use(morgan("tiny"));

app.use(
  "/api-docs",
  swaggerUI.serve,
  swaggerUI.setup(swaggerDocument, { customCss })
);

//routes
app.get("/test", (req, res) => {
  res.status(200).send("<h1>Nodejs Mysql APP</h1>");
});

//port
const PORT = process.env.PORT || 3000;

app.use("/api/v1/student", studentRouter);

mySqlPool
  .query("SELECT 1") // check by sending query. if server not connect, we get an error
  .then(() => {
    //MY SQL
    console.log("MySQL DB Connected");

    //listen
    app.listen(PORT, () => {
      console.log(`Server Running on port ${PORT}...`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
