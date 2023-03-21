# PW2 2023.1 - Aula 02: Iniciação a Typescript
## Prof. Paulo Ewerton — [paulo.fragoso@ifpb.edu.br](mailto:paulo.fragoso@ifpb.edu.br)

# JavaScript

- Ativa desde 1995
- Evolução rápida e incremental
  - Versão anual da ECMAScript desde 2015
- Responsável pelas aplicações que temos atualmente na Web

# Características do JavaScript que podem ser limitantes

- A depender do projeto, algumas características do JavaScript podem não ser desejáveis
- Exemplo: uma das maiores vantagens do JavaScript, a flexibilidade de estrutura do código, pode ser um problema em projetos maiores

# Liberdade de estrutura

```javascript
function pintarFigura(artista, figura) {
  return artista
    .preparar()
    .pintar(figura, artista.materiais)
    .finalizar();
}
```

- Não há como supor quaisquer características sobre o `pintor` ou a `figura`!
  - `pintor` talvez seja um objeto e `figura` provavelmente é uma `string`
  - Até quem programou pode ter dificuldade em relembrar o que o código quer dizer depois de algum tempo
  
# Documentação não é padronizada

```javascript
/**
* Faz um artista pintar uma figura.
* @param {Artista} artista
* @param {string} figura
* @return {boolean} Verdadeiro caso o artista pintou a figura.
*/
function pintarFigura(artista, figura) {
/* . . . */ }
```

- A documentação no JavaScript não faz parte de sua especificação
- Convencionou-se utilizar a estrutra JSDoc - comentários voltados à documentação - para descrever o código
    - Nada impede que o JSDoc esteja errado
    - Mesmo que esteja correto, pode ficar desatualizado rapidamente
    - Descrever objetos complexos pode ser impraticável
    - Manter diversos comentários JSDoc em vários arquivos pode ser custoso
  
# Limites das ferramentas

- Devido à tipagem fraca e falta de confiança no JSDoc, os editores JavaScript por vezes ficam limitados:
    - Rastreamento de código é prejudicado
    - Refatorações não acontecem tão bem quanto em linguagens como Java ou C#

# TypeScript

- Projetada internamente pela Microsoft em 2010, depois teve o código-fonte aberto em 2012
- Características:
    - Linguagem de programação: superconjunto do JavaScript + estruturas para definição de tipos;
    - Verificador de tipos: avalia o código TypeScript/JavaScript e reporta qualquer inconsistência encontrada;
    - Compilador: executa o verificador de tipos e gera o JavaScript resultante
    - Serviço de linguagem: usa o verificador de tipos para prover utilitários úteis aos programadores (p. ex. VS Code).
  
# Prática com o TypeScript Playground

