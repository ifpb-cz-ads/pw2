# Programação para a Web II - Aula 08: Classes
## Prof. Paulo Ewerton - paulo.fragoso@ifpb.edu.br

## Métodos de classes

- Métodos definidos dentro de classes possuem a mesma verificação de tipo de funções convencionais
- Construtores são tratados como métodos em relação aos parâmetros

```typescript
class Greeter {
    greet(name: string) {
        console.log(`${name}, do your stuff!`);
    }
}

new Greeter().greet("Miss Frizzle"); // Ok

new Greeter().greet();
//            ~~~~~
// Error: Expected 1 arguments, but got 0.

class Greeted {
    constructor(message: string) {
        console.log(`As I always say: ${message}!`);
    }
}

new Greeted("take chances, make mistakes, get messy");

new Greeted();
// Error: Expected 1 arguments, but got 0.
```

## Propriedades de classes

- Propriedades para serem lidas e configuradas a partir de uma classe, devem ser explicitamente declaradas dentro da definição da classe; a anotação de tipo é opcional
- TypeScript tentará deduzir as propriedades declaradas a partir do construtor, ou seja, não é possível inicializar uma propriedade não declarada anteriormente
- O mesmo acontece ao tentar acessar uma propriedade em uma instância dessa classe

```typescript
class FieldTrip {
    destination: string;

    constructor(destination: string) {
        this.destination = destination; // Ok
        console.log(`We're going to ${this.destination}!`);

        this.nonexistent = destination;
        //   ~~~~~~~~~~~
        // Error: Property 'nonexistent' does not exist on type 'FieldTrip'.
    }
}

const trip = new FieldTrip("planetarium");

trip.destination; // Ok

trip.nonexistent;
//   ~~~~~~~~~~~
// Error: Property 'nonexistent' does not exist on type 'FieldTrip'.
```

## Propriedades do tipo função

- Da mesma forma que nas interfaces, nas classes é possível ter as duas formas de declaração de métodos: a partir de propriedades ou da sintaxe de métodos
- A diferença é que na sintaxe de método, este é copiado para todas as instâncias
- A definição como propriedade permite a declaração explícita de tipos de retorno e da lista de parâmetros

```typescript
class WithMethod {
    myMethod() {}
}

new WithMethod().myMethod === new WithMethod().myMethod; // true

class WithProperty {
    myProperty: () => {}
}

new WithMethod().myProperty === new WithMethod().myProperty; // false

class WithPropertyParameters {
    takesParameters = (input: boolean) => input ? "Yes" : "No";
}

const instance = new WithPropertyParameters();

instance.takesParameters(true); // Ok

instance.takesParameters(123);
//                       ~~~
// Error: Argument of type 'number' is not
// assignable to parameter of type 'boolean'.
```

## Verificação de inicialização

- TypeScript verificará se todas as propriedades declaradas que não permitem o valor `undefined` foram inicializadas no construtor
- Da mesma forma, uma propriedade não inicializada pode dar erro de execução caso seja acessada a partir de uma instância

```typescript
class WithValue {
    immediate = 0; // Ok
    later: number; // Ok (set in the constructor)
    mayBeUndefined: number | undefined; // Ok (allowed to be undefined)

    unused: number;
    // Error: Property 'unused' has no initializer
    // and is not definitely assigned in the constructor.

    constructor() {
        this.later = 1;
    }
}

class MissingInitializer {
    property: string;
}

new MissingInitializer().property.length;
// TypeError: Cannot read property 'length' of undefined
```

## Propriedades opcionais

- Assim como nas interfaces, é possível declarar propriedades como opcionais com o marcador `?`, fazendo que estas se comportem de forma parecida a um tipo union com `undefined`

```typescript
class MissingInitializer {
    property?: string;
}

new MissingInitializer().property?.length; // Ok

