const { select } = require('@inquirer/prompts')

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
                    name: "Sair",
                    value: "sair"
                }
            ]
        })
        switch(opcao){
            case "cadastro":
                console.log("vc está se cadastrando")
                break
            case "listar":
                console.log("vc está listando")
                break
            case "sair":
                console.log("Você saiu")
                return
        }
    }
}

start()