
const username: string = 'emimaster16';

/**
 * Permite sumar 2 numeros
 * @param a
 * @param b
 * @returns
 */
const sum = (a: number, b: number) => {
  return a + b;

}

sum(2, 5);


class Person {
  firsName: string;
  lastName: string;
  age: number;

  constructor(firstName: string, lastName: string, age: number) {
    this.firsName = firstName;
    this.lastName = lastName;
    this.age = age;
  }
}

const eminson = new Person('eminson', 'mendoza', 25);

console.log(username, eminson.age)


