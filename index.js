const { select, input, checkbox } = require('@inquirer/prompts')

let meta = {
    value: "Nome da meta",
    checked: false,
}

let metas = [ meta ]

const cadastrarMeta = async () => {
    const meta = await input({message: "Insira a sua meta:"})

    if(meta.length == 0){
        console.log("A meta não pode ser vazia")
        return
    }

    metas.push({ value: meta, checked: false})
}

const listarMetas = async () => {
    const respostas = await checkbox({
        message: "texto 1",
        choices: [...metas],
        instructions: false,
    })

    metas.forEach((m) => {
        m.checked = false 
    })

    if (respostas.length == 0){
        console.log("nenhuma resposta selecionada")
        return
    }

    respostas.forEach((respostas) => {
        const meta = metas.find((m) => {
            return m.value == respostas
        })

        meta.checked = true
    })
    console.log("metas concluidas:")
}

const metasRealizadas = async () => {
    const realizadas = metas.filter((meta) => {
        return meta.checked
    })
    
    if(realizadas.length == 0){
        console.log("sem metas realizadas no momento")
        return
    }

    await select({
        message: "metas realizadas:" + realizadas.length,
        choices: [...realizadas]
    })
}

const metasAbertas = async () => {
    const abertas = metas.filter((meta) => {
        return meta.checked != true
    })

    if(abertas.length == 0) {
        console.log("vc não possui metas abertas")
        return
    }

    await select({
        message: "metas abertas:" + abertas.length,
        choices: [...abertas]
    })
}

const removerMetas = async () => {
    const metasDesmarcadas = metas.map((meta) => {
        return { value: meta.value, checked: false}
    })

    const itensPRemover = await checkbox({
        message: "selecione metas para remover",
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

    console.log(itensPRemover + "metas foram removidas")
}

const start = async () => {
    
    while(true){
        
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
                console.log(metas)
                break
            case "listar":
                console.log("vc está listando")
                await listarMetas()
                break
            case "realizadas":
                console.log("metas realizadas")
                await metasRealizadas()
                break
            case "abertas":
                console.log("metas abertas")
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