const Matriz = require('./Matriz')

function sigmoid(x){
	return 1 / (1 + Math.exp(-x))
}

function dSigmoid(x){
	return x * (1 - x)
}

module.exports = class NeuralNetwork{
	constructor(input, hidden, output){
		this.input = input
		this.hidden = hidden
		this.output = output

		this.biasIH = new Matriz(hidden, 1)
		this.biasIH.randomize()
		this.biasHO = new Matriz(output, 1)
		this.biasHO.randomize()

		this.weigthIH = new Matriz(hidden, input)
		this.weigthIH.randomize()

		this.weigthHO = new Matriz(output, hidden)
		this.weigthHO.randomize()

		this.learningRate = 0.1
	}

	training(array, target){

		//FORWARD

		//input -> hidden

		let input = Matriz.arrayToMatriz(array)

		let hidden = Matriz.multiplication(this.weigthIH, input)
		hidden = Matriz.sum(hidden, this.biasIH)
		hidden.map(sigmoid)
		
		//hidden -> output

		let output = Matriz.multiplication(this.weigthHO, hidden)
		output = Matriz.sum(output, this.biasHO)
		output.map(sigmoid)


		//BACKPROPAGATION

		// output -> hidden		

		let expected = Matriz.arrayToMatriz(target)
		let outputError = Matriz.subtract(expected, output)
		let dOutput = Matriz.map(output, dSigmoid)
		let hiddenTranspost = Matriz.transpose(hidden)

		let gradient = Matriz.hadamard(outputError, dOutput)
		gradient = Matriz.escalarMultiplication(gradient, this.learningRate)

		this.biasHO = Matriz.sum(this.biasHO, gradient)

		let weigthHODeltas = Matriz.multiplication(gradient, hiddenTranspost)

		this.weigthHO = Matriz.sum(this.weigthHO, weigthHODeltas)

		//hidden -> input

		let weigthHOTranspost = Matriz.transpose(this.weigthHO)
		let hiddenError = Matriz.multiplication(weigthHOTranspost, outputError)
		let dHidden = Matriz.map(hidden, dSigmoid)
		let inputTranspost = Matriz.transpose(input)

		let gradientHidden = Matriz.hadamard(hiddenError, dHidden)
		gradientHidden = Matriz.escalarMultiplication(gradientHidden, this.learningRate)

		this.biasIH = Matriz.sum(this.biasIH, gradientHidden)

		let weigthIHDeltas = Matriz.multiplication(gradientHidden, inputTranspost)

		this.weigthIH = Matriz.sum(this.weigthIH, weigthIHDeltas)
	}

	predict(array){
		//FORWARD

		//input -> hidden

		let input = Matriz.arrayToMatriz(array)

		let hidden = Matriz.multiplication(this.weigthIH, input)
		hidden = Matriz.sum(hidden, this.biasIH)

		hidden.map(sigmoid)
		
		//hidden -> output

		let output = Matriz.multiplication(this.weigthHO, hidden)
		output = Matriz.sum(output, this.biasHO)
		output.map(sigmoid)

		return Matriz.matrizToArray(output)
	}
}