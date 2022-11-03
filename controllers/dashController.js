let router = require('express').Router(), ejs = require('ejs');
const cfg = require('../configs').pageData;
let pool = require('mysql').createPool(require('../configs').pool);
const axios = require('axios');

router.get('/', (req,res)=>{
    if (req.session.userIsLoggedIn)
        ejs.renderFile('./frontend/views/pages/dash/dash.ejs', ({pagedata:cfg, pagetitle:'$paren', username:req.session.userName}), (err, data) => { if (err) res.status(500).send(err.message); else res.status(200).send(data); });
    else res.redirect('/');
})
router.get('/upload', (req,res)=>{
    if (req.session.userIsLoggedIn){
        pool.query('select * from spendingtype', (err, data)=>{
            ejs.renderFile('./frontend/views/pages/dash/upload.ejs', ({pagedata:cfg, pagetitle:'$paren - Upload', selectData:data, username:req.session.userName}), (err,data)=>{ if (err) res.status(500).send(err.message); else res.status(200).send(data); });
        })
    }
    else res.redirect('/');
})
router.get('/calendar', async (req,res)=>{
    if (req.session.userIsLoggedIn){
        let dt = await axios.get('http://localhost:8080/api/spendings/get-spendings?id='+req.session.userID);
        ejs.renderFile('./frontend/views/pages/dash/calendar.ejs', ({pagedata:cfg, pagetitle:'$paren - Calendar', spendings:dt.data, username:req.session.userName}), (err,data)=>{ if (err) res.status(500).send(err.message); else res.status(200).send(data); });
    }
    else res.redirect('/');
})
router.get('/summary', async (req,res)=>{
    if (req.session.userIsLoggedIn){
        let dt = await axios.get('http://localhost:8080/api/spendings/get-monthly-spendings?id='+req.session.userID);
        ejs.renderFile('./frontend/views/pages/dash/summary.ejs', ({pagedata:cfg, pagetitle:'$paren - Summary', spendings:dt.data, username:req.session.userName}), (err,data)=>{ if (err) res.status(500).send(err.message); else res.status(200).send(data); });
    }
    else res.redirect('/');
})
router.get('/charts', async (req,res)=>{
    if (req.session.userIsLoggedIn){
        let dt = await axios.get('http://localhost:8080/api/spendings/get-spendings?id='+req.session.userID);
        ejs.renderFile('./frontend/views/pages/dash/charts.ejs', ({pagedata:cfg, pagetitle:'$paren - Charts', username:req.session.userName, spendings:dt.data}), (err,data)=>{ if (err) res.status(500).send(err.message); else res.status(200).send(data); });
    }
    else res.redirect('/');
})
router.get('/table', async (req,res)=>{
    if (req.session.userIsLoggedIn){
        let dt = await axios.get('http://localhost:8080/api/spendings/get-spendings?id='+req.session.userID);
        ejs.renderFile('./frontend/views/pages/dash/table.ejs', ({pagedata:cfg, pagetitle:'$paren - Table', spendings:dt.data.sort((a,b)=>new Date(a.spendDate)-new Date(b.spendDate)), username:req.session.userName}), (err,data)=>{if (err) res.status(500).send(err.message); else res.status(200).send(data)});
    }
    else res.redirect('/');
})
router.get('/mod-profile', (req,res)=>{
    if (req.session.userIsLoggedIn)
        ejs.renderFile('./frontend/views/pages/dash/mod-profile.ejs', ({pagedata:cfg, pagetitle:'$paren - Profile settings', username:req.session.userName}), (err,data)=>{ if (err) res.status(500).send(err.message); else res.status(200).send(data); });
    else res.redirect('/');
})
router.get('/change-passwd', (req,res)=>{
    if (req.session.userIsLoggedIn)
        ejs.renderFile('./frontend/views/pages/dash/mod-passwd.ejs', ({pagedata:cfg, pagetitle:'$paren - Password Change', username:req.session.userName}), (err,data)=>{ if (err) res.status(500).send(err.message); else res.status(200).send(data); });
    else res.redirect('/');
})
module.exports = router;