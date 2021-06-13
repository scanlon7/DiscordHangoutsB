const {ShardingManager} = require("discord.js");
require('dotenv').config();

const shards = new ShardingManager("./index.js", {
    token: process.env.token,
    totalShards: "auto"
});

shards.on("shardCreate", shard => {
    console.log(`Launched shard #${shard.id}`);
});

try {
    shards.spawn(shards.totalShards, 60000)
} catch (error) {
    console.log(`Unable to launch shards!`)
}
