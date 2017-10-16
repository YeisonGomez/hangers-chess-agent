// ============================================
//HangersChess TypeScript Smart Agent
//@Authors: [Yeison Gomez, Cristiam Diaz]
// ============================================

'use strict';
import Api from './api/request'
import Agent from './intelligence/agent'

class Main{
  turn

  constructor(){
    this.turn = 0
    this.Init()

    Api.sendMovement(2)
    //Agent.life++;
  }

  public async Init(){
    //Check game status
     let gameStatus = await Api.gameStatus()
     console.log(`Current Turn is: ${this.turn}`)
      this.turn = gameStatus['turno']
      if(this.turn == -1) {
        console.log(`Game over`)
        process.exit()
      }
      else if(this.turn == -3){ 
        console.log(`You are winner`)
        process.exit()
      }
      else if(this.turn == -10){ 
        console.log(`You are dead`)
        process.exit()
      } else {
        //Send board to your Agent
        if(gameStatus['tablero']){
          Agent.strategy(gameStatus['tablero'])
        }
        console.log("===========");
        //Call recursively
        this.Init()
      }
  }

}

new Main()