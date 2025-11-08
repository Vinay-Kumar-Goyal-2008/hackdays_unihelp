const express=require('express')
const axios=require('axios')
const mongoose=require('mongoose')
const studmodel=require('./studentschema')
const session=require('express-session')
let app=express()
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({
  secret: 'yourSecretKey',
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 1000 * 60 * 60 }
}));

app.use(express.static('introduction'))
app.use(express.static('loginpage'))
depts=['academic-ece','academic-cse','academic-se','academic-it','academic-me','academic-mce','academic-ee','academic-ep','hostel','finance','student-affairs','healthcentre']
academic_ece=[]
academic_cse=[]
academic_se=[]
academic_it=[]
academic_me=[]
academic_mce=[]
academic_ee=[]
academic_ep=[]
hostel=[]
finance=[]
student_affairs=[]
healthcentre=[]

async function databaseconnection() {
    
await mongoose.connect('mongodb://localhost:27017/unihelpdata')
}

function auth(req,res,next){
    if (req.session){
        next();
    }
    else{
        res.sendFile(__dirname+'/loginpage/index.html')
    }

}
databaseconnection()


app.get('/',(req,res)=>{
    res.sendFile(__dirname+'/introduction/index.html')
})
app.get('/login',(req,res)=>{
    res.sendFile(__dirname+'/loginpage/index.html')
})
app.post('/logincredintialscheck',async (req,res)=>{
    let userid=req.body.userid
    let password=req.body.password
    let student= await studmodel.findOne({userid:userid,password:password})
    if (student){
        req.session.user=userid
        req.session.password=password
        req.session.save()
        res.redirect('/dashboard')
    }else{
        res.redirect('/login')
    }
})

app.post('/getcomplaintslist',async (req,res)=>{
    let userid=req.session.user
    let password=req.session.password
    let student= await studmodel.findOne({userid:userid,password:password})
    if (student){
        let complaints=student.complaints
        res.json(complaints)
    }else{
        res.json({status:404})
    }
})

app.post('/submit-query',auth,async (req,res)=>{
    query=req.body.query
    const response = await axios.post("http://127.0.0.1:5000/querydeptprocess", { query })
    let complaintid=Math.ceil(Math.random()*99999)
    let resup=await studmodel.updateOne({userid:req.session.user},{
        $push:{
            complaints:{
                complaintid:complaintid,
                title:query,
                department:response.data.reply,
                status:'Pending',
                remarks:`The compaint has been forwarded into the ${response.data.reply} department`
            }
        }
    })
    answer=response.data.reply
    if (answer=='academic-ece'){
        academic_ece.push(query)
    }else if (answer=='academic-cse'){
        academic_cse.push(query)
    }else if (answer=='academic-it'){
        academic_it.push(query)
    }else if (answer=='academic-se'){
        academic_se.push(query)
    }else if (answer=='academic-mce'){
        academic_mce.push(query)
    }else if (answer=='academic-ee'){
        academic_ee.push(query)
    }else if (answer=='academic-ece'){
        academic_ece.push(query)
    }else if (answer=='academic-me'){
        academic_me.push(query)
    }else if (answer=='academic-ep'){
        academic_ep.push(query)
    }else if (answer=='hostel'){
        hostel.push(query)
    }else if (answer=='finance'){
        finance.push(query)
    }else if (answer=='student-affairs'){
        student_affairs.push(query)
    }else{
        healthcentre.push(query)
    }
    if (resup){
        res.json({status:200})
    }else{
        res.json({status:404})
    }
    
})

app.get('/dashboard',auth,(req,res)=>{
    app.use(express.static('dashboard'))
    res.sendFile(__dirname+'/dashboard/index.html')
})
app.listen(9000)