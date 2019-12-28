const NeuralNetwork = require('./NeuralNetwork')

function start(){
	//Teste da Rede Neural
	//XOR PROBLEM

	var nn = new NeuralNetwork(2, 3, 1)
	
	dataSet = {
		inputs:
			[[1, 1],[1, 0],[0, 1],[0, 0]],
		outputs:
			[[0],[1],[1],[0]]
	}

	training = true

	let start = new Date().getTime()
	while(training){

		for(var i = 0; i < 10000; i++){
			var index = Math.floor(Math.random() * 4)
			nn.training(dataSet.inputs[index], dataSet.outputs[index])
		}

		console.log(nn.predict([0,0])[0]  + " " + nn.predict([0,1])[0])

		if(nn.predict([0,0])[0] < 0.01 && nn.predict([0,1])[0] > 0.99){
			training = false
			let final = new Date().getTime()
			let time = (final - start) / 1000
			console.log("Aprendeu em " + time + " segundos")
		}
	}
}

start()