import Api from '../api/request';
import 'dotenv/config';
import { NeuralNetwork } from './sypnatic';

class Agent {

    private public_code;
    private neuralNetwork = new NeuralNetwork();
    private myPositionBefore;
    public life = 3;
    private lifeBefore = 0;

    constructor(){
      this.public_code = process.env.PUBLIC_CODE
    }

    public async strategy(board){
      let myPositon = this.getMyPosition(board);
      let convertirTableroAModelo = this.analyzer(myPositon, board);
      let movement = this.neuralNetwork.neuralNetwork(convertirTableroAModelo);

      this.life = (myPositon == this.myPositionBefore)? ((movement == 0)? this.life + 1 : 0) : ((movement == 0)? this.lifeBefore + 1 : 0);      

      Api.sendMovement(movement)
      .then(response=> {
        this.myPositionBefore = myPositon;
        this.lifeBefore = this.life;
        return (response)
      })
    }

    public getMyPosition(board){
      let me = board.find((iam)=>iam.usuario === +this.public_code);
      return (me)? me.casilla : undefined;;
    }

    public analyzer(mePosition, board){
      let letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
      let matriz = [];
      let letter = mePosition.substring(0, 1);
      let column = parseInt(mePosition.substring(1, mePosition.length));
      for (let i = (letters.indexOf(letter) - 1); i <= (letters.indexOf(letter) + 3); ++i) {
          matriz.push([]);
          for (let j = (column - 2); j < (column + 3); ++j) {
            if(i > 0 && j > 0 && i <= 10 && j <= 10){
              let letter_exist = (letters[i - 1]? letters[i - 1]: -1);
              if(letter_exist + "" + j == mePosition){
                matriz[matriz.length - 1].push((this.life == 3)? 1: 0);
              } else {
                let user_exist = board.find((box) => (letter_exist + "" + j) == box.casilla);
                let value = (user_exist && user_exist.color == 'white')? 1 : ((user_exist && user_exist.color == 'black')? 2: 0);
                matriz[matriz.length - 1].push(value);
              }
            } else {
              matriz[matriz.length - 1].push(0);
            }
          }
      }      

      let array = [];
      for (var i = 0; i < matriz.length; ++i) {
        for (var j = 0; j < matriz[i].length; ++j) {
          array.push(matriz[i][j]);
        }
      }

      return array;
    }
}

export default new Agent()











