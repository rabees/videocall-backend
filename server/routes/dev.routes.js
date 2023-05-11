// import the controller to use the instantiated model
const DevController = require('../controllers/dev.controller');

module.exports = (app) => {
  app.post('/api/compile', DevController.compileDev)
};
