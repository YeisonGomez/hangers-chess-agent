// ============================================
//API Request to Hanger Chess

import axios from 'axios'
import * as qs from 'qs'
import 'dotenv/config'

class Api{

    api_url
    private_code
    public_code

    constructor(){
      this.api_url = process.env.API_URL
      this.private_code = process.env.PRIVATE_CODE
      this.public_code = process.env.PUBLIC_CODE
    }

    public async gameStatus(){
      return await axios.get(this.api_url+'/box/table/get-table/'+this.public_code)
        .then(function (response) {
          return(response.data)
        })
        .catch(function (error) {
          console.log("El servidor esta apagado")
          throw new Error(error);
        })
    }

    public sendMovement(movement){
      return new Promise ((resolve, reject) => {
        axios({
          method: 'post',
          url: this.api_url+'/user/update-movement',
          data: qs.stringify({
            'code': this.private_code, 
            'movimiento': movement
          }),
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        })
        .then(function (response) {
          resolve(response.data);
        })
        .catch(function (error) {
          console.log("El servidor esta apagado")
          throw new Error(error);
        })
      })
    }
}

export default new Api();