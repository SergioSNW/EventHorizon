alert('Howdy');
import './pr_Juan/oo1.css';
import './pr_Juan/zz1.sass';
// Las lineas añadidas a continuacion son para testear el funcionamiento de Babel

const greet = name => {
    console.log(`hey ${name}`);
};
 
greet();

class miClase {
    constructor(x, y) {
      this.x = x;
      this.y = y;
    }
  
    muestraX() {
      console.log(this.x);
    }
  
    sumar(...valores) {
      let suma = 0;
      for(let i in valores) {
        suma += valores[i];
      }
      return suma;
    }
  }
  
  const miObj = new miClase(2, 5);
  miObj.muestraX();
  
  console.log(miObj.sumar(2, 4, 5, 6));