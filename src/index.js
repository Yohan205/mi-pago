const fetch = require('node-fetch');
const config = require('../settings/config');
const operadores = require("../utils/operadores");
const paquetes = require("../utils/paquetes");

class miPago {
    #API = config.get('URI');
    #dataBody = config.get("headers")
    #results
    #data
    bill = new Map()
  
    /**
     *  | MiPago - API |
     * @param {Object} key Object with user and password 
     * @return Constructor
     */
    constructor(key) {
      if (!key) throw new Error("Invalid key");
      this.#data = key;
      const date = new Date();
      this.tk = `D${date.getDate()}M${(date.getMonth()+1)}A${date.getFullYear()}.H${date.getHours()}MN${date.getMinutes()}S${date.getSeconds()}`;
    }
  
    /**
     *  | MiPago - Saldo |
     * @return String - Devuelve el valor de saldo de la cuenta
     */
    get saldo() {
      let queryEstado = this.queryBalance().then( data => data.Estado);
  
      let querySaldo = this.queryBalance("saldo");
  
      if (queryEstado == "false") throw new Error("Operation failed");
  
      return querySaldo
    }
  
    /**
     *  | MiPago - Ganancia |
     * @return String - Devuelve el valor de ganancia de la cuenta
     */
    get gain() {
      let queryEstado = this.queryBalance().then( data => data.Estado);
  
      let queryGanancia = this.queryBalance("ganancia");
  
      if (queryEstado == "false") throw new Error("Operation failed");
  
      return queryGanancia
    }
  
