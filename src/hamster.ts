import * as synaptic from 'synaptic'
import * as _ from 'underscore';

let input = new synaptic.Layer(25); // Dos entradas
let output = new synaptic.Layer(4); // Tres salidas

input.project(output); // Conectar la entrada con la salida

let trainingData = [
    {input: 
        [0, 0, 0, 0, 0, 
         0, 0, 0, 0, 0, 
         0, 0, 0, 1, 0,
         0, 0, 0, 0, 0,
         0, 0, 0, 0, 0,
        ], output: [1, 0, 0, 0]}, //No puede mover al frente
    {input: 
        [0, 0, 0, 0, 0, 
         0, 0, 0, 0, 0, 
         0, 0, 0, 0, 0,
         0, 0, 0, 0, 0,
         0, 0, 0, 0, 0,
        ], output: [1, 1, 0, 0]}, //Si no hay nadie, los posibles movimientos
    {input: 
        [0, 0, 0, 0, 0, 
         0, 0, 0, 1, 0, 
         0, 0, 0, 0, 0,
         0, 0, 0, 1, 0,
         0, 0, 0, 0, 0,
        ], output: [0, 0, 1, 1]}, //Comer arriba y abajo
    {input: 
        [0, 0, 0, 0, 0, 
         0, 0, 0, 2, 0, 
         0, 0, 1, 0, 0,
         0, 0, 0, 2, 0,
         0, 0, 0, 0, 0,
        ], output: [0, 0, 1, 1]}, 
    {input: 
        [0, 0, 0, 0, 2, 
         0, 0, 0, 1, 0, 
         0, 0, 1, 0, 0,
         0, 0, 0, 1, 0,
         0, 0, 0, 0, 2,
        ], output: [0, 0, 1, 1]},
    {input: 
        [0, 0, 1, 0, 0, 
         0, 0, 0, 1, 0, 
         0, 0, 0, 0, 0,
         0, 0, 0, 2, 0,
         0, 0, 1, 0, 0,
        ], output: [1, 0, 0, 0]},
    {input: 
        [0, 0, 0, 0, 2, 
         0, 0, 0, 1, 0, 
         0, 0, 0, 0, 0,
         0, 0, 0, 1, 0,
         0, 0, 0, 0, 2,
        ], output: [1, 0, 0, 0]},
     {input: 
        [0, 0, 0, 0, 0, 
         0, 0, 0, 1, 0, 
         0, 0, 0, 0, 2,
         0, 0, 0, 1, 0,
         0, 0, 0, 0, 0,
        ], output: [1, 0, 0, 0]},
    {input: 
        [0, 0, 0, 0, 0, 
         0, 0, 0, 2, 0, 
         0, 0, 0, 0, 2,
         0, 0, 0, 2, 0,
         0, 0, 0, 0, 0,
        ], output: [0, 1, 0, 0]},
    {input: 
        [1, 0, 0, 0, 2, 
         0, 1, 0, 2, 0, 
         0, 0, 0, 2, 0,
         0, 1, 0, 2, 0,
         0, 1, 0, 0, 0,
        ], output: [0, 0, 0, 1]},
    {input: 
        [1, 0, 0, 0, 0, 
         0, 1, 0, 2, 0, 
         0, 0, 0, 2, 0,
         0, 1, 0, 2, 0,
         0, 1, 0, 0, 2,
        ], output: [0, 0, 1, 0]},
    {input: 
        [0, 0, 0, 1, 2, 
         0, 1, 0, 2, 0, 
         0, 0, 1, 0, 0,
         0, 0, 0, 2, 0,
         0, 0, 0, 0, 2,
        ], output: [0, 1, 0, 0]},
    {input: 
        [0, 0, 0, 1, 2, 
         0, 0, 1, 0, 0, 
         0, 0, 1, 0, 1,
         0, 0, 1, 0, 0,
         0, 0, 0, 0, 2,
        ], output: [0, 1, 0, 0]},
];

//Enseñas reglas
//Validar si puede comer o no
//Agregar valores extremos (ultima vida) a los contrincantes (Colocar cont por cada jugador)
//

let learningRate = 0.4;
 
function train() {
    for(let i = 0; i < trainingData.length; i++) {
        input.activate(trainingData[i]["input"]);
        output.activate();
        output.propagate(learningRate, trainingData[i]["output"]);
    }
}

function retrain() {
    for(let i = 0; i < 1000; i++) {
        trainingData = _.shuffle(trainingData);
        train();
    }
}
 
retrain(); // Iniciar el entrenamiento

input.activate(
    [0, 0, 0, 1, 2, 
     0, 0, 1, 0, 0, 
     0, 0, 1, 0, 1,
     0, 0, 1, 0, 0,
     0, 0, 0, 0, 2,
    ]);
let result = output.activate();

let max = -1;
let pos = 0;
for (var i = 0; i < result.length; ++i) {
    if(result[i] > max){
        max = result[i];
        pos = i;
    }
}

switch (pos) {
    case 1:
        console.log("Adelante");
        break;    
    case 2:
        console.log("Arriba");
        break;    
    case 3:
        console.log("Abajo");
        break;    
    default:
        console.log("Quedese quieto");
        break;
}


