import { Client, GatewayIntentBits, Role } from "discord.js";
import { config } from "dotenv";

config();

const stadiumGuildId = "133082652004712449";
const belts = [
    {
        name: "White",
        roleId: "936795111323484160",
        tier: 1,
    },
    {
        name: "Green",
        roleId: "936795237798539325",
        tier: 2,
    },
    {
        name: "Blue",
        roleId: "936795311408574555",
        tier: 3,
    },
    {
        name: "Purple",
        roleId: "936795441415225364",
        tier: 4,
    },
    {
        name: "Red",
        roleId: "936795536625913856",
        tier: 5,
    },
    {
        name: "Pink",
        roleId: "1013291771452723300",
        tier: 6,
    },
    {
        name: "Gold",
        roleId: "936795595123871754",
        tier: 7,
    },
];

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.once("ready", () => {
    console.log(`Logged in as ${client.user?.tag}!`);
});

client.on("interactionCreate", async (interaction) => {
    if (!interaction.isCommand()) return;

    if (interaction.commandName === "update") {
        const player = interaction.options.data.find(
            (o) => o.name === "player"
        );
        const belt = interaction.options.data.find(
            (o) => o.name === "belt"
        )?.value;

        const guild = client.guilds.cache.find((g) => g.id == stadiumGuildId);

        const removeRoles = belts.map((b) =>
            guild.roles.cache.find((r) => r.id == b.roleId)
        );
        await player?.member?.roles.remove(removeRoles);

        const addRole = guild.roles.cache.find((r) => r.id == belt);
        await player?.member?.roles.add(addRole);

        const colour = belts.find((b) => b.roleId === belt);
        await interaction.reply(
            `Congrats to ${player?.user} for being awarded their ${colour?.name} belt!`
        );
    }
});

client.login(process.env.DISCORD_BOT_TOKEN ?? "").catch((e) => {
    console.error(e);
});
