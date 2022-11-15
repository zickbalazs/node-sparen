let router = require('express').Router();
let pool = require('mysql').createPool(require('../configs').pool);
let msg = require('../messageSetter');
const sha1 = require('sha1');

router.get('/log-out', (req,res)=>{
    req.session.userIsLoggedIn = false;
    res.redirect('/');
})
router.post('/mod-passwd', (req,res)=>{
    let passwdinfo = req.body;
    if (passwdinfo.new1!=passwdinfo.new2) {
        msg.SetMessage(req, 'alert', "Passwords don't message!");
        res.redirect('/dash');
    }
    pool.query('select * from users where id=?', [req.session.userID], (err,data)=>{
        if (err) res.status(500).send(err.message);
        else{
            if (sha1(passwdinfo.old) == data[0].passwd){
                pool.query('update users set passwd=? where id=?', [sha1(passwdinfo.new1), req.session.userID], (err)=>{
                    if (err) res.status(500).send(err.message);
                    else {
                        msg.SetMessage(req, 'success', 'Successful password modification');
                        res.redirect('/dash');
                    }
                });
            }
            else {
                msg.SetMessage(req, 'alert', 'Old password is incorrect!');
                res.redirect('/dash');
            }
        }
    });
})
router.post('/mod-profile', (req,res)=>{
    let updateinfo = req.body;
    console.log(updateinfo);
    if (updateinfo.email==""||updateinfo.name=="") res.redirect('/dash');
    pool.query('select * from users where uname=? or email=?', [updateinfo.name, updateinfo.email], (err,data)=>{
        if (data.length>0) {
            msg.SetMessage(req, 'alert', 'This email is already used!');
            res.redirect('/dash');
        }
        else {
            pool.query('update users set email=?, uname=? where id=?', [updateinfo.email, updateinfo.name, req.session.userID], (err)=>{
                if (err) res.status(500).send(err.message);
                else {
                    SetLoginInfo(req.session, {
                        id: req.session.userID,
                        uname: updateinfo.name,
                        email: updateinfo.email
                    });
                    msg.SetMessage(req, 'success', 'Successful profile modification!');
                    res.redirect('/dash');
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
        msg.SetMessage(req, 'alert', 'Empty fields!');
        res.redirect('/register');
    }
    else{
        pool.query('select * from users where email=?', [registerInfo.email], (err,data)=>{
            if (err) res.status(500).send(err.sqlMessage);
            if (data.length==0){
                if (registerInfo.passwdIsEqual) {
                    pool.query('insert into users values (null, ?, ?, ?, current_timestamp, 0)', [registerInfo.name, registerInfo.email, sha1(registerInfo.passwd)], (err)=>{
                        if (err) res.status(500).send(err.sqlMessage);
                        else {
                            msg.SetMessage(req, 'success', 'Successful registration!');
                            res.redirect('/');
                        }
                    })
                }
                else {
                    msg.SetMessage(req, 'alert', '')
                    res.redirect('/')
                }

            }
            else{
                msg.SetMessage(req, 'alert', 'There is a registration already with this e-mail address!');
                res.redirect('/register');
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
                        msg.SetMessage(req,'danger', 'This user is banned!');
                        res.redirect('/');
                    }
                    else{
                        SetLoginInfo(req.session, data[0]);
                        msg.SetMessage(req,'success', 'Successful login!');
                        res.redirect('/dash');
                    }
                }
                else {
                    msg.SetMessage(req,'primary', 'Unsuccessful login!');
                    res.redirect('/');
                }
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