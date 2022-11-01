const e = require('express');

let router = require('express').Router();
let pool = require('mysql').createPool(require('../configs').pool);


router.post('/new-spendings', (req,res)=>{
    console.log(req.body);
    let userData = req.body;
    if (userData.spendDate==''||userData.spendType==''||userData.spendAmount=='') res.redirect('/dash/upload');
    if (userData.spendType=='-1') res.redirect('/dash/upload')
    else{
        pool.query('insert into spendings values (null, ?, ?, ?, ?)', [req.session.userID, req.body.spendType, req.body.spendAmount, req.body.spendDate], (err, data)=>{
            if (err) res.status(500).send(err.sqlMessage);
            else res.redirect('/dash');
        });
    }
})
router.get('/get-spendings', (req,res)=>{
    pool.query('select * from spendings inner join spendingtype on spendingtype.id=spendings.type where uid=?', [req.query.id], (err,data)=>{
        if (err) res.status(200).send(err.sqlMessage);
        res.status(200).send(data)
    })
})
router.get('/get-monthly-spendings', (req,res)=>{
        pool.query('select * from spendings inner join spendingtype on spendingtype.id=spendings.type where uid=? and MONTH(spendDate)=MONTH(CURRENT_TIMESTAMP) and YEAR(spendDate)=YEAR(CURRENT_TIMESTAMP)', [req.query.id], (err, data)=>{
            if (err) res.status(500).send(err.sqlMessage)
            res.status(200).send(data);
        })
})

module.exports = router;