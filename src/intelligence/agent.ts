import Api from '../api/request';
import 'dotenv/config';
import { MiNeurona } from './neurona';

class Agent {

    public MiVida = 0;

    private public_code = process.env.PUBLIC_CODE;
    private miNeurona = new MiNeurona();
    private PosicionNueva = null;
    private vidaVieja = 0;

    constructor(){
    }

    public async strategy(board){
      let posicion = this.ObtenerPosicionActual(board);
      let convertirTableroAModelo = this.analyzer(posicion, board);
      let movement = this.miNeurona.ejecutarNeurona(convertirTableroAModelo);

      this.MiVida = (posicion == this.PosicionNueva)? ((movement == 0)? this.MiVida + 1 : 0) : ((movement == 0)? this.vidaVieja + 1 : 0);      

      Api.sendMovement(movement)
      .then((resputa) => {
        this.PosicionNueva = posicion;
        this.vidaVieja = this.MiVida;
        return "OK"
      });
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
                matriz[matriz.length - 1].push((this.MiVida == 3)? 1: 0);
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

    public ObtenerPosicionActual(board){
      for(let i = 0; i < board.length; ++i) {
        if(board[i].usuario == this.public_code){
          return board[i].casilla;
        }
      }
      return undefined;
    }
}

export default new Agent()











