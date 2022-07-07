const mongoose  = require ('mongoose');
/* const excelToJson = require('convert-excel-to-json'); */


process.env.NODE_ENV = process.env.NODE_ENV || "local"; //local
//process.env.NODE_ENV = process.env.NODE_ENV || 'staging'; //staging

const config = require("../config/config.js").get(process.env.NODE_ENV);
const { DB } = config;  
var options = {
  user: DB.UserName,
  pass: DB.Password,
};
const MONGOURI = `mongodb://${DB.HOST}:${DB.PORT}/${DB.DATABASE}`;

const InitiateMongoServer = async () => {
  try {
    await mongoose.connect(MONGOURI/* , options */);
    console.log("Connected to DB !!");
  } catch (e) {
    console.log(e);
    throw e;
  }
};

/* let path = "public/excel/myFile.xlsx"
const workSheetsFromFile = xlsx.parse(path);
let sheet =workSheetsFromFile[0].data;
var obj = _.extend({}, sheet);
console.log(obj);
const result = excelToJson({
  sourceFile: path
});
console.log(result); */

module.exports = InitiateMongoServer;