new MissingInitializer().property.length;
// Error: Object is possibly 'undefined'.
```

## Propriedades de somente-leitura

- Propriedades de classes marcadas como somente-leitura (`readonly`), não podem ser reatribuídas, sejam dentro da própria classe, seja a partir de uma instância

```typescript
class Quote {
    readonly text: string;

    constructor(text: string) {
        this.text = "hey";
    }

    emphasize() {
        this.text += "!";
        //   ~~~~
        // Error: Cannot assign to 'text' because it is a read-only property.
    }
}

const quote = new Quote(
    "There is a brilliant child locked inside every student."
);

Quote.text = "Ha!";
// Error: Cannot assign to 'text' because it is a read-only property.
```

## Classes como tipos

- Classes podem ser utilizadas normalmente como anotação de tipo de objetos

```typescript
class Teacher {
    sayHello() {
        console.log("Take chances, make mistakes, get messy!");
    }
}

let teacher: Teacher;

teacher = new Teacher(); // Ok

teacher = "Wahoo!";
// Error: Type 'string' is not assignable to type 'Teacher'.

class SchoolBus {
    getAbilities() {
        return ["magic", "shapeshifting"];
    }
}

function withSchoolBus(bus: SchoolBus) {
    console.log(bus.getAbilities());
}

withSchoolBus(new SchoolBus()); // Ok
```

## Classes e interfaces

- Uma classe pode implementar uma ou mais interfaces a partir da palavra reservada `implements`
- A classe que implementa a interface deve declarar todas a propriedades e prover uma implementação para os métodos

```typescript
interface Learner {
    name: string;
    study(hours: number): void;
}

class Student implements Learner {
    name: string;

    constructor(name: string) {
        this.name = name;
    }

    study(hours: number) {
        for (let i = 0; i < hours; i+= 1) {
            console.log("...studying...");
        }
    }
}

class Slacker implements Learner {
   // ~~~~~~~
   // Error: Class 'Slacker' incorrectly implements interface 'Learner'.
   //  Property 'study' is missing in type 'Slacker'
   //  but required in type 'Learner'.
    name = "Rocky";
}

class Student implements Learner {
    name;
    // Error: Member 'name' implicitly has an 'any' type.

    study(hours) {
        // Error: Parameter 'hours' implicitly has an 'any' type.
    }
}
```

## Implemetando múltiplas interfaces

- Para implementar mais de uma interface, basta separar cada interface por vírgula, e declarar e implementar todas propriedades e métodos de todas as interfaces

```typescript
interface Graded {
    grades: number[];
}

interface Reporter {
    report: () => string;
}

class ReportCard implements Graded, Reporter {
    grades: number[];

    constructor(grades: number[]) {
        this.grades = grades;
    }

    report() {
        return this.grades.join(", ");
    }
}

class Empty implements Graded, Reporter { }
   // ~~~~~
   // Error: Class 'Empty' incorrectly implements interface 'Graded'.
   //   Property 'grades' is missing in type 'Empty'
   //   but required in type 'Graded'.
   // ~~~~~
   // Error: Class 'Empty' incorrectly implements interface 'Reporter'.
   //   Property 'report' is missing in type 'Empty'
   //   but required in type 'Reporter'.
```

- Algumas vezes, existirá conflitos entre interfaces que impedem que sejam implementadas ao mesmo tempo

```typescript
interface AgeIsANumber {
    age: number;
}

interface AgeIsNotANumber {
    age: () => string;
}

class AsNumber implements AgeIsANumber, AgeIsNotANumber {
    age = 0;
 // ~~~
 // Error: Property 'age' in type 'AsNumber' is not assignable
 // to the same property in base type 'AgeIsNotANumber'.
 //   Type 'number' is not assignable to type '() => string'.
}
class NotAsNumber implements AgeIsANumber, AgeIsNotANumber {
    age() { return ""; }
 // ~~~
 // Error: Property 'age' in type 'NotAsNumber' is not assignable
 // to the same property in base type 'AgeIsANumber'.
 //   Type '() => string' is not assignable to type 'number'.
}
```

## Estendendo uma classe (herança)

- A verificação de tipo de uma classe pode ser estendida a uma subclasse que a estende, num mecanismo parecido com a herança de outras linguagens como Java
- A subclasse inclui todos os membros da superclasse, o que permite que suas instâncias possam ser utilizadas sempre que o tipo da superclasse for necessário (polimorfismo)

```typescript
class Teacher {
    teach() {
        console.log("The surest test of discipline is its absence.");
    }
}

