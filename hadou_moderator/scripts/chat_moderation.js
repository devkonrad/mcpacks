import { world } from "@minecraft/server";

// Lista de palavras proibidas
const badWords = ["badword1", "badword2", "badword3"];

world.beforeEvents.chatSend.subscribe((event) => {
    let message = event.message;
    let sender = event.sender;
    let censoredMessage = message;

    // Verifica se a mensagem contém uma palavra proibida e censura
    let foundBadWord = false;
    badWords.forEach(word => {
        if (message.toLowerCase().includes(word)) {
            let regex = new RegExp(word, "gi");
            censoredMessage = censoredMessage.replace(regex, "*".repeat(word.length));
            foundBadWord = true;
        }
    });

    if (foundBadWord) {
        event.cancel = true; // Bloqueia a mensagem original

        // Envia a versão censurada no chat
        world.sendMessage(`§7${sender.name}: ${censoredMessage}`);

        // Avisa o jogador de que sua mensagem foi censurada
        sender.sendMessage(`§c[AVISO] Sua mensagem continha palavras inadequadas e foi censurada.`);
    }
});
