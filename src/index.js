const express = require('express')
const ejs = require('ejs')
const path = require('path')
const app = express()
const bodyParser = require('body-parser')
const port = process.env.PORT || 3500
const urlencodedParser = bodyParser.urlencoded({extended : false })
const partialsPath = path.join(__dirname, '../templates/partials')
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const randomString = require("randomstring")
const urlShortener = require('./models/urlShortner.js')


app.use(express.static(publicDirectoryPath))
app.set('view engine', 'ejs');
app.set('views',viewsPath);

require('./db/mongoose.js')


app.get('/', async (req, res)=>{
	try{
		const urlData = await urlShortener.find({})
		res.render("home",{urlData:urlData})		
	}
	catch(e)
	{
		res.send(e)
	}
})

app.post('/saveUrl',urlencodedParser, async (req, res)=>{
	try{
		let string = randomString.generate(7);
		const urlData = new urlShortener({
			"name":string,
			"link":req.body.url
		})
		await urlData.save()
		res.redirect("/")
	}
	catch(e){
		res.send(e)
	}
})

app.get('/url/:tag', urlencodedParser, async (req, res)=>{
	console.log(req.params.tag)
	const urlData = await urlShortener.findOne({'name':req.params.tag})
	res.redirect(urlData.link)
})

app.use(express.json())

app.listen(port, ()=>{
	console.log("Server is on port " + port)
})
