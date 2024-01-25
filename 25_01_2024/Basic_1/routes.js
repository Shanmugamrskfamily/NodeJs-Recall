const express = require('express');
const router = express.Router();
const userController = require('./userController');
const walletController=require('./walletController');

module.exports = ({ port }) => {
 
    router.get('/', (req, res) => {
        res.send(`This is Basic Application created with NodeJS, ExpressJs, Mongoose \n\n The Server is Running On http://localhost:${port}`);
      });  

    //User Routes
  router.post('/create', userController.createUser);
  router.get('/getuser/:userId',userController.getUser);
  router.get('/allusers',userController.getAllUsers);
  router.put('/updateuser/:userId',userController.updateUser);
  router.delete('/deleteuser/:userId',userController.deleteUser);

  //Wallet Routes
  router.post('/addincome/:userId',walletController.addIncome);
  router.post('/addexpense/:userId',walletController.addExpense);
  router.post('/addloan/:userId',walletController.addLoan);
  router.post('/payloan/:userId',walletController.payLoan);
  router.get('/getbalance/:userId',walletController.getBalance);

  return router;
};
