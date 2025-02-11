import * as mc from "@minecraft/server";

// Debug: Verificando se o script foi carregado corretamente
console.log("Hadou Moderator script loaded successfully!");

const badWords = [
    "badword1", 
    "badword2", 
    "badword3"
];

// Monitor chat messages
mc.world.events.chatSendBefore.subscribe((event) => {
    let message = event.message.toLowerCase();
    let sender = event.sender;

    // Debug: Exibir mensagem recebida
    console.log(`Received message: "${message}" from ${sender.name}`);

    // Verificar se a mensagem contém palavras proibidas
    if (badWords.some(word => message.includes(word))) {
        console.log(`Bad word detected! Cancelling message and kicking ${sender.name}`);

        event.cancel = true; // Bloquear a mensagem

        // Enviar mensagem de aviso ao jogador
        sender.runCommandAsync(`tellraw @s {"rawtext":[{"text":"§cYou have been kicked for using a banned word!"}]}`);

        // Notificar todos os jogadores
        mc.world.sendMessage(`§c[MOD] ${sender.name} has been kicked for using a banned word!`);

        // Expulsar o jogador
        sender.runCommandAsync(`kick "${sender.name}"`);

        // Debug: Confirmar que o jogador foi expulso
        console.log(`${sender.name} has been kicked.`);
    } else {
        // Debug: Se nenhuma palavra proibida for encontrada
        console.log(`No bad words detected in the message from ${sender.name}.`);
    }
});
