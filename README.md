<h1 align="center"> <| Mi Pago - API (Unofficial) |> </h1>

[![npm](https://img.shields.io/npm/v/mi-pago.svg)](https://www.npmjs.com/package/mi-pago)
[![npm](https://img.shields.io/npm/dt/mi-pago.svg?maxAge=3600)](https://www.npmjs.com/package/mi-pago)
[![install size](https://packagephobia.now.sh/badge?p=mi-pago)](https://packagephobia.now.sh/result?p=mi-pago)
 
[![NPM](https://nodei.co/npm/mi-pago.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/mi-pago/)


## 🧐 About
Un módulo que te permite conectar a la plataforma de MiPago a través de  la API que proveen para realizar consultas, recargas y pago de otros servicios.

**NOTA:** Este módulo no es oficial, y está en modo de prueba, sin embargo, lo mencionado aquí sí está funcional.

## ⚙️ Usage

```js
const MiPago = require('mi-pago');
const mipago = new MiPago(key)
```
Where `key` is a object with the properties`usuario` and `clave`.

## 📎Quick Links
* [GitHub](https://github.com/Yohan205/mi-pago)
* [npm](https://npmjs.org/package/mi-pago)

# 📄Content
## 🏷️ Properties
Theses are properties of the rec, you should use the `then/catch` or `async/await` for these.

| Property | Description |
| -------- | ----------- |
| `balance` | Query the balance into your account |
| `gain` | Query the gain actually into your account |

### Example to get the balance
```js
console.log(await mipago.balance);

// Or you can use too

console.log(
    mipago.balance.then( a => a)
    .catch(err => err)
    );
```

## 🔎 Query methods
With these methods you can make your queries for get to the balance and the sell orders.

| Method | Description |
| -------- | ----------- |
| `queryBalance(string)` | Where string is _optional_ or could be `saldo` or `ganancia` the balance or gain of account, return a `String` or [Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object) |
| `querySell(queryToken)` | Consulta la venta realizadas mediante el token dado en cada transacción, return a [Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object) |
| `queryPack(operator, filter)` | Query the pakages of operator, filter _(optional)_ could be `minutes`, `internet` or `TI`, return a [Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array) |

### Query examples
```js
const data = mipago.queryBalance().then( ans => ans).catch( err => err);

console.log(data); // Result expected, Object with saldo and ganancia

------------------------------------------

const data = mipago.queryBalance("saldo").then( ans => ans).catch( err => err);

console.log(data); // Result expected, String
```

## 📲 To recharge
With theses methods you can realize recharge normally or recharge packages. Every method will return a object with data, which contains the details, reference, token of transaction, and data associated.

For each method contain, the following structure, where: `number` is a phone number, `operator` is a the type of operator chip into phone, `value` is the cost or value to recharge, `package` is the ID of package to recharge (you can use [queryPack()](#query-methods) for get the ID), view the and `charge` is a the type of charge only could be _saldo_ or  _ganancia_

| Method | Description |
| -------- | ----------- |
| `recarga(number, operator, value, charge)` | Realize a recharge normally to phone. |
| `recargaPaq(number, operador, package, charge)` | Realize a recharge of package |
