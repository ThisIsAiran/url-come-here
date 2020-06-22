const mongoose = require('mongoose')
const connectionUrl = process.env.MONGODB_URI
mongoose.connect(connectionUrl,{
	useNewUrlParser:true,
	useCreateIndex:true,
	useFindAndModify:false,
	useUnifiedTopology: true
})