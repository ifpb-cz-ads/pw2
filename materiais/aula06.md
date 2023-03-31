# PW2 2023.1 - Aula 06: TypeScript Arrays

## Prof. Paulo Ewerton -- paulo.fragoso@ifpb.edu.br

## Arrays
- Tipos heterogeneos em um mesmo array
```typescript
const elements = [true, null, undefined, 42];
elements.push("even", ["more"]); //elementos: [true, null, undefined, 42, "even", ["more"]]

// com typescript
const warriors = ["Artemisia", "Boudica"];
warriors.push("Zenobia"); //ok
warriors.push(true); //não atribuível.

let arrayOfNumbers: number[];
arrayOfNumbers = [4, 8, 15, 16, 23, 42];
```

## Arrays e tipos função

```typescript
// função que retorna um array de strings
let createStrings: () => string[];
// array de funções em que cada uma retorna uma string
let stringCreators: (() => string)[];
```

## Arrays de tipo union

```typescript
// ou é uma string ou é um  array de number 
let stringOrArrayOfNumbers: string | number[]; 
// array de elementos que podem ser tanto number quanto string 
let arrayOfStringOrNumbers: (string | number)[];
// o tipo é (string | undefined)[]
const namesMaybe = [ "Aqualtune", "Blenda", undefined, ];
```

## Arrays multidimensionais

```typescript
// Type: number[][]
let arrayOfArraysOfNumbers: (number[])[];
```

## Membros de um array

- acessados via índice
- os membros de um array do tipo union também são do tipo union
```typescript
const defenders = ["Clarenza", "Dina"]; // Type: string
const defender = defenders[0];
const soldiersOrDates = ["Deborah Sampson", new Date(1782, 6, 3)]; // Type: Date | string
const soldierOrDate = soldiersOrDates[0];
```

# Spread e Rest

- é possível usar spread para juntar arrays
```typescript
// Type: string[]
const soldiers = ["Harriet Tubman", "Joan of Arc", "Khutulun"];
// Type: number[] 
const soldierAges = [90, 19, 45];
// Type: (string | number)[]
const conjoined = [...soldiers, ...soldierAges];
```
- parâmetros rest também tem verificação de tipo
```typescript
function logWarriors(greeting: string, ...names: string[]) { 
  for (const name of names) {
    console.log(`${greeting}, ${name}!`);
  }
}
const warriors = ["Cathay Williams", "Lozen", "Nzinga"];
logWarriors("Hello", ...warriors);
const birthYears = [1844, 1840, 1583];
logWarriors("Born in", ...birthYears); // Error: Argument of type 'number' is not assignable to parameter of type 'string'.
```

# Tuplas

- arrays com tamanho fixo

```typescript
let yearAndWarrior: [number, string];
yearAndWarrior = [530, "Tomyris"]; // Ok
yearAndWarrior = [false, "Tomyris"]; // Error: Type 'boolean' is not assignable to type 'number'. yearAndWarrior = [530]; // Error: Type '[number]' is not assignable to type '[number, string]'. //   Source has 1 element(s) but target requires 2.
// year type: number 
// warrior type: string 
let [year, warrior] = Math.random() > 0.5 ? [340, "Archidamia"] : [1828, "Rani of Jhansi"];
```
