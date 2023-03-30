# PW2 2023.1 - Aula 04: Objetos em TypeScript

## Prof. Paulo Ewerton -- pauloewerton@icloud.com

# Tipos de objeto

- Em TypeScript, um objeto literal declarado dentro de `{}` é considerado um novo tipo de objeto
- Ao acessar propriedades de um tipo de objeto, o TypeScript fará a inferência de suas propriedades
- Além de definir tipos de objeto por inferência, TypeScript permite a criação explícita de um tipo de objeto

```typescript
// com inferência
const pessoa = {
  nascimento: 1995,
  nome: 'pessoa1'
};

// objeto definido explicitamente
const pessoa = {
  nascimento: number;
  nome: string;
};

pessoa = {
 nascimento: 1995,
 nome: 'pessoa2'
};

pessoa = 'pessoa3'; // erro
```

# Alias de tipo objeto

- Declarar os tipos das propriedades de um objeto individualmente pode se tornar repetitivo
- É possível utilizar um `alias` para definir um tipo de objeto

````typescript
type Pessoa = {
  nascimento: number;
  nome: string;
};
let estudante: Pessoa;

estudante = {
  nascimento: 2000,
  nome: 'estudante1'
};

estudante = 'estudante2'; // erro

# Verificação de tipo objeto

- Quando uma variável é declarada como de um tipo objeto, todos as propriedades deste devem ser declaradas
- Os tipos de cada propriedade também são verificados
- Propriedades em excesso são verificadas

```typescript
type NomeCompleto = {
  nome: string;
  sobrenome: string;
};

const pessoa: NomeCompleto = {
  nome: 'maria',
  sobrenome: 'silva'
};

// erro
const pessoa1: NomeCompleto = {
  nome: 'jose'
};

// verificacao de tipo
type IntervaloTempo = {
  inicio: Date;
};

const inicioString: IntervaloTempo = {
  inicio: '2023-02-01'
};

// propriedades excessivas
const dataFinal: IntervaloTempo = {
  inicio: '2023-02-01',
  final: '2023-03-01'
};
````

# Tipos de objeto aninhados

- Assim, como no JavaScript, TypeScript permite o aninhamento de objetos, com utiliação ou não de alias

`````typescript
type Livro = {
  autor: {
    nome: string;
    sobrenome: string;
  };
  titulo: string;
};

const livro1 = {
  autor: {
    nome: 'machado',
    sobrenome: 'de assis'
  },
  titulo: 'memorias postumas de bras cubas'
};

// erro: nao possui todas as propriedades de autor
const livro2 = {
  autor: {
    nome: 'jose de alencar'
  },
  titulo: 'iracema'
};

// utilizando alias de tipo objeto

type Autor = {
  nome: string;
  sobrenome: string;
};

type Livro = {
  autor: Autor;
  titulo: string;
};

// erro: nao possui todas as propriedades de autor
const livro3 = {
  autor: {
    nome: 'jose de alencar'
  },
  titulo: 'iracema'
};

# Propriedades opcionais

- É possível marcar uma propriedade de um objeto como sendo opcional a partir do uso de `?` antes do tipo da propriedade
- Lembrando que uma propriedade opcional pode ou não existir sendo diferente de um tipo `union` que contém `undefined`

````typescript
type Livro = {
  autor?: string;
  paginas: number;
};

const livro1: Livro = {
  autor: 'clarice lispector',
  paginas: 200
};

const livro2: Livro = {
  autor: 'clarice lispector'
}; // erro: paginas e obrigatoria

type Escritor = {
  nome: string | undefined;
  editor?: string;
};

const autor1: Escritor = {
  nome: undefined
};

const autor2: Escritor = {}; // erro: nome é obrigatória
`````
