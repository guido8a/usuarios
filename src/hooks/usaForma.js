import { useState } from "react";

/*este hook sirve para manejar los contenidos de los input
***********************************************************/
//se puede poner también aquí la lógica de validaciones, etc.
export const useForma = (estadoInicial = {}) => {

    const [valores, setValores] = useState( estadoInicial );

    const resetea = () => {
        setValores(estadoInicial);
    }

    const manejaCambios = ({ target }) => {
        setValores({
          ...valores, 
          [target.name]: target.value
        })
      }

      return [ valores, manejaCambios, resetea ];
}