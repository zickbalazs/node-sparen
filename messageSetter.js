function SetMessage(req, messagetype, messagetext){
    req.session.message = {
        type: messagetype,
        text: messagetext,
        time: new Date(new Date().setDate(new Date().getDate()+1)).toISOString().split('T')[1].split('.')[0]
    }
};

module.exports = { SetMessage }
