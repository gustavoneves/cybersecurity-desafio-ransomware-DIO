import fs from "node:fs/promises";
import crypto from "node:crypto";

async function leArq(arquivo){
    try{
        const dados = await fs.readFile(arquivo, { encoding: "utf8" });
        return dados;
    }
    catch (erro){
        console.log(erro);
        return erro;
    }
}

async function dadosDecifrados(arquivo, dadosDecifrados){
    try {
        await fs.writeFile(arquivo, dadosDecifrados);
    }catch (err) {
        console.log(err)
    }
}

async function decifraArquivo(arquivoCifrado, senha) {
    const dadosCifrados = await leArq(arquivoCifrado);

    const chave = crypto.scryptSync(senha, 'salt', 32);
    // Este 'e o vetor de inicializacao ele deve ser compartilhado para permitir descrifrar a mensagem
    const vetorInicializacao = Buffer.alloc(16, 0);
    const decipher = crypto.createDecipheriv('aes256', chave, vetorInicializacao);
    const dadosClean = decipher.update(dadosCifrados, 'hex', 'utf8') + decipher.final('utf8');
    console.log(`dadosCifrados: ${dadosClean}`)
}


decifraArquivo("arquivoCifrado", "123456789");