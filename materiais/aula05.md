# Programação para a Web II - Aula 05: Funções
## Prof. Paulo Ewerton - paulo.fragoso@ifpb.edu.br

# Parâmetros de função

- Ajudam a entender os tipos dos argumentos

```typescript
function sing(song) {
  console.log(`Singing: ${song}!`);
}

function sing(song: string) {
  console.log(`Singing: ${song}!`);
}
```

# Parâmetros obrigatórios

- Diferente do JavaScript, é possível definir funções com um número certo de parâmetros
- Garante também a segurança dos tipos dos argumetos

```typescript
function singTwo(first: string, second: string) {
  console.log(`${first} / ${second}`);
}

// Logs: "Ball and Chain / undefined"
singTwo("Ball and Chain");
//      ~~~~~~~~~~~~~~~~
// Error: Expected 2 arguments, but got 1.

// Logs: "I Will Survive / Higher Love

singTwo("I Will Survive", "Higher Love"); // Ok

// Logs: "Go Your Own Way / The Chain"
singTwo("Go Your Own Way", "The Chain", "Dreams");
// Error: Expected 2 arguments, but got 3. 
```

# Parâmetros opcionais

```typescript
function announceSong(song: string, singer?: string) {
  console.log(`Song: ${song}`);

  if (singer) {
    console.log(`Singer: ${singer}`);
  }
}

announceSong("Greensleeves"); // Ok
announceSong("Greensleeves", undefined); // Ok
announceSong("Chandelier", "Sia"); // Ok”
```

- Tipos `union` com `undefined` não são a mesma coisa que parâmetros opcionais já que sempre precisam ser providos

```typescript
function announceSongBy(song: string, singer: string | undefined) { /* ... */ }

announceSongBy("Greensleeves");
// Error: Expected 2 arguments, but got 1.

announceSongBy("Greensleeves", undefined); // Ok

announceSongBy("Chandelier", "Sia"); // Ok
```

- Parâmetros opcionais devem sempre vir após os parâmetros obrigatórios

```typescript
function announceSinger(singer?: string, song: string) {}
// Error: A required parameter cannot follow an optional parameter.
```

# Parâmetros padrão

```typescript
function rateSong(song: string, rating = 0) {
  console.log(`${song} gets ${rating}/5 stars!`);
}

rateSong("Photograph"); // Ok
rateSong("Set Fire to the Rain", 5); // Ok
rateSong("Set Fire to the Rain", undefined); // Ok

rateSong("At Last!", "100");
// Error: Argument of type '"100"' is not assignable
// to parameter of type 'number | undefined'.
```

# Parâmetros arbitrários (`rest parameters`)

```typescript
function singAllTheSongs(singer: string, ...songs: string[]) {
  for (const song of songs) {
    console.log(`${song}, by ${singer}`);
  }
}

singAllTheSongs("Alicia Keys"); // Ok
singAllTheSongs("Lady Gaga", "Bad Romance", "Just Dance", "Poker Face"); // Ok

singAllTheSongs("Ella Fitzgerald", 2000);
// Error: Argument of type 'number' is not
// assignable to parameter of type 'string'.
```

# Tipos de retorno

- Via inferência do tipo do retorno
 
```typescript
// Type: (songs: string[]) => number
function singSongs(songs: string[]) {
  for (const song of songs) {
    console.log(`${song}`);
  }

  return songs.length;
}
```

- Se houver mais de um tipo de retorno, a inferência é pela a união dos possíveis tipos

```typescript
// Type: (songs: string[], index: number) => string | undefined
function getSongAt(songs: string[], index: number) {
  return index < songs.length
    ? songs[index]
    : undefined;
}
```

- Via anotação de tipo de retorno explícita

```typescript
function singSongsRecursive(songs: string[], count = 0): number {
  return songs.length ? singSongsRecursive(songs.slice(1), count + 1) : count;
}

const singSongsRecursive = (songs: string[], count = 0): number =>
  songs.length ? singSongsRecursive(songs.slice(1), count + 1) : count;
```

- Incompatibilidade de tipos de retorno com valores retornados

