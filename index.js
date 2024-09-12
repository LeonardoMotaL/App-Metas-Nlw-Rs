const start = () => {
    
    while(true){
        let opcao = "sair"
        switch(opcao){
            case "cadastro":
                console.log("vc está se cadastrando")
                break
            case "listar":
                console.log("vc está listando")
                break
            case "sair":
                return
        }
    }
}

start()