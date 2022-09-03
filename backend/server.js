const app = require("./app");
const dotenv = require("dotenv");
const connectDatabase = require("./config/Database");



// Handling uncaught Exception

process.on("uncaughtException", (err) => {
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down the server for Handling uncaught Exception`);
    server.close(() =>{
        process.exit(1)
    })
})

// config
dotenv.config({
  path: "backend/config/.env",
});

// Connect Database
connectDatabase();

// Creat Server

const server = app.listen(process.env.PORT, () => {
  console.log(`Server running at http://localhost:${process.env.PORT}`);
});



// Unhandled promise rejection
process.on("unhandledRejection", (err) => {
  console.log(`Shutting down server for ${err.message}`);
  console.log(`Shutting down the server due to Unhandled promise rejection`);
  server.close(() => {
    process.exit(1);
  });
});
