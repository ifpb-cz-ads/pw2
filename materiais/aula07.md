# Programação para a Web II - Aula 07: Interfaces
## Prof. Paulo Ewerton - paulo.fragoso@ifpb.edu.br

# Interfaces

- Interfaces são outra forma de definir o formato de objetos em TypeScript
- Agem de forma similar aos aliased types

# Diferenças entre type e interface

```typescript
type Poet = {
  born: number;
  name: string;
};

interface Poet {
  born: number;
  name: string;
}

```

# Verificação de tipo em interfaces

- Ocorre da mesma forma que com type
- Interfaces podem ser fundidas (merge)
- Integram-se com classes
- Costumam ter compilação mais rápida

```typescript
let valueLater: Poet;

// Ok
valueLater = {
  born: 1935,
  name: 'Sara Teasdale',
};

valueLater = "Emily Dickinson";
// Error: Type 'string' is not assignable to 'Poet'.

valueLater = {
  born: true,
  // Error: Type 'boolean' is not assignable to type 'number'.
  name: 'Sappho'
};

```

# Tipos de propriedades

## Propriedades opcionais 

```typescript
interface Book {
  author?: string;
  pages: number;
};

// Ok
const ok: Book = {
    author: "Rita Dove",
    pages: 80,
};

const missing: Book = {
    pages: 80
};
```

## Propriedades de somente leitura

- Propriedades marcadas com readonly não podem ser retribuídas

```typescript
interface Page {
    readonly text: string;
}

function read(page: Page) {
    // Ok: reading the text property doesn't attempt to modify it
    console.log(page.text);

    page.text += "!";
    //   ~~~~
    // Error: Cannot assign to 'text'
    // because it is a read-only property.
}
```

## Funções e métodos

- TypeScript define dois modos de definir funções em interfaces
  - Métodos: a função deve ser chamada como um membro do objeto
  - Propriedade: equivalente a uma propriedade que é uma função
- Os dois modos são muito semelhantes, sendo que é recomendado a sintaxe de método quando há referência a `this` no corpo da função
  
```typescript
interface HasBothFunctionTypes {
  property: () => string;
  method(): string;
}

const hasBoth: HasBothFunctionTypes = {
  property: () => "",
  method() {
    return "";
  }
};

hasBoth.property(); // Ok
hasBoth.method(); // Ok

interface OptionalReadonlyFunctions {
  optionalProperty?: () => string;
  optionalMethod?(): string;
}
```

# Assinaturas de índice

- É possível definir um número arbitrário de propriedades de um objeto a partir da sintaxe de assinaturas de índices em interfaces
- Nessa sintaxe, um objeto pode aceitar valores indexados uma chave do tipo string

```typescript
interface WordCounts {
  [i: string]: number;
}

const counts: WordCounts = {};

counts.apple = 0; // Ok
counts.banana = 1; // Ok

counts.cherry = false;
// Error: Type 'boolean' is not assignable to type 'number'.

```
## Misturando propriedades genéricas com obrigatórias

- É possível manter propriedades obrigatórias mesma que a interface permite assinaturas de índice
- Isso só é possível se a propriedade obrigatório seguir o mesmo padrão da assinatura (seja com valor literal ou não)

```typescript
interface HistoricalNovels {
  Oroonoko: number;
  [i: string]: number;
}

// Ok
const novels: HistoricalNovels = {
  Outlander: 1991,
  Oroonoko: 1688,
};

const missingOroonoko: HistoricalNovels = {
  Outlander: 1991,
};
// Error: Property 'Oroonoko' is missing in type
// '{ Outlander: number; }' but required in type 'HistoricalNovels'.

interface ChapterStarts {
  preface: 0;
  [i: string]: number;
}

const correctPreface: ChapterStarts = {
  preface: 0,
  night: 1,
  shopping: 5
};

const wrongPreface: ChapterStarts = {
  preface: 1,
  // Error: Type '1' is not assignable to type '0'.
};
```

# Interfaces aninhadas

- Da mesma forma que uma definição de type pode conter outros tipos, com interfaces é possível fazer a mesma coisa

```typescript
interface Novel {
    author: {
        name: string;
    };
    setting: Setting;
}

interface Setting {
    place: string;
    year: number;
}

let myNovel: Novel;

// Ok
myNovel = {
    author: {
        name: 'Jane Austen',
    },
    setting: {
        place: 'England',
        year: 1812,
    }
};

myNovel = {
    author: {
        name: 'Emily Brontë',
    },
    setting: {
        place: 'West Yorkshire',
    },
    // Error: Property 'year' is missing in type
    // '{ place: string; }' but required in type 'Setting'.
};
```

# Extensões de interfaces

- Similar à OO, uma interface pode estender uma ou mais interfaces, fazendo com que os objetos daquela interface possam todos os membros definidos nas interfaces estendidas

```typescript
interface Writing {
    title: string;
}

interface Novella extends Writing {
    pages: number;
}

// Ok
let myNovella: Novella = {
    pages: 195,
    title: "Ethan Frome",
};

let missingPages: Novella = {
 // Error: Property 'pages' is missing in type
 // '{ title: string; }' but required in type 'Novella'.
    title: "The Awakening",
}

let extraProperty: Novella = {
 // Error: Type '{ genre: string; name:” “string; strategy: string; }'
 // is not assignable to type 'Novella'.
 //   Object literal may only specify known properties,
 //   and 'genre' does not exist in type 'Novella'.
    pages: 300,
    strategy: "baseline",
    style: "Naturalism"
};

interface GivesNumber {
  giveNumber(): number;
}

interface GivesString {
  giveString(): string;
}

interface GivesBothAndEither extends GivesNumber, GivesString {
  giveEither(): number | string;
}

function useGivesBoth(instance: GivesBothAndEither) {
  instance.giveEither(); // Type: number | string
  instance.giveNumber(); // Type: number
  instance.giveString(); // Type: string
}
```

# Junção de interfaces (merge)

- Duas interfaces definidas no mesmo escopo serão unidas numa operação de merge
- Essa operação é particularmente útil quando se quer estender as propriedades de um objeto importado de uma biblioteca ou do próprio JavaScript

```typescript
interface Merged {
  fromFirst: string;
}

interface Merged {
  fromSecond: number;
}

// Equivalent to:
// interface Merged {
//   fromFirst: string;
//   fromSecond: number;
// }

interface Window {
  myEnvironmentVariable: string;
}

window.myEnvironmentVariable; // Type: string”
```