```typescript
function getSongRecordingDate(song: string): Date | undefined {
  switch (song) {
    case "Strange Fruit":
      return new Date('April 20, 1939'); // Ok
    case "Greensleeves":
      return "unknown";
      // Error: Type 'string' is not assignable to type 'Date'.

    default:
      return undefined; // Ok
  }
}
```

# Tipos função

- JavaScript permite a passagem de funções como valor, então no TypeScript existe um tipo `function` declarado similar a uma *arrow function*

```typescript
let nothingInGivesString: () => string;
let inputAndOutput: (songs: string[], count?: number) => number;

const songs = ["Juice", "Shake It Off", "What's Up"];

function runOnSongs(getSongAt: (index: number) => string) {
  for (let i = 0; i < songs.length; i += 1) {
    console.log(getSongAt(i));
  }
}

function getSongAt(index: number) {
  return `${songs[index]}`;
}

runOnSongs(getSongAt); // Ok

function logSong(song: string) {
  return `${song}`;
}

runOnSongs(logSong);
//         ~~~~~~~
// Error: Argument of type '(song: string) => string' is not
// assignable to parameter of type '(index: number) => string'.
//   Types of parameters 'song' and 'index' are incompatible.
//     Type 'number' is not assignable to type 'string'. 
```

# Parênteses em tipo função

```typescript
// Tipo é uma função que retorna uma union: string | undefined
let returnsStringOrUndefined: () => string | undefined;

// Tipo ou é uma função que retorna string ou undefined
let maybeReturnsString: (() => string) | undefined;
```

# Alias em tipo função

```typescript
type StringToNumber = (input: string) => number;

let stringToNumber: StringToNumber;

stringToNumber = (input) => input.length; // Ok

stringToNumber = (input) => input.toUpperCase();
//                          ~~~~~~~~~~~~~~~~~~~
// Error: Type 'string' is not assignable to type 'number'.

type NumberToString = (input: number) => string;

function usesNumberToString(numberToString: NumberToString) {
  console.log(`The string is: ${numberToString(1234)}`);
}

usesNumberToString((input) => `${input}! Hooray!`); // Ok

usesNumberToString((input) => input * 2);
//                            ~~~~~~~~~
// Error: Type 'number' is not assignable to type 'string'.
```

# Mais tipos de retorno

- Tipo `void`: ignora os valores retornados pela função

```typescript
function logSong(song: string | undefined): void {
  if (!song) {
    return; // Ok
  }

  console.log(`${song}`);

  return true;
  // Error: Type 'boolean' is not assignable to type 'void'.
}

let songLogger: (song: string) => void;
songLogger = (song) => {
  console.log(`${songs}`);
};

songLogger("Heart of Glass"); // Ok
```
- Retorno `undefined` é diferente de `void`

```typescript
function returnsVoid() {
  return;
}

let lazyValue: string | undefined;

lazyValue = returnsVoid();
// Error: Type 'void' is not assignable to type 'string | undefined'.
```

- Tipo `never`: marca uma função que sempre lançará um erro

```typescript
function fail(message: string): never {
    throw new Error(`Invariant failure: ${message}.`);
}

function workWithUnsafeParam(param: unknown) {
    if (typeof param !== "string") {
        fail(`param should be a string, not ${typeof param}`);
    }

    // Here, param is known to be type string
    param.toUpperCase(); // Ok
}
```

# Sobrecarga de funções

- É possível sobrecarregar funções a partir de sua assinatura: várias assinaturas definidas antes de uma implementação
- O tipo é verificado com base nas assinaturas possíveis e não na implementação

```typescript
function createDate(timestamp: number): Date;
function createDate(month: number, day: number, year: number): Date;
function createDate(monthOrTimestamp: number, day?: number, year?: number) {
  return day === undefined || year === undefined
    ? new Date(monthOrTimestamp)
    : new Date(year, monthOrTimestamp, day);
}

createDate(554356800); // Ok
createDate(7, 27, 1987); // Ok

createDate(4, 1);
// Error: No overload expects 2 arguments, but overloads
// do exist that expect either 1 or 3 arguments. 
```]
