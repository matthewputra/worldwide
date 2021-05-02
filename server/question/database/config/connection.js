const mongooes=require('mongoose')
// process.env.MONGODB_URL
mongooes.connect('mongodb://mongoContainer:27017/worldwide',{
    useNewUrlParser:true,
    useCreateIndex:true,
    useUnifiedTopology:true,
    useFindAndModify: false 
},()=>{
    console.log('database connected')
})
