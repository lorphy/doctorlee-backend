import express from 'express';
import {mongoose} from 'mongoose';
import Answer from './Answer.js';
import Cors from 'cors';
import crypto from 'crypto';

const app= express();
app.use(express.json());
app.use(Cors());


// 微信的登陆部分。 

var AppID = 'wx30b2cee10d0cc93d';
var AppSecret = '7cb468710e5c5b9e498d30807db12397';

app.get('/wx_login', function(req,res, next){
	console.log("oauth - login")
	
	// 第一步：用户同意授权，获取code
	var router = 'get_wx_access_token';
	// 这是编码后的地址
	var return_uri = 'https://doctorlee-backend.onrender.com';  
	var scope = 'snsapi_userinfo';
	
	res.redirect('https://open.weixin.qq.com/connect/oauth2/authorize?appid='+AppID+'&redirect_uri='+return_uri+'&response_type=code&scope='+scope+'&state=STATE#wechat_redirect');
	
});

app.get('/wx', function(req,res, next){
	const data=req.query;
	
	if (data===undefined) res.status(200).send('hello, this is handle view');
	let signature = data.signature;
	let timestamp = data.timestamp;
	let nonce = data.nonce;
    let echostr = data.echostr;
    let token = "for5zhangtest";
    var list = [token, timestamp, nonce];
    list.sort();
    let tmp=list.join('');

    
    const aaa=unescape(encodeURIComponent(tmp));
    const hashcode = crypto.createHash('sha1').update(aaa).digest('hex');
    console.log(hashcode);
	if (hashcode === signature) {res.status(200).send(echostr);}
    else{        
                console.log('微信Token校验失败');
                res.status(200).send({"token":data, "hashcode":hashcode});
    }
});


app.get('/wx_login', function(req,res, next){
	console.log("oauth - login")
	
	// 第一步：用户同意授权，获取code
	var router = 'get_wx_access_token';
	// 这是编码后的地址
	var return_uri = 'https://doctorlee-backend.onrender.com';  
	var scope = 'snsapi_userinfo';
	
	res.redirect('https://open.weixin.qq.com/connect/oauth2/authorize?appid='+AppID+'&redirect_uri='+return_uri+'&response_type=code&scope='+scope+'&state=STATE#wechat_redirect');
	
});

app.get('/get_wx_access_token', function(req,res, next){
	console.log("get_wx_access_token")
	//console.log("code_return: "+req.query.code)
	// 第二步：通过code换取网页授权access_token
	var code = req.query.code;
	request.get(
		{   
			url:'https://api.weixin.qq.com/sns/oauth2/access_token?appid='+AppID+'&secret='+AppSecret+'&code='+code+'&grant_type=authorization_code',
		},
		function(error, response, body){
			if(response.statusCode == 200){
				
				// 第三步：拉取用户信息(需scope为 snsapi_userinfo)
				//console.log(JSON.parse(body));
				var data = JSON.parse(body);
				var access_token = data.access_token;
				var openid = data.openid;
				
				request.get(
					{
						url:'https://api.weixin.qq.com/sns/userinfo?access_token='+access_token+'&openid='+openid+'&lang=zh_CN',
					},
					function(error, response, body){
						if(response.statusCode == 200){
							
							// 第四步：根据获取的用户信息进行对应操作
							var userinfo = JSON.parse(body);
							//console.log(JSON.parse(body));
							console.log('获取微信信息成功！');
							
							// 小测试，实际应用中，可以由此创建一个帐户
							res.send("\
								<h1>"+userinfo.nickname+" 的个人信息</h1>\
								<p><img src='"+userinfo.headimgurl+"' /></p>\
								<p>"+userinfo.city+"，"+userinfo.province+"，"+userinfo.country+"</p>\
							");
							
						}else{
							console.log(response.statusCode);
						}
					}
				);
			}else{
				console.log(response.statusCode);
			}
		}
	);
});

//微信登陆部分


const port = process.env.PORT||8001;

const uri = "mongodb+srv://lina:duuTmfCCz6DvF5pB@cluster0.tyj7k9i.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";



app.get("/",(req,res)=>{
	res.status(200).send("Hello theweb");}
);

async function getOneByName(name){
	try{
		await mongoose.connect(uri);
		let data = await Answer.findOne({"personalInfo.name":name});
		return data;
	}catch(error){
		res.status(500).send(error);
	}
}


app.post('/answer',async (req,res)=>{
	const question=req.body;
	console.log(question);

	try{
		await mongoose.connect(uri);
		const data = await Answer.create(question);
		console.log('created');
		res.status(201).send(data);

	}catch(error){
		if(error){
			console.log(error);
			res.status(500).send(error);
		}else{
			res.status(500).send('something went wrong!');
		}
	}
		
});

app.post('/update_answer',async (req,res)=>{
	const question=req.body;
	console.log(question.personalInfo.name);

	try{
		await mongoose.connect(uri);

		let data = await Answer.replaceOne(
			{"personalInfo.name":question.personalInfo.name},question);
		console.log('updated');
		data = await getOneByName(question.personalInfo.name)
		console.log(data);
		res.status(201).send(question);

	}catch(error){
		if(error){
			console.log(error);
			res.status(500).send(error);
		}else{
			res.status(500).send('something went wrong!');
		}
	}
		
});

app.get('/patients',async (req,res)=>{
	try{
		await mongoose.connect(uri);
		
		const patients = await Answer.find().sort({updated:-1});

		res.status(200).json(patients);
	}catch(error){
		console.log(error);
		res.status(500).send(error);
	}
});

app.listen(port,()=>{console.log(`Listening on localhost:${port}`)});

