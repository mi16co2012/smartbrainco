const handleRegister = (req, res,db, bcrypt)=>{
    const {email,name,password} = req.body;
    const hash = bcrypt.hashSync(password);

    if(!email || !name || !password){
       return res.status(400).json('incorrect form submittion');
    }
  
    db.transaction(trx => {
        trx.insert({
            hash:hash,
            email:email
        })
        .into('login')
        .returning('email')
        .then(loginemail => {
        return trx('users')
        .returning('*')
        .insert({
            email:loginemail[0],
            name:name,
            joined: new Date()
        })

    .   then(users => {
        res.json(users[0]);
        })

        .then(trx.commit)
        .catch(trx.rollback)
        })
        .catch(err =>res.status(400).json('Unable to Register'))
    })
}

module.exports = {
    handleRegister: handleRegister
}