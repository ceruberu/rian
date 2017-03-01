import User from '../models/User';
import Plan from '../models/plan';
import url from 'url';
// import cuid from 'cuid';
// import slug from 'limax';
// import sanitizeHtml from 'sanitize-html';
export function calendarRequest(req,res){
  var parsed = url.parse(req.url, true).query; // true parse queryString
  User.findOne(parsed.user) 
    .populate('plans')
    .exec((err, plans)=>{
      if(err) console.log(err);
      res.json(plans)
    })
}

export function calendarPost(req,res){
  console.log("POST:::", req.body.form)
  var post = new Plan(req.body.form);

  post.save()
    .then(form=>{
      User.findByIdAndUpdate(form._userId,
        {$push: {plans: form._id}},
        ()=>res.json(form))
    })
    .catch(err=>console.log(err))
}