class StudentTeacher extends Teacher {
    learn() {
        console.log("I cannot afford the luxury of a closed mind.");
    }
}

const teacher = new StudentTeacher();
teacher.teach(); // Ok (defined on base)
teacher.learn(); // Ok (defined on subclass)

teacher.other();
 //     ~~~~~
 // Error: Property 'other' does not exist on type 'StudentTeacher'.
 
class Lesson {
    subject: string;

    constructor(subject: string) {
        this.subject = subject;
    }
}

class OnlineLesson extends Lesson {
    url: string;

    constructor(subject: string, url: string) {
        super(subject);
        this.url = url;
    }
}

let lesson: Lesson;
lesson = new Lesson("coding"); // Ok
lesson = new OnlineLesson("coding", "oreilly.com"); // Ok

let online: OnlineLesson;
online = new OnlineLesson("coding", "oreilly.com"); // Ok

online = new Lesson("coding");
// Error: Property 'url' is missing in type
// 'Lesson' but required in type 'OnlineLesson'.
```

## Sobrescrita de construtores

- Subclasses não são obrigadas a definirem um construtor, mas caso o façam, é necessário a chamada ao construtor da superclasse por meio de `super()`
- Uma chamada a `super()` é necessária antes que as propriedades definidas localmente ou herdadas possam ser acessadas por meio de `this` ou `super`

```typescript
class GradeAnnouncer {
    message: string;

    constructor(grade: number) {
        this.message = grade >= 65 ? "Maybe next time..." : "You pass!";
    }
}

class PassingAnnouncer extends GradeAnnouncer {
    constructor() {
        super(100);
    }
}

class FailingAnnouncer extends GradeAnnouncer {
    constructor() { }
 // ~~~~~~~~~~~~~~~~~
 // Error: Constructors for subclasses must contain a 'super' call.
}

class GradesTally {
    grades: number[] = [];

    addGrades(...grades: number[]) {
        this.grades.push(...grades);
        return this.grades.length;
    }
}

class ContinuedGradesTally extends GradesTally {
    constructor(previousGrades: number[]) {
        this.grades = [...previousGrades];
        // Error: 'super' must be called before accessing
        // 'this' in the constructor of a subclass.

        super();

        console.log("Starting with length", this.grades.length); // Ok
    }
}
```

## Sobrescrita de métodos

- A sobrescrita de métodos é permitida desde que o método da subclasse possa ser atribuído ao método da superclasse (mesmo tipo de retorno)

```typescript
class GradeCounter {
    countGrades(grades: string[], letter: string) {
        return grades.filter(grade => grade === letter).length;
    }
}

class FailureCounter extends GradeCounter {
    countGrades(grades: string[]) {
        return super.countGrades(grades, "F");
    }
}

class AnyFailureChecker extends GradeCounter {
    countGrades(grades: string[]) {
        // Property 'countGrades' in type 'AnyFailureChecker' is not
        // assignable to the same property in base type 'GradeCounter'.
        //   Type '(grades: string[]) => boolean' is not assignable
        //   to type '(grades: string[], letter: string) => number'.
        //      Type 'boolean' is not assignable to type 'number'.
        return super.countGrades(grades, "F") !== 0;
    }
}

const counter: GradeCounter = new AnyFailureChecker();

// Expected type: number
// Actual type: boolean
const count = counter.countGrades(["A", "C", "F"]);
```

## Sobrescrita de propriedades

- TypeScript permite que propriedades sejam redeclaradas em subclasses
- Isso geralmente é útil para tornar obrigatórias propriedades definidas como opcionais na superclasse; expandir o tipo da propriedade não é permitido

```typescript
class Assignment {
    grade?: number;
}

