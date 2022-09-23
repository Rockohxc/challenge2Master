function clase(str){
    return document.querySelector(str);
}

var palabras = [["jupiter"], ["saturno"], ["mercurio"], ["venus"], ["marte"], ["tierra"], ["urano"], ["neptuno"], ["pluton"], ["estrella"], ["titan"], ["telescopio"], ["ciencia"], ["galaxia"], ["espacio"], ["astronauta"], ["cohete"], ["luna"], ["ceres"], ["eris"], ["cometa"], ["meteorito"], ["asteroide"], ["europa"], ["alien"], ["planeta"], ["oxigeno"], ["orbita"],["nasa"], ["nave"]];
// Palabra a averiguar
var palabra = "";
var guion;
//Imagenes
var imagenAstro = clase('.imagen-astro');
// Num aleatorio
var random;
// Elemento html de la palabra
var parrafoPalabra = clase(".parrafo-palabra");
// Contador de intentos
var intentos = clase('.intentos');
var conteoAciertos = 0;
var conteoErrores = 6;
// Boton de reset
const nuevojuego = clase(".nuevo-juego");
// Botones inicar, agragar, pista y desistir
const btnIniciar = clase(".btn-iniciar");
const btnInicioAgregar = clase(".btn-inicio-agregar");
const btnDesistir = clase('.desistir');
// Abecedario
const letrasAbecedario = document.querySelectorAll('#btn-letra');
var boton;
var letra;
var intentosFin = clase('.intentos-finjuego');
// Secciones
const sectionIniciar = clase('.section-iniciar');
const sectionJuegoAhorcado = clase('.section-juego-ahorcado');
const sectionAgregar = clase('.section-agregar-palabra');
const divAstro = clase('.div-imagen-astro');
var inputAgregarPalabra = clase('.input-agregar-palabra');
var descripcionAgregar = clase('.descripcion-agregar-palabra');
const btnAgregarJugar = clase('.btn-agregar-jugar');
const btnCancelar = clase('.btn-cancelar');




//Seccion agregar palabra
function SectionAgregarPalabra(){
    btnAgregarJugar.disabled='true';
    sectionIniciar.style.display='none';
    sectionAgregar.style.display='flex';
    inputAgregarPalabra.value='';
}

function esValido(c) {
    c = c.charCodeAt(0);
    return (c >= 97 && c <= 122) || (c >=65 && c <=90);
}
function validarEntrada(cadena) {
    for (var i = 0; i < cadena.length; i++) {
    if (!esValido(cadena[i])) {
        break;
        }
    }
    return i == cadena.length;
}   
function validarInput(elem) {
    var txt = elem.value;
    if (!validarEntrada(txt)||inputAgregarPalabra.value=="") {
        elem.classList.add('invalido');
        btnAgregarJugar.disabled=true;
        descripcionAgregar.textContent='Máximo 10 caracteres. Sólo letras.';
        } else {
        elem.classList.remove('invalido');
        btnAgregarJugar.disabled=false;        
    }
}
// BOTON AGREGAR Y JUGAR
function agregarJugar(){
    palabras.push([inputAgregarPalabra.value]);
    iniciarJuegoAstro();
    palabraAzar();
}

// BOTON CANCELAR DE AGREGAR PALABRA
function cancelar(){
    sectionIniciar.style.display='flex';
    sectionAgregar.style.display='none';
    inputAgregarPalabra.value='';
    inputAgregarPalabra.classList.remove('invalido');
    descripcionAgregar.textContent='Las palabras que agregues se eliminarán cuando actualices la página.';
}

btnInicioAgregar.onclick= SectionAgregarPalabra;
btnAgregarJugar.onclick = agregarJugar;
btnCancelar.onclick = cancelar;

// Iniciar juego
btnIniciar.onclick = function () {
    iniciarJuegoAstro();
    palabraAzar();   
}


function iniciarJuegoAstro(){

    sectionIniciar.style.display='none';
    sectionAgregar.style.display='none';
    sectionJuegoAhorcado.style.display='flex';
    divAstro.style.display='flex'
}

//Generar palabra al azar
function palabraAzar(){
    imagenAstro.src='img/astro/astronauta6.png';
    conteoAciertos=0;
    conteoErrores=6;
    intentosFin.innerHTML=('Intentos restantes: '+ conteoErrores);
    for(i=0;i<letrasAbecedario.length;i++){
        letrasAbecedario[i].disabled=false;
    }
    parrafoPalabra.textContent='';
    random = Math.floor(Math.random()*palabras.length);
    palabra = palabras[random][0].toUpperCase();
    for(i=0;i<palabra.length; i++){
        let espacio = document.createElement('span');
        guion=document.createTextNode('_');
        espacio.appendChild(guion);
        parrafoPalabra.appendChild(espacio);
    } 
   
    palabras.splice(palabras.indexOf(palabras[random]),1); 
}

nuevojuego.onclick=palabraAzar;


//Funcion al hacer click en letras
for(i=0;i<letrasAbecedario.length;i++){
    letrasAbecedario[i].addEventListener('click', clickLetras);
}
function clickLetras(event){
    const guiones = document.querySelectorAll('.parrafo-palabra span');
    boton = event.target;
    boton.disabled=true;
    letra=boton.innerHTML.toUpperCase();
    let acierto = false;
    for(i=0;i<palabra.length;i++){
        if(letra==palabra[i]){
            acierto=true;
            guiones[i].innerHTML=letra;
            conteoAciertos++;
        }
    }
    if(acierto==false){
        conteoErrores--;
        var Gsource = `img/astro/astronauta${conteoErrores}.png`;
        imagenAstro.src = Gsource;
        intentosFin.innerHTML=('Intentos restantes: '+ conteoErrores);
    }
    
    if(conteoErrores==0){
        intentosFin.innerHTML=('Fin del juego! La palabra era:');
        parrafoPalabra.innerHTML=(palabra);
        gameOver();
    }else if(conteoAciertos==palabra.length){
        intentosFin.innerHTML=('Felicitaciones, ganaste!');
        imagenAstro.src='img/astro/ganaste.png';
        gameOver();
    }
}

//Termino el juego, deshabilitar letras
function gameOver(){
    for(i=0;i<letrasAbecedario.length;i++){
        letrasAbecedario[i].disabled=true;
    }
}

// Desistir y volver al inicio
btnDesistir.onclick= desistir;
function desistir(){
    sectionIniciar.style.display='flex';
    sectionAgregar.style.display='none';
    sectionJuegoAhorcado.style.display='none';
    conteoErrores=6;
}
