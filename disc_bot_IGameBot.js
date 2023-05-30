import { Client, Intents } from 'discord.js';
import dotenv from 'dotenv';

dotenv.config();
const client = new Client({ 
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MEMBERS,
    Intents.FLAGS.GUILD_PRESENCES // Added GUILD_PRESENCES intent
  ]
});
const TOKEN = process.env.bot_token;
const ROLE_NAME = 'I GAME';

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}`);
});

client.on('presenceUpdate', (oldPresence, newPresence) => {
  const member = newPresence.member;
  const game = newPresence.activities.find(activity => activity.type === 'PLAYING');

  if (game) {
    const role = member.guild.roles.cache.find(role => role.name === ROLE_NAME);

    if (role) {
      member.roles.add(role)
        .then(() => console.log(`Assigned role ${role.name} to ${member.user.tag}`))
        .catch(console.error);
    } else {
      console.log(`Role ${ROLE_NAME} does not exist in the server.`);
    }
  }
});

client.login(TOKEN);