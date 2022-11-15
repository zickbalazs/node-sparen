let router = require('express').Router(), ejs = require('ejs');
const cfg = require('../configs').pageData;
let pool = require('mysql').createPool(require('../configs').pool);

router.get('/', (req,res)=>{
    if (req.session.loggedin) res.redirect('/dash');
    else ejs.renderFile('./frontend/views/pages/login/login.ejs', ({pagedata:cfg, pagetitle:'$paren - Login', message:req.session.message}), (err, data) => { if (err) res.status(500).send(err.message); else res.status(200).send(data); });
});
router.get('/register', (req,res)=>{
    if (req.session.loggedin) res.redirect('/dash');
    else ejs.renderFile('./frontend/views/pages/login/register.ejs', ({pagedata:cfg, pagetitle:'$paren - Registration', message:req.session.message}), (err,data)=>{if (err) res.status(500).send(err.message); else res.status(200).send(data) });
});

module.exports = router;