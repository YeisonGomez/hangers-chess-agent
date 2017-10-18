import * as synaptic from 'synaptic'
import * as _ from 'underscore';
import { Models } from './models';

export class MiNeurona {

	private models = new Models;
	private input = new synaptic.Layer(25); //Entradas
	private output = new synaptic.Layer(4); //Salidas
	private datosEntrenamiento = this.models.modeloNegro();
	private learningRate = 0.4;

	constructor(){	
		this.input.project(this.output);
		this.retrain();
	}

	public retrain() {
	    for(let i = 0; i < 1000; i++) {
	        this.datosEntrenamiento = _.shuffle(this.datosEntrenamiento);
	        this.train();
	    }
	}

	public train() {
	    for(let i = 0; i < this.datosEntrenamiento.length; i++) {
	        this.input.activate(this.datosEntrenamiento[i]["input"]);
	        this.output.activate();
	        this.output.propagate(this.learningRate, this.datosEntrenamiento[i]["output"]);
	    }
	}

	public ejecutarNeurona(tablero){
		this.input.activate(tablero);
		let result = this.output.activate();
		let max = -1;
		let pos = 0;
		for (var i = 0; i < result.length; ++i) {
		    if(result[i] > max){
		        max = result[i];
		        pos = i;
		    }
		}
		console.log("movimiento final: " + pos);
		return pos; 
	}
}


