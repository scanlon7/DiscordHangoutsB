//const ms = require('ms');

module.exports = {
    name: 'hack',
    description: 'Hack\'s the user!',
    usage: '<user>',
    cooldown: 30,
    premium: true,
    async execute(message, args, cmd, client, Discord) {

        var ips = [
            '10.313.523.502.00.1',
            '25.537.753.462.29.2',
            '21.175.866.974.07.08',
            '32.653.587.825.35.5',
            '12.172.764.781.22.8',
            '91.723.242.452.09.3',
            '92.743.116.896.85.6',
            '84.091.000.853.54.7',
            '51.071.124.129.12.0',
            '82.382.013.271.30.1',
            '69.696.969.696.96.9',
            '66.666.666.666.66.6',
            '32.938.923.392.73.8'
        ]
        var IPrandom = ips[Math.floor(Math.random() * ips.length)];

        if (!args[0]) return message.channel.send('Who are you going to hack???')
        const HackedPerson = args.slice(0).join(" ") && args.shift().toLowerCase()

        let msg = await message.channel.send(`Hacking ${HackedPerson}...`)
        let time = 3 * 1000
        setTimeout(function () {
            msg.edit(`[▖] Finding discord gmail ${HackedPerson}... `)
        }, time)
        time += 3 * 1000
        setTimeout(function () {
            msg.edit(`[▘] Gmail: ${HackedPerson}@gmail.com`)
        }, time)
        time += 3 * 1000
        setTimeout(function () {
            msg.edit(`[▝] Getting user password...`)
        }, time)
        time += 3 * 1000
        setTimeout(function () {
            msg.edit(`[▗] Password: \`\`\`*********\`\`\``)
        }, time)
        time += 3 * 1000
        setTimeout(function () {
            msg.edit(`[▖] Getting account access...`)
        }, time)
        time += 3 * 1000
        setTimeout(function () {
            msg.edit(`[▘] Collecting data...  `)
        }, time)
        time += 3 * 1000
        setTimeout(function () {
            msg.edit(`[▝] Hacking all accounts linked to ${HackedPerson}@gmail.com....`)
        }, time)
        time += 3 * 1000
        setTimeout(function () {
            msg.edit(`[▗] Finding IP Address...`)
        }, time)
        time += 3 * 1000
        setTimeout(function () {
            msg.edit(`[▖] Ip: ${IPrandom}`)
        }, time)
        time += 3 * 1000
        setTimeout(function () {
            msg.edit(`[▘] Information collected...`)
        }, time)
        time += 3 * 1000
        setTimeout(function () {
            msg.edit(`[▝] Downloading virus  `)
        }, time)
        time += 3 * 1000
        setTimeout(function () {
            msg.edit(`[▗]Destroying friends list`)
        }, time)
        time += 3 * 1000
        setTimeout(function () {
            msg.edit(`[▖] Getting results...`)
        }, time)
        time += 3 * 1000
        setTimeout(function () {
            msg.edit(` ${HackedPerson} Successfully hacked!`)
        }, time)
    }
}