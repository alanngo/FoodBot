import Discord from "discord.js"
import MongoClient from 'mongodb'

const USERNAME=`food`
const PASSWORD=`bot`
const DB_NAME =`FoodDB`
const COLL_NAME = `food`

const MONGO_URL = `mongodb+srv://${USERNAME}:${PASSWORD}@cluster0.u6lhh.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`
const CLIENT = new Discord.Client()
const PREFIX = `$`


CLIENT.once(`ready`, () => console.log("food bot is online"))
const OPTIONS =  {useUnifiedTopology: true }

MongoClient.connect(MONGO_URL, OPTIONS).then(client => 
{
    const DB = client.db(DB_NAME)
    const COLLECTION = DB.collection(COLL_NAME)
    console.log("connected to mongodb")

    CLIENT.on('message', message =>
    {
        if (!message.content.startsWith(PREFIX))
        {
            console.log(`Usage: ${PREFIX}<command>`)
            console.log(`bot: ${message.content}`)
        } 

        else
        {
            let args = message.content.slice(PREFIX.length).split(/ +/)
            let command = args[0]
            console.log(command)
            console.log(args)
            switch (command)
            {
                case 'price':
                    let resturaunt = args[1]
                    let criteria = 
                    {
                        Name: resturaunt
                    }
                    COLLECTION.findOne(criteria, (err, res) =>
                    {
                        console.log('inside find')
                        if (err) console.log(err)
                        console.log(res)
                        message.channel.send(`${res.Name}: ${res.Price}`)
                    })
                    console.log('before break')
                    break
                case 'rate':
                    console.log('rate')
                    break
                case ' ':
                    console.error("invalid command")
                    break
                default:
                    message.channel.send(`https://hbomax-images.warnermediacdn.com/images/GXoZVkwh6YrLCwgEAAACJ/tileburnedin?size=1280x720&format=jpeg&partner=hbomaxcom&productCode=hbomax&host=artist.api.cdn.hbo.com&w=1200`)
                    break
            }
                    
        }
    })
})


const TOKEN=`ENTER TOKEN HERE`
CLIENT.login(TOKEN)