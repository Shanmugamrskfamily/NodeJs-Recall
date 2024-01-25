const express = require('express');
const router = express.Router();
const userController = require('./userController');

module.exports = ({ port }) => {
  router.post('/create', userController.createUser);
  router.get('/', (req, res) => {
    res.send(`Your Server is Running on Port: ${port}`);
  });
  router.get('/getuser/:userId',userController.getUser);
  router.get('/allusers',userController.getAllUsers);
  router.put('/updateuser/:userId',userController.updateUser);
  router.delete('/deleteuser/:userId',userController.deleteUser);
  return router;
};
