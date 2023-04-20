// Escreva seus tipos aqui
var caminho = {
    nome: "Ponte Wilson",
    proximidade: 100,
    percurso: {
        area: "meio",
        regiao: {
            proximo: {
                area: "fim",
                acima: {
                    nome: "Vitoria",
                    proximidade: 30,
                    tipo: "clareira",
                },
                nome: "Riacho Branco",
                proximidade: 25,
                tipo: "corrego",
            },
            nome: "Ponte Horto",
            proximidade: 40,
            percurso: {
                nome: "Túnel Virado",
                proximidade: 20,
                atalho: {
                    proximidade: 30,
                    nome: "Poleiro do Gavião",
                    tipo: "cidade",
                },
                percurso: {
                    area: "begin",
                    regiao: {
                        percurso: {
                            tesouro: "cartas de baralho raras",
                            nome: "Tesouro de Riomar",
                            proximidade: 0,
                            tipo: "clareira",
                        },
                        nome: "Gate of the Hierarch",
                        proximidade: 10,
                        tipo: "cidade",
                    },
                    nome: "Córrego Fundação",
                    proximidade: 25,
                    tipo: "corrego",
                },
                tipo: "estrada",
            },
            tipo: "cidade",
        },
        nome: "Rio Yana",
        proximidade: 50,
        tipo: "corrego",
        acima: {
            nome: "Trilha do Mascate",
            proximidade: 65,
            percurso: {
                nome: "Boa-vista",
                proximidade: 70,
                tipo: "cidade",
            },
            tipo: "estrada",
        },
    },
    tipo: "estrada",
};
var tesouro;
while (caminho) {
    console.log("Em: ".concat(caminho.nome));
    switch (caminho.tipo) {
        case "clareira":
            caminho = caminho.percurso;
            break;
        case "estrada":
            caminho =
                caminho.atalho &&
                    caminho.atalho.proximidade < caminho.percurso.proximidade
                    ? caminho.atalho
                    : caminho.percurso;
            break;
        case "cidade":
            if (!caminho.proximo) {
                caminho = caminho.percurso;
            }
            else if (!caminho.percurso) {
                caminho = caminho.proximo;
            }
            else {
                caminho =
                    caminho.proximo.proximidade < caminho.percurso.proximidade
                        ? caminho.proximo
                        : caminho.percurso;
            }
            break;
        case "corrego":
            switch (caminho.area) {
                case "begin":
                    caminho = caminho.regiao;
                    break;
                case "fim":
                    caminho = caminho.acima;
                    break;
                case "meio":
                    caminho =
                        caminho.regiao.proximidade < caminho.acima.proximidade
                            ? caminho.regiao
                            : caminho.acima;
                    break;
            }
    }
    if (!caminho) {
        console.log("Hmm. Fim da linha.");
    }
    else if (caminho.tesouro) {
        tesouro = caminho.tesouro;
        break;
    }
}
if (tesouro) {
    console.log("Isso vai servir demais: ".concat(tesouro, "."));
}
else {
    console.log("Nada a ver.");
}
