import {useState, useEffect} from 'react'; /* importando el state */
import Header from "./components/Header";
import Button from "./components/Button";
import {formatearDinero, calcularTotalPagar} from "../helpers";

function App() {
  // const hola = "Hola Mundo";
  const [cantidad, setCantidad] = useState(10000); /* useState nos va a retornar un arreglo, entonces podemos usar destructuring */
  /* el primer valor lo podemos llamar como queramos, el segundo valor ser la funcion que va a modificar el state de ese primer valor */
  /* como regla preferencial, se le pone set y luego el nombre del primer valor, ej setCantidad */
  /* resumen, la variable y la funcion que va a modificar esa variable*/
  /* en el useState va el VALOR INICIAL */
  const [meses, setMeses] = useState(6);
  const [total, setTotal] = useState(0); /*calcularTotalPagar(cantidad,meses) iniciara en 0 */
  const [pago, setPago] = useState(0);

  useEffect(()=> {
    const resultadoTotalPagar = calcularTotalPagar(cantidad,meses);
    setTotal(resultadoTotalPagar);

    //Calcular el pago mensual
    setPago(total / meses);

  }, [cantidad, meses, total]);

  /* las variables de abajo nunca van a cambiar por lo tanto las declaramos como valores normale, no todo tiene que ser STATE(lo de arriba) */
  const MIN = 0;
  const MAX = 20000;
  const STEP = 100;
  console.log(cantidad);

  function handleChange(e){
    // console.log(parent(e.target.value));
    setCantidad(parseInt(e.target.value)); /* no podemos poner cantidad, ya que romperiamos el state, para eso usamos el setCantidad 
    para que este segundo si pueda modificar la cantidad(el primero)*/
  }
  
  function handleClickDecremento(e){
    const valor=  cantidad - STEP;
    if(valor < MIN){
      alert('Cantidad no Valida')
      return;
    }

    setCantidad(valor);
  }

  function handleClickAumento(e){
    const valor=  cantidad + STEP;
    if(valor > MAX){
      alert('Cantidad no Valida')
      return;
    }

    setCantidad(valor);
  }

  return (
    <>
    {/* <h1 className="text-6xl font-extrabold">Hola Mundo</h1> en ves de class, se usa className */}
    <div className="my-20 max-w-lg mx-auto bg-white shadow p-10">
      {/* {hola} imprime hola mundo en la pagina */}
      <Header /> {/* asi se declara el componente */}
      <div className='flex justify-between my-6'>
        <Button 
          operador= '-' /* el operador va a ser el nombre del props */
          fn={handleClickDecremento}
        />

        <Button 
        operador='+'
        fn={handleClickAumento}
        />
      </div>

      <input type="range" 
      className="w-full h-6 bg-gray-200 accent-lime-500 hover:accent-lime-600"
      /* en vez de tener por ejemplo un const formulario = document.querySelector('.formulario') 
      formulario.addEventListener('change') en react solo ponemos onChange={}*/
      onChange={handleChange}
      min={MIN}
      max={MAX}
      step={STEP}
      value={cantidad} /* asi el value inicial sera el de cantidad que es 10K y se posicionara en medio */
      /> {/* los elementos con solo apertura necesita una / al final, como lo son los input e imagenes */}

      <p className='text-center my-10 text-5xl font-extrabold text-indigo-600'>
        {formatearDinero(cantidad)}
      </p> {/* esto nos imprime la cantidad */}  

      <h2 className='text-2xl, font-extrabold text-gray-500 text-center'>
        Elige un <span className='text-indigo-600'>Plazo</span> a Pagar
      </h2>

      <select name="" id="" className='mt-5 w-full p-2 bg-white border border-gray-300 rounded-lg text-center text-xl font-bold text-gray-500' 
      value={meses}
      onChange={e => setMeses(parseInt(e.target.value))}> {/* para que al darle click se cambie al valor que demos click */}
        <option value="6">6 Meses</option>
        <option value="12">12 Meses</option>
        <option value="24">24 Meses</option>
      </select>

      <div className='my-5 space-y-3 bg-gray-50 p-5'>
        <h2 className='text-2xl, font-extrabold text-gray-500 text-center'>
          Resumen <span className='text-indigo-600'>de pagos</span>
        </h2>
        <p className='text-xl text-gray-500 text-center font-bold'>{meses} Meses</p>
        <p className='text-xl text-gray-500 text-center font-bold'>{formatearDinero(total)} Total a Pagar</p>
        <p className='text-xl text-gray-500 text-center font-bold'>{formatearDinero(pago)} Pagos Mensuales</p>
      </div>
    </div>
    </>
  )
}

export default App
