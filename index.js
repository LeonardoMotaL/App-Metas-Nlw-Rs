const { select, input, checkbox } = require('@inquirer/prompts')
const fs = require("fs").promises

let mensagem = "Bem vindo ao app de metas";

let metas

const carregarMetas = async () => {
    try {
        const dados = await fs.readFile("metas.json", "utf-8")
        metas = JSON.parse(dados)
    }
    catch(erro) {
        metas = []
    }
}

const salvarMetas = async () => {
    await fs.writeFile("metas.json", JSON.stringify(metas, null, 2))
}

const cadastrarMeta = async () => {
    const meta = await input({message: "Insira a sua meta:"})

    if(meta.length == 0){
        mensagem = "A meta não pode ser vazia"
        return
    }

    metas.push({ value: meta, checked: false})

    mensagem = "A sua meta foi cadastrada"
}

const listarMetas = async () => {
    if(metas.length == 0){
        mensagem = "Você não cadastrou metas"
        return
    }

    const respostas = await checkbox({
        message: "Use as setas para escolher, o espaço para listar e o enter quando terminar",
        choices: [...metas],
        instructions: false,
    })

    metas.forEach((m) => {
        m.checked = false 
    })

    if (respostas.length == 0){
        mensagem = "Nenhuma resposta selecionada"
        return
    }

    respostas.forEach((respostas) => {
        const meta = metas.find((m) => {
            return m.value == respostas
        })

        meta.checked = true
    })
    mensagem = "Metas concluidas:"
}

const metasRealizadas = async () => {
    if(metas.length == 0){
        mensagem = "Você não cadastrou metas"
        return
    }

    const realizadas = metas.filter((meta) => {
        return meta.checked
    })
    
    if(realizadas.length == 0){
        mensagem = "Sem metas realizadas no momento"
        return
    }

    await select({
        message: "Metas realizadas:" + realizadas.length,
        choices: [...realizadas]
    })
}

const metasAbertas = async () => {
    if(metas.length == 0){
        mensagem = "Você não cadastrou metas"
        return
    }

    const abertas = metas.filter((meta) => {
        return meta.checked != true
    })

    if(abertas.length == 0) {
        mensagem = "Você não possui metas abertas"
        return
    }

    await select({
        message: "Metas abertas:" + abertas.length,
        choices: [...abertas]
    })
}

const removerMetas = async () => {
    if(metas.length == 0){
        mensagem = "Você não cadastrou metas"
        return
    }
    
    const metasDesmarcadas = metas.map((meta) => {
        return { value: meta.value, checked: false}
    })

    const itensPRemover = await checkbox({
        message: "Selecione metas para remover",
        choices: [...metasDesmarcadas],
        instructions: false,
    })

    if(itensPRemover.length == 0){
        return
    }

    itensPRemover.forEach((item) => {
        metas = metas.filter((meta) => {
            return meta.value != item
        })
    })

    mensagem = "A(s) meta(s) foram removidas"
}

const mostraMsg = () => {
    console.clear();
    if(mensagem != ""){
        console.log(mensagem)
        console.log("")
        mensagem = ""
    }
}

const start = async () => {
    await carregarMetas ()

    while(true){
        mostraMsg()
        await salvarMetas()

        const opcao = await select({
            message: "Menu",
            choices: [
                {
                    name: "Cadastrar metas",
                    value: "cadastro"
                },
                {
                    name: "Listar metas",
                    value: "listar"
                },
                {
                    name: "Metas realizadas",
                    value: "realizadas"
                },
                {
                    name: "Metas abertas",
                    value: "abertas"
                },
                {
                    name: "Remover metas",
                    value: "remover"
                },
                {
                    name: "Sair",
                    value: "sair"
                }
            ]
        })
        switch(opcao){
            case "cadastro":
                await cadastrarMeta()
                break
            case "listar":
                await listarMetas()
                break
            case "realizadas":
                await metasRealizadas()
                break
            case "abertas":
                await metasAbertas()
                break
            case "remover":
                await removerMetas()
                break
            case "sair":
                console.log("Você saiu")
                return
        }
    }
}

start()