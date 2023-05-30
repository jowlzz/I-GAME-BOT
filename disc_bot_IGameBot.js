import { Client, GatewayIntentBits } from 'discord.js';

const client = new Client({ 
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers
  ]
});
const TOKEN = 'MTExMjcxMjY0MTAzOTgyNjk5NA.GiXwpz.gUMJLEv2kVqN3m6b2tbXI-r-YVAyGDfvqCCK_g';
const ROLE_NAME = 'I GAME';

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}`);
});

client.on('presence', (oldPresence, newPresence) => {
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