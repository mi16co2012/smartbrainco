const handleSignin = (db, bcrypt) => (req,res) =>{
    const {email, password} = req.body;
    if(!email|| !password){
        return res.status(400).json('incorrect form submittion');
     }

    db.select('email','hash').from('login')
    .where('email', '=',email)
    .then(data =>{
        const isValid = bcrypt.compareSync(password, data[0].hash);
        if (isValid){
            return db.select('*').from('users')
            .where('email', '=', req.body.email)
            .then(users => {
                res.json(users[0])
            })
            .catch(err => res.status(400).json('unable to get user'))
        }
    })
         .catch(err => res.status(400).json('wrong credentials'))
    
}
module.exports = {
    handleSignin: handleSignin
}