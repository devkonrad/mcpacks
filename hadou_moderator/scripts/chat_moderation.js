import * as mc from "@minecraft/server";

// Debug: Verificando se o script foi carregado corretamente
console.log("Hadou Moderator script loaded successfully!");

const badWords = [
    "caralho", 
    "badword2", 
    "badword3"
];

// Monitor chat messages
mc.world.beforeEvents.beforeChatSend.subscribe((event) => {
    let message = event.message.toLowerCase();
    let sender = event.sender;

    // Debug: Print the message and sender's name
    console.log(`Received message: "${message}" from ${sender.name}`);

    // Check if the message contains a forbidden word
    if (badWords.some(word => message.includes(word))) {
        console.log(`Bad word detected! Cancelling message and kicking ${sender.name}`);

        event.cancel = true; // Block message from being sent

        // Send a warning message to the sender
        sender.sendMessage("§cYou have been kicked for using a banned word!");

        // Send warning to all players
        mc.world.sendMessage(`§c[MOD] ${sender.name} has been kicked for using a banned word!`);

        // Kick the player with a message
        sender.runCommandAsync(`kick ${sender.name} "You used a banned word and have been kicked from the server!"`);

        // Debug: Confirm that the player was kicked
        console.log(`${sender.name} has been kicked for using a banned word.`);
    } else {
        // Debug: If no bad word detected
        console.log(`No bad words detected in the message from ${sender.name}.`);
    }
});
