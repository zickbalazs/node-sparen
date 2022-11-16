function SetMessage(req, messagetype, messagetext){
    req.session.message = {
        type: messagetype,
        text: messagetext,
        time: new Date(new Date().setHours(new Date().getHours()+((new Date().getTimezoneOffset()/60)*-1))).toISOString().split('T')[1].split('.')[0]
    }
};

module.exports = { SetMessage }
