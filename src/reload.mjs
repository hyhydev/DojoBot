import { REST, Routes } from "discord.js";
import { config } from "dotenv";

config();

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

const commands = [
    {
        name: "update",
        description: "Update a player's belt",
        options: [
            {
                type: 6,
                name: "player",
                description: "The player to update",
                required: true,
            },
            {
                type: 3,
                name: "belt",
                description: "The colour of belt to assign to the player",
                required: true,
                choices: belts.map((belt) => ({
                    name: belt.name,
                    value: belt.roleId,
                })),
            },
        ],
    },
];

const rest = new REST({ version: "10" }).setToken(
    process.env.DISCORD_BOT_TOKEN ?? ""
);

try {
    console.log("Started refreshing application (/) commands.");

    await rest.put(
        Routes.applicationCommands(process.env.DISCORD_BOT_CLIENT_ID ?? ""),
        {
            body: commands,
        }
    );

    console.log("Successfully reloaded application (/) commands.");
} catch (error) {
    console.error(error);
}
