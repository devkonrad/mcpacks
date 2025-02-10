import * as mc from "@minecraft/server";

// Forbidden words list
const badWords = [
    "badword1", 
    "badword2", 
    "badword3"
];

// Monitor chat messages
mc.world.beforeEvents.beforeChatSend.subscribe((event) => {
    let message = event.message.toLowerCase();
    let sender = event.sender;

    // Check if the message contains a forbidden word
    if (badWords.some(word => message.includes(word))) {
        event.cancel = true; // Block message from being sent

        // Send warning message to all players
        mc.world.sendMessage(`§c[MOD] ${sender.name} has been kicked for using a banned word!`);

        // Kick the player
        sender.runCommandAsync(`kick ${sender.name}`);
    }
});
