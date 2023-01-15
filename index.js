require("dotenv").config();
const Discord = require("discord.js");
const client = new Discord.Client({
  ws: {
    intents: [
      "GUILDS",
      "GUILD_MESSAGES",
    ],
  },
});

let stickyEmbed = new Discord.MessageEmbed()
  .setTitle("<a:1001362068114509895Copy:1028538333594398740>Kênh chat Văn minh - Lịch sự - Không mua bán ở đây !!! ")
  .setDescription("Nếu cần hỗ trợ có thể nhắn tin cho ADMIN hoặc tạo ticket . không hỏi ở CHAT")
  .addFields(
    { name: 'Ticket hỗ trợ <:discord:1028538338023583764>', value: '<#1014541997341691963>', inline: true },
    { name: " <:clipart954635:1028505680803545098> Admin hỗ trợ", value: "<@1031077844723445781>", inline: true },
    { name: " ", value: " ", inline: false },
    { name: '<a:1061298826532618291:1063862848465424384> WebSite Chính của SHOP ', value: '> https://ginshop.xyz/', inline: true },
    { name: "<a:1061298826532618291:1063862848465424384> SERVER BACK UP", value: "> https://discord.gg/VQWVAgHgZK", inline: true }
  )
  .setTimestamp()
  .setColor("#eb58fe")
  .setURL("https://ginshop.xyz")
  .setFooter("XSTORE - BÁN MỌI THỨ BẠN CẦN ❤️")


const maxMessageCount = parseInt(process.env.MAX_MESSAGE_COUNT);
let lastStickyMessage = "";
let messageCount = 0;
let stickyMessageChannel = "1063815446412931213";

client.once("ready", async function () {
  console.info(`Bot ready! | ${client.user.username}`);
});

client.on("message", async function (message) {
  if (message.author.bot) {
    return;
  }

  if (message.content.indexOf(process.env.PREFIX) !== 0) {
    if (stickyEmbed !== "") {
      if (message.channel.id === stickyMessageChannel) {
        messageCount++;
        if (messageCount === maxMessageCount) {
          await lastStickyMessage.delete();
          lastStickyMessage = await message.channel.send(stickyEmbed);
          messageCount = 0;
        }
      }
    }

    return;
  }

  const args = message.content.slice(1).trim().split(/ +/g);
  const command = args.shift().toLowerCase();

  if (command === "stick") {
    if (
      message.author.id === process.env.OWNER
      || message.member.roles.cache.has(process.env.ALLOWED_ROLES_ID)
    ) {
      try {
        stickyMessageChannel = message.channel.id;
        stickyEmbed = stickyEmbed
        lastStickyMessage = await message.channel.send(stickyEmbed);
        await message.delete();
      } catch (error) {
        console.error(error);
      }
    }
  } else if (command === "unstick") {
    if (
      message.author.id === process.env.OWNER
      || message.member.roles.cache.has(process.env.ALLOWED_ROLES_ID)
    ) {
      lastStickyMessage = "";
      messageCount = 0;
      stickyMessageChannel = "";
      stickyEmbed = "";
      message.delete();
    }
  }
});

client.login();
