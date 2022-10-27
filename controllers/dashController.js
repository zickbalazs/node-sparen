let router = require('express').Router(), ejs = require('ejs');
const cfg = require('../configs').pageData;
let pool = require('mysql').createPool(require('../configs').pool);

router.get('/', (req,res)=>{
    ejs.renderFile('./frontend/views/pages/dash/dash.ejs', ({pagedata:cfg}), (err, data) => { if (err) res.status(500).send(err.message); else res.status(200).send(data); });
})
router.get('/upload', (req,res)=>{
    pool.query('select * from spendingtype', (err, data)=>{
        ejs.renderFile('./frontend/views/pages/dash/upload.ejs', ({pagedata:cfg, selectData:data}), (err,data)=>{ if (err) res.status(500).send(err.message); else res.status(200).send(data); });
    })
})
router.get('/summary', (req,res)=>{
    ejs.renderFile('./frontend/views/pages/dash/summary.ejs', ({pagedata:cfg}), (err,data)=>{ if (err) res.status(500).send(err.message); else res.status(200).send(data); });
})
router.get('/charts', (req,res)=>{
    ejs.renderFile('./frontend/views/pages/dash/charts.ejs', ({pagedata:cfg}), (err,data)=>{ if (err) res.status(500).send(err.message); else res.status(200).send(data); });
})
router.get('/table', (req,res)=>{
    ejs.renderFile('./frontend/views/pages/dash/table.ejs', ({pagedata:cfg}), (err,data)=>{ if (err) res.status(500).send(err.message); else res.status(200).send(data); });
})
router.get('/mod-profile', (req,res)=>{
    ejs.renderFile('./frontend/views/pages/dash/table.ejs', ({pagedata:cfg}), (err,data)=>{ if (err) res.status(500).send(err.message); else res.status(200).send(data); });
})
router.get('/change-passwd', (req,res)=>{
    ejs.renderFile('./frontend/views/pages/dash/table.ejs', ({pagedata:cfg}), (err,data)=>{ if (err) res.status(500).send(err.message); else res.status(200).send(data); });
})
module.exports = router;