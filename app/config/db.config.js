require('dotenv').config();
module.exports = {
  url: `mongodb://${process.env.HOST_DB}:${process.env.PORT_DB}/${process.env.NAME_DB}`
};