class GradedAssignment extends Assignment {
    grade: number;

    constructor(grade: number) {
        super();
        this.grade = grade;
    }
}

class NumericGrade {
    value = 0;
}

class VagueGrade extends NumericGrade {
    value = Math.random() > 0.5 ? 1 : "...";
    // Error: Property 'value' in type 'NumberOrString' is not
    // assignable to the same property in base type 'JustNumber'.
    //   Type 'string | number' is not assignable to type 'number'.
    //     Type 'string' is not assignable to type 'number'.
}

const instance: NumericGrade = new VagueGrade();

// Expected type: number
// Actual type: number | string
instance.value;
```

## Classes abstratas

- Por vezes, uma classe precisa definir um método sem que seja necessário prover uma implementação inicial
- Nesses casos, utilizam-se classes marcadas como `abstract`
- Métodos abstratos também devem ser marcados como `abstract`
- Classes abstratas não podem ser instanciadas diretamente
- Subclasses de classes abstratas devem prover uma implementação para todos os métodos marcados como abstratos

```typescript
abstract class School {
    readonly name: string;

    constructor(name: string) {
        this.name = name;
    }

    abstract getStudentTypes(): string[];
}

class Preschool extends School {
    getStudentTypes() {
        return ["preschooler"];
    }
}

class Absence extends School { }
   // ~~~~~~~
   // Error: Nonabstract class 'Absence' does not implement
   // inherited abstract member 'getStudentTypes' from class 'School'.

let school: School;

school = new Preschool("Sunnyside Daycare"); // Ok

school = new School("somewhere else");
// Error: Cannot create an instance of an abstract class.
```

# Visibilidade de membros

- TypeScript inclui os seguintes modificadores de acesso para membros de uma classe:
  - public (padrão): acesso permitido universalmente
  - protected: acesso permitido apenas à classe e suas subclasses
  - private: acesso permitido apenas à classe
- É possível ainda utilizar a sintaxe `#` do JavaScript, que equivale ao modificador `private`

```typescript
class Base {
    isPublicImplicit = 0;
    public isPublicExplicit = 1;
    protected isProtected = 2;
    private isPrivate = 3;
    #truePrivate = 4;
}

class Subclass extends Base {
    examples() {
        this.isPublicImplicit; // Ok
        this.isPublicExplicit; // Ok
        this.isProtected; // Ok

        this.isPrivate;
        // Error: Property 'isPrivate' is private
        // and only accessible within class 'Base'.

        this.#truePrivate;
        // Property '#truePrivate' is not accessible outside
        // class 'Base' because it has a private identifier.
    }
}

new Subclass().isPublicImplicit; // Ok
new Subclass().isPublicExplicit; // Ok

new Subclass().isProtected;
//             ~~~~~~~~~~~
// Error: Property 'isProtected' is protected
// and only accessible within class 'Base' and its subclasses.

new Subclass().isPrivate;
//             ~~~~~~~~~~~
// Error: Property 'isPrivate' is private
// and only accessible within class 'Base'.
```

## Modificador `static`

- É possível declarar membros de uma classe como estáticas, isto é, não é necessário ter uma instância para acessá-los
- Mesmo em membros estáticos, o nível de acesso é verificado

```typescript
class Question {
    protected static readonly answer: "bash";
    protected static readonly prompt =
        "What's an ogre's favorite programming language?";

    guess(getAnswer: (prompt: string) => string) {
        const answer = getAnswer(Question.prompt);

        // Ok
        if (answer === Question.answer) {
            console.log("You got it!");
        } else {
            console.log("Try again...")
        }
    }
}

Question.answer;
//       ~~~~~~
// Error: Property 'answer' is protected and only
// accessible within class 'HasStatic' and its subclasses.
```
