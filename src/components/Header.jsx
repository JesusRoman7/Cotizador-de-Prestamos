//los componentes son reutilizables, van dentro de src con una carpeta llamada components y su nombre empieza con MAYUS, ej Header
//y terminan en jsx, ej Header.jsx
function Header(){ //son funciones, y dentro de las funciones hay un return, ahi es donde va el codigo 

    return(
        <h1 className="text-4xl font-extrabold text-gray-500 text-center">
        ¿Cuanto <span className="text-indigo-600">dinero</span> necesitas?
      </h1>
    )
}

export default Header; //exportamos nuestro componente hacia la App.jsx en SRC