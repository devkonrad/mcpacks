import { world } from "@minecraft/server";

// Forbidden words list
const badWords = [
	"badword1", 
	"badword2", 
	"badword3"
];

// Monitor chat messages
world.beforeEvents.chatSend.subscribe((event) => {
    let message = event.message.toLowerCase();
    let sender = event.sender;

    // Check if the message contains a forbidden word
    if (badWords.some(word => message.includes(word))) {
        event.sendToTargets = []; // Block message from being sent

        // Send warning message to all players
        world.sendMessage(`§c[MOD] ${sender.name} has been kicked for using a banned word!`);

        // Kick the player
        sender.runCommandAsync(`kick "${sender.name}"`);
    }
});
