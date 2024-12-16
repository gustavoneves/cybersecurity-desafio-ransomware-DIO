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

async function escreveArqCifrado(arquivo, dadosCifrados){
    try {
        await fs.writeFile(arquivo, dadosCifrados);
    }catch (err) {
        console.log(err)
    }
}

async function cifraArquivo(arquivo, senha) {
    const dadosClean = await leArq(arquivo);
    const chave = crypto.scryptSync(senha, 'salt', 32);
    // Este 'e o vetor de inicializacao ele deve ser compartilhado para permitir descrifrar a mensagem
    const vetorInicializacao = Buffer.alloc(16, 0);
    const cipher = crypto.createCipheriv('aes256', chave, vetorInicializacao);
    const dadosCifrados = cipher.update(dadosClean, 'utf8', 'hex') + cipher.final('hex');
    console.log(`dadosCifrados: ${dadosCifrados}`)

    escreveArqCifrado('arquivoCifrado', dadosCifrados)
}

cifraArquivo("teste.txt", "123456789");