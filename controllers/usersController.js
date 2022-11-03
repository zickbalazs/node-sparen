let router = require('express').Router();
let pool = require('mysql').createPool(require('../configs').pool);
const sha1 = require('sha1');

router.get('/log-out', (req,res)=>{
    req.session.userIsLoggedIn = false;
    res.redirect('/');
})
router.post('/mod-passwd', (req,res)=>{
    let passwdinfo = req.body;
    if (passwdinfo.new1!=passwdinfo.new2) res.redirect('/dash');
    pool.query('select * from users where id=?', [req.session.userID], (err,data)=>{
        if (err) res.status(500).send(err.message);
        else{
            if (sha1(passwdinfo.old) == data[0].passwd){
                pool.query('update users set passwd=? where id=?', [sha1(passwdinfo.new1), req.session.userID], (err)=>{
                    if (err) res.status(500).send(err.message);
                    else res.redirect('/dash');
                });
            }
            else res.redirect('/dash');
        }
    });
})
router.post('/mod-profile', (req,res)=>{
    let updateinfo = req.body;
    if (updateinfo.mail==""||updateinfo.username=="") res.redirect('/dash');
    pool.query('select * from users where uname=? or email=?', [updateinfo.username, updateinfo.mail], (err,data)=>{
        if (data.length>0) res.redirect('/dash');
        else {
            pool.query('update users set mail=?, uname=? where uid=?', [updateinfo.mail, updateinfo.username, req.session.userID], (err)=>{
                if (err) res.status(500).send(err.message);
                else {
                    SetLoginInfo(req.session, {
                        id: req.session.userID,
                        uname: updateinfo.username,
                        email: updateinfo.mail
                    });
                    res.redirect('/dash')
                }
            })
        }
    })
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