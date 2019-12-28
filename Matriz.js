export default class Matriz{
	constructor(rows, columns){
		this.rows = rows
		this.columns = columns
		this.data = []

		for (let i = 0; i < rows; i++) {
			let array = []
			for (let i = 0; i <	columns; i++) {
				array.push(0)
			}
			this.data.push(array)
		}
	}

	map(func){
		this.data = this.data.map((array, i) => {
			return array.map((num, j) => {
				return func(num, i, j)
			})
		})

		return this
	}

	randomize(){
		this.map((element, i, j) => {
			return Math.random() * 2 - 1
		})
	}

	print(){
		console.table(this.data)
	}

	static map(matriz, func){
		let matrizResult = new Matriz(matriz.rows, matriz.columns)

		matrizResult.data = matriz.data.map((array, i) => {
			return array.map((num, j) => {
				return func(num, i, j)
			})
		})

		return matrizResult
	}

	static arrayToMatriz(array){
		let matriz = new Matriz(array.length, 1)

		matriz.map((element, i, j) => {
			return array[i]
		})

		return matriz
	}

	static matrizToArray(matriz){
		let array = []

		matriz.map((element, i, j) => {
			array.push(element)
		})

		return array
	}

	static transpose(matrizA){
		var matrizResult = new Matriz(matrizA.columns, matrizA.rows)

		matrizResult.map((element, i, j) => {
			return matrizA.data[j][i]
		})

		return matrizResult
	}

	static hadamard(matrizA, matrizB){
		var matrizResult = new Matriz(matrizA.rows, matrizA.columns)

		matrizResult.map((num, i, j) => {
			return matrizA.data[i][j] * matrizB.data[i][j]
		})

		return matrizResult
	}

	static escalarMultiplication(matrizA, escalar){
		var matrizResult = new Matriz(matrizA.rows, matrizA.columns)

		matrizResult.map((num, i, j) => {
			return matrizA.data[i][j] * escalar
		})

		return matrizResult
	}

	static sum(matrizA, matrizB){
		var matrizResult = new Matriz(matrizA.rows, matrizA.columns)

		matrizResult.map((num, i, j) => {
			return matrizA.data[i][j] + matrizB.data[i][j]
		})

		return matrizResult
	}

	static subtract(matrizA, matrizB){
		var matrizResult = new Matriz(matrizA.rows, matrizA.columns)

		matrizResult.map((num, i, j) => {
			return matrizA.data[i][j] - matrizB.data[i][j]
		})

		return matrizResult
	}

	static multiplication(matrizA, matrizB){
		let matrizResult = new Matriz(matrizA.rows, matrizB.columns)

		matrizResult.map((num, i, j) => {
			let sum = 0

			for(let k = 0; k < matrizA.columns; k++){
				let e1 = matrizA.data[i][k]
				let e2 = matrizB.data[k][j]
				sum += e1 * e2
			}

			return sum
		})

		return matrizResult
	} 
}