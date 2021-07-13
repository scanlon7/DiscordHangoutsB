const levelingSystemSchema = require('./models/levelingSystemSchema');
const mongo = require('./mongo');
require ('dotenv').config()
const UserSettingsSchema = require('./models/userSettingsSchema');

module.exports = (client) => {
    client.on('messageCreate', message => {
        if(message.content.startsWith(process.env.prefix) || message.author.bot) return
        const { guild, member } = message



        addXp(guild.id, member.id, 10, message)
    });
};


const getNeededXp = level => level * level * 100

const addXp = async (guildID, userID, xpToAdd, message) => {
    if(message.content.startsWith(process.env.prefix) || message.author.bot) return
    const { guild, member } = message

    const noXP = UserSettingsSchema.findOne({_id: member.id})
    if(noXP) return;
    else {
    await mongo().then(async (mongoose) => {
        try {
            const result = await levelingSystemSchema.findOneAndUpdate({
                serverID: guildID,
                userID
            }, {
                serverID: guildID,
                userID,
                $inc: {
                    xp: xpToAdd,
                },
            }, {
                upsert: true,
                new: true
            });
            let { xp, level } = result
            const needed = getNeededXp(level)
    
            if (xp >= needed) {
                ++level
                xp -= needed
    
                message.reply(`⚡ [LEVELUP] Congrats, you're now at **level ${level}**!`)
    
                await levelingSystemSchema.updateOne({
                    serverID: guildID,
                    userID,
                },
                {
                    level,
                    xp,
                });
            }
        } catch (error) {
            console.log(error)
        }
    })
    }

}

module.exports.addXp = addXp
