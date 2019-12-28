import NeuralNetwork from './NeuralNetwork'

function sigmoid(x){
	return 1 / (1 + Math.exp(-x))
}

function dSigmoid(x){
	return x * (1 - x)
}

function start(){
	var nn = new NeuralNetwork(2, 3, 1)

	//XOR PROBLEM
	dataSet = {
		inputs:
			[[1, 1],[1, 0],[0, 1],[0, 0]],
		outputs:
			[[0],[1],[1],[0]]
	}

	training = true

	let inicio = new Date().getTime()
	while(training){

		for(var i = 0; i < 10000; i++){
			var index = Math.floor(Math.random() * 4)

			nn.training(dataSet.inputs[index], dataSet.outputs[index])
		}

		console.log(nn.predict([0,0])[0]  + "\n" + nn.predict([0,1])[0])

		if(nn.predict([0,0])[0] < 0.01 && nn.predict([0,1])[0] > 0.99){
			training = false
			let final = new Date().getTime()
			let tempo = (final - inicio) / 1000
			console.log("Aprendeu em " + tempo + " segundos")
		}
	}

}

start()