    #cobroType(cobro){
      // If cobro is saldo, the type is 0
      switch (cobro.toLowerCase()) {
      case "saldo":
        return 0;
      
      case "ganancia":
        return 1;
  
      default:
        throw new Error("Invalid value for cobro, must be saldo or ganancia");
      }
    }
  
    #checkNumber(numero) {
      const stringNumero = String(numero).replace(/\s/g, "");
      
      if (!/^(\+57)?3\d{9}$/.test(stringNumero)) {
        return false;
      }
    
      const numero10Caracteres = stringNumero.slice(-10);
      return numero10Caracteres;
    }
  
    #cleanCost(valor) {
      const string = valor.toString();
      const numero = parseInt(string, 10);
    
      // Verificar si no es un número entero o no es múltiplo de 1000
      if (isNaN(numero) || numero % 1000 !== 0) {
        return false;
      }
    
      const sinPuntuacion = string.replace(/[.,]/g, '');
      return sinPuntuacion;
    }

    #checkString(toCheck) {
      if (typeof toCheck !== 'string') {
      throw new Error('It\'s not string.');
      }
      
      return toCheck.toLowerCase();
    }

    #fetchAPI(body) {
      return fetch(this.#API, body)
      .then(ans => ans.json())
      .catch(err => err);
    }
    
    	/**
	 *  | MiPago - Consulta Saldo |
	 * @param {String} queryString consulta saldo or ganancia 
	 * @return {Object} Object with data or value String
	 */
	queryBalance(queryString) {
    // Añade consulta al objeto data
    this.#data.consulta = "saldo";

    // Complete the headers with the body data in json format
    this.#dataBody.body = JSON.stringify(this.#data)

    // Realiza el fetch a la API y da como resultado un objeto con la consulta
    this.#results = this.#fetchAPI(this.#dataBody).then(res => res).catch(err => err);

    // If queryString isn't empty, so return the Saldo or Ganancia
    switch (queryString) {
      case "saldo":
        this.#results = this.#results.then( res => res.Saldo).catch(err => err)
        break;
    
      case "ganancia":
        this.#results = this.#results.then( res => res.Ganancia).catch(err => err)
        break;
      default:
        break;
    }

    return this.#results
	}

	/**
	 *  | MiPago - Consulta Venta |
	 * @param {Number} queryToken Token sent on sale
	 * @return {Object} Object with data or value String
	 */
	querySell(queryToken){
		// Añade consulta al objeto data
		this.#data.consulta = "venta";
		this.#data.tk = queryToken;
		if (!queryToken) throw new Error("Token not found");

		// Complete the headers with the body data in json format
		this.#dataBody.body = JSON.stringify(this.#data)

		// Realiza el fetch a la API y da como resultado un objeto con la consulta
		this.#results = fetchAPI(this.#dataBody)
		.then( ans => ans).catch( err => err );

		// res.tk = queryToken
		// this.#results = Object.assign(res, resul);
		this.#results.tk = queryToken
		return this.#results
	}

	/**
	 *  | MiPago - Recarga |
	 * @param {number} number - Phone number to send
	 * @param {String} operador Chip operator to send
	 * @param {number} valor - Value to send in pesos
	 * @param {String} cobro Saldo - Ganancia
	 * @return {Object} Object with data
	 */
	recarga(number, operador, valor, cobro){
		number = this.#checkNumber(number)
		operador = this.#checkString(operador)
		valor = this.#cleanCost(valor);

		if (!this.#checkNumber(number)) throw new Error("Invalid phone number");

		// Check if valor is a multiple of 1000
		if (valor === false) throw new Error("Invalid cost");

		// Get the ID of the operador
		const operadorID = operadores[operador];
		if (!operadorID) throw new Error("Invalid operador E1");

    // identify the type of cobro
		cobro = this.#cobroType(cobro);
		if (this.saldo < parseInt(valor)) throw new Error("Balance insufficient");

		this.#data = Object.assign(this.#data, {
		"o": operadorID,
		"n": number,
		"v": valor,
		"tk": this.tk,
		"t": cobro
		})

    this.bill.set(this.tk, {"number": number, "value": valor, "operator": operador});

		// Complete the headers with the body data in json format
		this.#dataBody.body = JSON.stringify(this.#data);

		fetchAPI(this.#dataBody)
		.then( res => {
      this.#results = res;
      this.#results.tk = this.tk;
		  
      return this.#results;
		})
		.catch( err => {
      this.#results = err;
      this.#results.tk = this.tk;
		  
      return this.#results;
    });
	}
  
  /**
	 *  | MiPago - Recarga Paquetes|
	 * @param {number} number - Phone number to send
	 * @param {String} operador Chip operator to send
	 * @param {number} paq - paqID to send
	 * @param {String} cobro Saldo - Ganancia
	 * @return {Object} Object with data
	 */
	recargaPaq(number, operador, paq, cobro){
		number = this.#checkNumber(number)
		operador = this.#checkString(operador);
	
		if (!this.#checkNumber(number)) throw new Error("Invalid phone number");
	
		// Get the ID of the operador
		const operadorID = paquetes.get(operador).id;
		// Get the packges of operador
		const paqs = paquetes.get(operador).paqs;
		// if (!operadorID) throw new Error("Invalid operador. E1");

		paq = paqs.find(e => e.id == paq)

		if (!paq) throw new Error("Invalid package id");
	
		// Save the type of the cobro
		cobro = this.#cobroType(cobro);
	
		this.#data = Object.assign(this.#data, {
			"o": operadorID,
			"n": number,
			"p": paq,
			"tk": this.tk,
			"t": cobro
		})
	
		this.bill.set(this.tk, {"number": number, "value": valor, "operator": operador});
	
		// Complete the headers with the body data in json format
		this.#dataBody.body = JSON.stringify(this.#data);
	
		fetchAPI(this.#dataBody)
		.then( res => {
      this.#results = res;
      this.#results.tk = this.tk;
		  
      return this.#results;
		})
		.catch( err => {
      this.#results = err;
      this.#results.tk = this.tk;
		  
      return this.#results;
    });
	}

  /**
   *  | MiPago - Consulta Paquetes por operador |
   * @param {Strign} operador - Operator to search package
   * @param {String} filter - Filter to search package (optional)
   * @return {Array} Array with all packages found
   */
  queryPaqs(operador, filter = "") {
    if (!operador) throw new Error("Invalid operator");

	  operador = this.#checkString(operador);
	  filter = this.#checkString(filter);
    const paqsOp = paquetes.get(operador);
    const paqs = paqsOp.paqs;

	switch (filter) {
		case "minutos":
		  const filteredMinutos = paqs.filter(e => {
			  const name = e.name.toLowerCase();
        return (
          name.includes("min") &&
          !name.includes("todo incluido") &&
          !name.includes("internet") &&
          !(name.includes("gb") || name.includes("mb"))
        );
		  });
		  return filteredMinutos;
	
		case "internet":
		  const filteredInternet =  paqs.filter(e => {
			  const name = e.name.toLowerCase();
        return (
          name.includes("internet") ||
          name.includes("navegacion") &&
          !name.includes("todo incluido") &&
          !name.includes("min")
        );
		  });
		  return filteredInternet;

    case "ti":
      const filteredTD =  paqs.filter(e => {
        const name = e.name.toLowerCase();
        return (
          (name.includes("todo incluido") || 
            name.includes("what") ||
            name.includes("internet") ||
            name.includes("gb") || name.includes("mb") 
          ) &&
          name.includes("min")
        );
      });
      return filteredTD;
	
		default:
		  return paqs;
	  }
  }
  }

/** | MiPago - API | -
 * This a module that provides methods to manage the API of MiPago
 * @module miPago
 */
module.exports = miPago