// import express from 'express'
const express  = require('express');
const userController  = require('../controllers/userController.js');
const dashboardController  = require('../controllers/dashboardController.js');
const ticketController  = require('../controllers/ticketController.js');
// const { login,submitLogin,userList }  = require('../controllers/userController.js');
const router = express.Router()
// import { homeController } from '../controllers/userController.js'

router.get('/',userController.login)
router.post('/login',userController.submitLogin)
router.use((req,res,next) => {
    if(!req.session.data){
      return  res.redirect('/')
        // res.render('index');
    }
    else
    {
        res.locals.userSession = req.session.data;
        next();
    }
});
router.get('/user',userController.userList)
router.post('/addUser',userController.addUser)
router.post('/getUser',userController.getUserList)
router.post('/getUserExport',userController.getUserListExport)
router.post('/editUser',userController.editUser)
router.post('/changeUserPassword',userController.changeUserPassword)
router.post('/get-user-commission',userController.getUserCommission)
router.post('/set-user-commission',userController.setUserCommission)
router.get('/dashboard',dashboardController.dashboard)
router.get('/ticket',ticketController.index)
router.get('/logout',userController.logout)
module.exports = router;
// export router