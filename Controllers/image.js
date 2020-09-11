const Clarifai = require('clarifai');

const app = new Clarifai.App({
    apiKey: 'dc12c0e934f447ad87b6c73f2c313502'
   });

   
const handleApiCall = (req,res) => {
    app.models.predict(Clarifai.FACE_DETECT_MODEL, req.body.input) 
    .then(data => {
        res.json(data);
    })
    .catch(err => res.status(400).json('unable to work with api'))
   }
   
const handleImage= (req,res,db) => {
    const {id} = req.body;
    db('users').where('id', '=', id)
    .increment('entries', 1)
    .returning('entries')
    .then(entries=>{
        res.json(entries[0]);
    })
    .catch(err=>res.status(400).json('error getting entries'))
}

module.exports = {
    handleImage : handleImage,
    handleApiCall : handleApiCall
}