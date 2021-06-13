var Scraper = require('images-scraper');

const google = new Scraper({
    puppeteer: {
        headless: true
    }
});

module.exports = {
    name: 'image',
    aliases: ['imagesearch', 'searchimage'],
    description: "Search the image that u like!",
    async execute(message, args, cmd, client, Discord){
        const image_query = args.join(' ');
        if(!image_query) return message.channel.send('Please enter an image name!');

        message.channel.send('This may take a time, finding the best results...');//||9??? 0');
        try {
            const image_results = await google.scrape(image_query, 1);
            message.channel.send(image_results[0].url)
        } catch (err){
            message.channel.send('Error occurred!\nThis is between no results found or theres an error in the script!');
            console.log(err)
            throw err;
        }
    }
}