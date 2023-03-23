# PW2 2023.1 - Aula 03: Iniciação a TypeScript pt. 2
## Prof. Paulo Ewerton — paulo.fragoso@ifpb.edu.br

# Formato de tipo

- Além de verificar os valores possível para uma variável, TypeScript rastreia os membros dos objetos;
- Caso uma propriedade seja acessada, TypeScript irá verificar se ela existe com o tipo correspondente

```typescript
let rapper = 'emicida';
rapper.length; // ok

rapper.push('!'); // propriedade não existe
```

# Utilizando objetos próprios

- TypeScript verifica a utilização de objetos, não apenas a capacidade de atribuição

```typescript
let emicida = {
  nome: 'leandro',
  sobrenome: 'oliveira'
};

emicida.segundoNome; // propriedade não existe
```

# Tipo união (`union`)

- Existem dois processos de inferência de tipos que são peculiares a TypeScript:
    - União: infere o tipo a partir de dois mais tipos possíveis
    - Estreitamento: infere o tipo a partir dos tipos que não são possíveis
- Algumas expressões do JavaScript podem produzir diferentes tipos
- Qual o tipo da variável `cientista` no código abaixo?

```typescript
let cientista = Math.random() > 0.5
  ? undefined
  : 'Jaqueline Goes de Jesus';
```

# Declarando tipos `union`

- Tipos união podem ser declarados explicitamente, mesmo quando a variável possui um valor inicial
- No caso abaixo, declara-se que a variável poderá em algum momento adquirir um valor `string`, apesar de possuir o valor inicial `null`
- A ordem dos tipos declarados como `union` não importa
- As propriedades do tipo `union` serão inferidos a intersecção dos tipos

```typescript
let pensadora: string | null = null;

if (Math.random() > 0.5) {
  pensadora = 'Marilena Chauí';
}

let fisico = Math.random() > 0.5
  ? 'Marcelo Gleiser'
  : 42;
fisico.toString(); // ok para ambos os tipos
fisico.toUpperCase(); // erro: não existe para number
fisico.isInteger(); // erro: não existe para string
```
# Estreitamento (*narrowing*)

- Em TypeScript o estreitamento se dá quando a inferência é para um tipo mais específico do que o foi declarado inicialmente
- Estreitamento por atribuição: a inferência é dada pelo tipo em um momento específico, a depender do valor atribuído
- Estreitamento por condição lógica: comparar um valor com um literal faz o TypeScript inferir o tipo dentro do bloco da condição

```typescript
// estreitamento por atribuição
let inventor: number | string = 'Santos Dumont';
inventor.toUpperCase(); // ok
inventor.isInteger(); // erro

let almirante: number | string;
almirante = 'Grace Hopper';
almirante.toUpperCase(); // ok para string
almirante.isInteger(); // erro: o tipo é string por estreitamento

// estreitamento por condicional
let cientista = Math.random() > 0.5
  ? undefined
  : 'Jaqueline Goes de Jesus'

if (cientista === 'Jaqueline Goes de Jesus') {
  cientista.toUpperCase(); // ok
}

cientista.toUpperCase(); // erro: propriedade inválida para string | number

// utilizando condicional com typeof
let pesquisadora = Math.random() > 0.5
  ? 'Mayana Zatz'
  : 75;

if (typeof pesquisadora === 'string') {
    pesquisadora.toUpperCase(); // ok
}

if (!(typeof pesquisadora === 'string)) {
  pesquisadora.isInteger(); // ok
} else {
  pesquisadora.toUpperCase(); // ok
}

// pode ser rescrito com o operador ternário
typeof pesquisadora === 'string'
  ? pesquisadora.toUpperCase()
  : pesquisadora.isInteger();
```

# Tipos literais

- TypeScript permite que um valor literal possa ser utilizado como tipo
- Variáveis declaradas com `const` têm o tipo reportado como sendo literal
- Há valores literais finitos para os tipos `boolean`, `null` e `undefined`; `number` e `string` possuem infinitos literais

```typescript
const nome = 'paulo';
let nome = 'paulo';

let expectativaDeVida: number | 'processando' | 'incerto';

expectativaDeVida = 89; // ok
expectativaDeVida = 'processando'; // ok
expectativaDeVida = true; // erro: tipo incompatível 
```

# Atribuição de literais

- Assim como os tipos `number` e `string` não incompatíveis para atribuição, literais diferentes também o são

```typescript
let especificamenteAda: 'Ada';
especificamenteAda = 'Ada'; // ok
especificamenteAda = 'Byron'; // erro

let umaString = '';
especificamenteAda = umaString; // erro
umaString = 'ok'; // ok 
```

# Estreitamento por valor-verdade

- TypeScript pode inferir o tipo de uma variável a partir de seu valor-verdade

```typescript
let pesquisadora = Math.random() > 0.5
  ? 'Mayana Zatz'
  : undefined;

if (pesquisadora) {
  pesquisadora.toUpperCase(); // ok
}

pesquisadora.toUpperCase(); // erro: objeto pode ser undefined

// também funciona com operadores lógicos
pesquisadora && pesquisadora.toUpperCase(); // ok
pesquisadora?.toUpperCase(); // ok
```

# Variável sem valor inicial

- TypeScript não permite o acesso às propriedades de uma variável que não foi atribuída (similar as variáveis locais do Java)

```typescript
let nome: string;
nome?.length; // erro: utilizada antes da atribuição
nome = 'paulo';
nome.length; // ok
```

# Alias de tipo

- Para tipos `union` mais complexos, é possível utilizar um `alias` para facilitar o reuso

```typescript
let dadosComplexos1: boolean | number | string | null | undefined;
let dadosComplexos2: boolean | number | string | null | undefined;
let dadosComplexos3: boolean | number | string | null | undefined;

// utilizando alias de tipo
type DadosComplexos: boolean | number | string | null | undefined;
let dadosComplexos1: DadosComplexos;
let dadosComplexos2: DadosComplexos;
let dadosComplexos3: DadosComplexos;

// aliases podem ser usados em union
type Id = number | string;
type IdNulo = Id | undefined | null;
``` 

# Exercícios

```typescript
// Como podemos rodar isso em um arquivo .ts sem causar erros?



let employee = {};

employee.code = 10;

employee.name = "John";

// Como podemos melhorar o esse código usando TS?



let pessoa1 = {};

pessoa1.nome = "maria";

pessoa1.idade = 29;

pessoa1.profissao = "atriz"



let pessoa2 = {}

pessoa2.nome = "roberto";

pessoa2.idade = 19;

pessoa2.profissao = "Padeiro";



let pessoa3 = {

nome: "laura",

idade: "32",

profissao: "Atriz"

};



let pessoa4 = {

nome = "carlos",

idade = 19,

profissao = "padeiro"

}
```

