import * as synaptic from 'synaptic'
import * as _ from 'underscore';
import { Models } from './models';

export class NeuralNetwork {

	private models = new Models;
	private input = new synaptic.Layer(25); // Dos entradas
	private output = new synaptic.Layer(4); // Tres salidas
	private trainingData = this.models.getModelsWhite();
	private learningRate = 0.4;

	constructor(){	
		this.input.project(this.output); // Conectar la entrada con la salida
		 
		this.retrain(); // Iniciar el entrenamiento
	}

	public retrain() {
	    for(let i = 0; i < 1000; i++) {
	        this.trainingData = _.shuffle(this.trainingData);
	        this.train();
	    }
	}

	public train() {
	    for(let i = 0; i < this.trainingData.length; i++) {
	        this.input.activate(this.trainingData[i]["input"]);
	        this.output.activate();
	        this.output.propagate(this.learningRate, this.trainingData[i]["output"]);
	    }
	}

	public neuralNetwork(board){
        console.log(board[0] + ", " + board[1] + ", " + board[2] + ", " + board[3] + ", " + board[4]);
        console.log(board[5] + ", " + board[6] + ", " + board[7] + ", " + board[8] + ", " + board[9]);
        console.log(board[10] + ", " + board[11] + ", " + board[12] + ", " + board[13] + ", " + board[14]);
        console.log(board[15] + ", " + board[16] + ", " + board[17] + ", " + board[18] + ", " + board[19]);
        console.log(board[20] + ", " + board[21] + ", " + board[22] + ", " + board[23] + ", " + board[24]);
      	
		this.input.activate(board);
		let result = this.output.activate();

		let max = -1;
		let pos = 0;
		for (var i = 0; i < result.length; ++i) {
		    if(result[i] > max){
		        max = result[i];
		        pos = i;
		    }
		}
		console.log("movimiento: " + pos);

		return pos; 
	}
}