- Vamos iniciar o uso de TypeScript com alguns exemplos executados no [TypeScript Playground](https://www.typescriptlang.org/play):

```typescript
const nome = 'paulo';
const tam = nome.length();
```

- Esse código está escrito na sintaxe normal do JavaScript, mas o verificador de tipo da já entra em ação!
- Erros mostrados pelo verificador, durante a escrita do código, melhoram a produtividade

# Liberdade em restringir

- TypeScript permite que quem programa defina algum nível de restrição ao código implementado
- Apesar de parecer uma ideia limitante à primeira vista, a prática de restringir pode garantir que código seja usado da forma como foi inicialmente pensado
  - Pode ser útil quando o código é refatorado
  
```typescript
// anteriormente: imprimirNome(nome, sobrenome)
function imprimirNome(nomeCompleto) {
  console.log(`O nome completo do usuário é ${nomeCompleto}`);
}

imprimirNome('Paulo', 'Ewerton');
```

# Documentação precisa

- Vejamos a versão refatorada com TypeScript da função `pintarFigura`:

```typescript
interface Artista {
  finalizar(): boolean;
  materiais: Material[];
  pintar(figura: string, materiais: Material[]): boolean;
}

function pintarFigura(artista: Artista, figura: string): boolean {
/* . . . */
}
```

# Ferramentas de programação melhores

- TypeScript permite que os editores façam sugestões melhores, seja com as estruturas da linguagem JavaScript, ou com o código de quem programa
- Por exemplo: digitando `'teste'.se` no editor… 
- Ou o código anterior… 

# Sintaxe de compilação

- O compilador de TypeScript converte o código em JavaScript "puro", inclusive em versões anteriores da linguagem, promovendo maior compatibilidade
- O playground pode mostrar o resultado da compilação

# Usando o TypeScript localmente

- Qualquer projeto pode utilizar TypeScript: `npm i typescript` ou globalmente `npm i -g typescript`
- Uma vez instalado: `tsc —version`
- Para indicar que os arquivos do projeto devem ser compilados (criando o `tsconfig.json`): `tsc --init`
- Editores identificarão automaticamente uma pasta contendo o `tsconfig.json` como um projeto TypeScript
- Vamos colocar um código inválido para rodar…

# O que o TypeScript não é

- Uma solução para código ruim: não é um framework opinativo nem está relacionado a uma tecnologia específica
- Uma extensão do JavaScript: a compatibilidade com ECMAScript e a manutenção do comportamento do código gerado são características fundamentais do TypeScript, ou seja, nada a mais é adicionado ou retirado
- Mais devagar que JavaScript: existe a etapa de compilação, mas o código gerado é JavaScript
- Não acompanha a evolução do JavaScript: trata-se de um projeto ativo e que promove mudanças constantes

# Resumo

- JavaScript pode ter características limitantes para alguns projetos: estrutura flexível demais, documentação pouco confiável, ferramentas limitadas;
- Características do TypeScript: liberdade em restringir, documentação precisa, ferramentas melhores;
- É possível testar localmente via Node ou a partir do playground.

# Características do verificador de tipo

- Um tipo no TypeScript descreve a "forma" que um valor pode ter
- Isto é, o conjunto de propriedades e métodos de um valor e aquilo que é retornado na chamada ao operador `typeof`

# Tipos básicos

- `null`
- `undefined`
- `boolean`
- `string`
- `number`
- `bigint`

# Inferência de tipo

- A inferência do tipo pelo verificador se dá a partir do valor atribuído à variável
- Ou a partir da avaliação do valor de uma expressão
- É possível usar o IDE ou o playground para verificar a inferência

```typescript
let singer = 'Gal Costa';
let melhorMusica = Math.random() > 5
  ? 'Divino maravilhoso'
  : 'Baby';
```

# Sistema de tipo

- Funcionamento
1. Escaneia todo o código-fonte analisando a existência de tipos e valores
2. Para cada variável, verificar o tipo pelo valor inicial
3. Para cada variável, verificar a forma como é utilizada no decorrer do programa
4. Reportar ao usuário se o valor utilizado não é compatível com o tipo


# Sistema de tipo exemplo

```typescript
let nome = 'Paulo';
nome.length();
```

1. Há uma variável `nome` no programa;
2. O tipo de `nome` é `string` pelo seu valor inicial;
3. `nome` não contém um método `length()`;
4. Essa inconsistência é reportada ao usuário;

# Tipos de erros

- Sintaxe: impedem que o TypeScript seja devidamente convertido em JavaScript válido
- Tipo: alguma incompatibilidade foi detectada no código

# Erros de sintaxe

- Ocorrem quando o TypeScript não consegue reconhecer o código 
- Algumas ferramentas (`tsc`) ainda converterão para JavaScript, mas provavelmente ele não será válido

`let let wat;`

# Erros de tipo

- Ocorrem quando a sintaxe é válida, mas o verificador de tipo detectou um erro nos tipos do programa
- Esses erros não impedem a conversão para JavaScript, mas o programa resultante pode não se comportar da forma esperada

`console.blug('um erro de tipo');`

# Capacidade de atribuição

- Indica as formas possíveis de atribuição a uma variável cujo tipo já foi inferido

```typescript
let sobrenome = 'Silva';
sobrenome = true;
```

# Anotações de tipo

- Permite definir o tipo de uma variável antes de atribuir um valor
- Anotações desnecessárias ocorrem quando a variável recebe um valor assim que o tipo é anotado

```typescript
let cantora: string;
let nome: string = 'Paulo';

nome = 42;
``` 

# Variáveis `any`

- Quando inferir o tipo, TypeScript determina o valor como sendo `any`
- Não é recomendável utilizar esse valor, pois impede que o verificador de tipo funcione adequadamente

```typescript
// evolução do tipo any
let cantora; // type: any

cantora = 'Gal Costa';
cantora.toUpperCase(); // ok

cantora = 19.58;
cantora.toPrecision(1); // ok

cantora.toUpperCase(); // erro
``` 

# Referências

Goldber, Josh. **Learning TypeScript**. O'Reilly: 2022.
