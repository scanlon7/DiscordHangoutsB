const { Client, Message } = require('discord.js');
const SnakeGame = require('snakecord')
module.exports = {
    name: 'snakegame',
    description: 'Snake comand',
    premium: true,
    /**
    * @param {Client} client
    * @param {Message} message
    * @param {String[]} args
    */
    async execute(message, args, cmd, client, Discord) {
        const snakeGame = new SnakeGame({
            title: 'Snake Game',
            color: "BLUE",
            timestamp: true,
            gameOverTitle: "**GAME OVER**\nBetter luck next time!"
        });
        return message.reply({ file: snakeGame.newGame(message) });
    }
}