let router = require('express').Router(), ejs = require('ejs');
const cfg = require('../configs').pageData;
let pool = require('mysql').createPool(require('../configs').pool);
const axios = require('axios');

router.get('/', (req,res)=>{
    ejs.renderFile('./frontend/views/pages/dash/dash.ejs', ({pagedata:cfg, username:req.session.userName}), (err, data) => { if (err) res.status(500).send(err.message); else res.status(200).send(data); });
})
router.get('/upload', (req,res)=>{
    pool.query('select * from spendingtype', (err, data)=>{
        ejs.renderFile('./frontend/views/pages/dash/upload.ejs', ({pagedata:cfg, selectData:data, username:req.session.userName}), (err,data)=>{ if (err) res.status(500).send(err.message); else res.status(200).send(data); });
    })
})
router.get('/summary', async (req,res)=>{
    let dt = await axios.get('http://localhost:8080/api/spendings/get-monthly-spendings?id='+req.session.userID);
    ejs.renderFile('./frontend/views/pages/dash/summary.ejs', ({pagedata:cfg, spendings:dt.data, username:req.session.userName}), (err,data)=>{ if (err) res.status(500).send(err.message); else res.status(200).send(data); });
})
router.get('/charts', async (req,res)=>{
    let dt = await axios.get('http://localhost:8080/api/spendings/get-spendings?id='+req.session.userID);
    ejs.renderFile('./frontend/views/pages/dash/charts.ejs', ({pagedata:cfg, username:req.session.userName, spendings:dt.data}), (err,data)=>{ if (err) res.status(500).send(err.message); else res.status(200).send(data); });
})
router.get('/table', async (req,res)=>{
    let dt = await axios.get('http://localhost:8080/api/spendings/get-spendings?id='+req.session.userID);
    console.log(dt.data)
    ejs.renderFile('./frontend/views/pages/dash/table.ejs', ({pagedata:cfg, spendings:dt.data.sort((a,b)=>new Date(a.spendDate)-new Date(b.spendDate)), username:req.session.userName}), (err,data)=>{if (err) res.status(500).send(err.message); else res.status(200).send(data)});
})
router.get('/mod-profile', (req,res)=>{
    ejs.renderFile('./frontend/views/pages/dash/table.ejs', ({pagedata:cfg, username:req.session.userName}), (err,data)=>{ if (err) res.status(500).send(err.message); else res.status(200).send(data); });
})
router.get('/change-passwd', (req,res)=>{
    ejs.renderFile('./frontend/views/pages/dash/table.ejs', ({pagedata:cfg, username:req.session.userName}), (err,data)=>{ if (err) res.status(500).send(err.message); else res.status(200).send(data); });
})
module.exports = router;