let router = require('express').Router();
let pool = require('mysql').createPool(require('../configs').pool);


router.post('/new-spendings', (req,res)=>{
    console.log(req.body);
    pool.query('insert into spendings values (null, ?, ?, ?, ?)', [req.session.logID, req.body.spendType, req.body.spendAmount, req.body.spendDate], (err, data)=>{
        if (err) res.status(500).send(err.sqlMessage);
        else res.redirect('/dash');
    });
})



module.exports = router;