var express = require('express');
var router = express.Router();

/* GET home page. */


module.exports = async (app) => {
   router.get('/', (req, res) => {
     res.send({"msg": "running"})
   })
   return router

}
