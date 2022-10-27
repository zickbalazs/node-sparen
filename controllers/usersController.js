let router = require('express').Router();
let pool = require('mysql').createPool(require('../configs').pool);
const { response } = require('express');
const sha1 = require('sha1');

router.get('/log-out', (req,res)=>{
    req.session.userIsLoggedIn = false;
    res.redirect('/');
})
router.post('/register', (req,res)=>{
    let registerInfo = {
        email: req.body.email,
        name: req.body.username,
        passwd: req.body.passwd,
        passwd2: req.body.passwd2,
        passwdIsEqual: req.body.passwd==req.body.passwd2
    }
    if (registerInfo.email==''||registerInfo.name==''||registerInfo.passwd==''||registerInfo==''){
        res.redirect('/');
    }
    else{
        pool.query('select * from users where email=?', [registerInfo.email], (err,data)=>{
            if (err) res.status(500).send(err.sqlMessage);
            if (data.length==0){
                if (registerInfo.passwdIsEqual) {
                    pool.query('insert into users values (null, ?, ?, ?, current_timestamp, 0)', [registerInfo.name, registerInfo.email, sha1(registerInfo.passwd)], (err)=>{
                        if (err) res.status(500).send(err.sqlMessage);
                        else res.redirect('/');
                    })
                }
                else res.redirect('/')
            }
        })
    }
    console.log(registerInfo);
})
router.post('/login', (req,res)=>{
    let loginInfo = {
        email: req.body.email,
        passwd: sha1(req.body.passwd)
    };
    if (loginInfo.email == undefined || loginInfo.passwd == undefined) res.redirect('/')
    else{
        pool.query('select * from users where passwd=? and email=?', [loginInfo.passwd, loginInfo.email], (err,data)=>{
            if (err) res.status(500).send(err.sqlMessage);
            else {
                if (data.length==1) {
                    if (data[0].isBanned==1){
                        res.redirect('/');
                    }
                    else{
                        SetLoginInfo(req.session, data[0]);
                        console.log(req.session)
                        res.redirect('/dash');
                    }
                }
                else res.redirect('/');
            }
        } )
    }
})





function SetLoginInfo(sesh, user) {
    sesh.userID = user.id;
    sesh.userIsLoggedIn = true;
    sesh.userName = user.uname;
    sesh.userEmail = user.email;
}
module.exports = router;