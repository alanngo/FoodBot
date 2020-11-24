import Discord from "discord.js"
import MongoClient from 'mongodb'
import load from './filereader.js'


const USERNAME=`food`
const PASSWORD=`bot`
const DB_NAME =`FoodDB`
const COLL_NAME = `food`

const MONGO_URL = `mongodb+srv://${USERNAME}:${PASSWORD}@cluster0.u6lhh.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`
const CLIENT = new Discord.Client()
const PREFIX = `$`

var concat = (arr) => 
{
    arr.shift()
    let str = ""
    arr.forEach(element => str+=element+=' ');
    return str.trim()
}


CLIENT.once(`ready`, () => console.log("food bot is online"))
const OPTIONS =  {useUnifiedTopology: true }

MongoClient.connect(MONGO_URL, OPTIONS).then(client => 
{
    const DB = client.db(DB_NAME)
    const COLLECTION = DB.collection(COLL_NAME)
    console.log("connected to mongodb")

    CLIENT.on('message', message =>
    {
        const BOT = message.channel

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
                    let resturaunt = concat(args)
                    let criteria = 
                    {
                        Name: 
                        {
                            $regex: `${resturaunt}`, 
                            $options: "si"
                        }
                    }
                    COLLECTION.findOne(criteria, (err, res) =>
                    {
                        console.log('inside find')
                        if (err) console.log(err)
                        console.log(res)
                        try 
                        {
                            BOT.send(`${res.Name}: ${res.Price}`)
                        } 
                        catch (error) 
                        {
                            BOT.send(`Error: Cannot find ${args}`)
                        }
                        
                    })
                    console.log('before break')
                    break
                case 'rate':
                    console.log('rate')
                    break
                case '':
                case ' ':
                    console.error("invalid command")
                    break
                default:
                    BOT.send(`https://hbomax-images.warnermediacdn.com/images/GXoZVkwh6YrLCwgEAAACJ/tileburnedin?size=1280x720&format=jpeg&partner=hbomaxcom&productCode=hbomax&host=artist.api.cdn.hbo.com&w=1200`)
                    break
            }
                    
        }
    })
})
.catch(err => console.log(err))


const TOKEN= `` //enter token here
CLIENT.login(TOKEN)