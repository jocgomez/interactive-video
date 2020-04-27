var status;
var volume = 0.5;
var speed = 1;
var videoFile;

let Press = false;
let iniciar = 0;
let enPregunta = false;

var Opcion112;

function preload() {
    videoFile = createVideo('assets/vid/Carrera_FINAL.mp4', videoLoad);
    imagenOpcion11 = loadImage("assets/img/EL_CILINDRO.jpg");
}

function videoLoad() {
    status = 1;
    videoFile.play();
}

function setup() {
    createCanvas(1920, 1080);
    videoFile.hide();
    videoFile.play();

    //Código para ejecutar las acciones de control de video a partir de los elementos HTML
    document.getElementById("icono-play").addEventListener("click", botonReproducir);
    document.getElementById("icono-up").addEventListener("click", volumeUp);
    document.getElementById("icono-down").addEventListener("click", volumeDown);
    document.getElementsByTagName("video").autoplay = true;

    //Código para identificar cuando clickea una opción en pantalla
    Opcion112 = document.getElementById("opcion1-1");
    Opcion112.addEventListener("click", correcto);

}

function draw() {
    background(255, 255, 255);
    image(videoFile, 0, 0);

    //Función para pausar o reproducir el video
    reproducir();

    Preguntas();
}

function botonReproducir(event) {
    iniciar += 1;
}

function reproducir() {
    //Funcionamiento del botón inicio/pause
    //Si el video se encuentra en una pregunta no se puede pausar ni reproducir el video
    if (enPregunta == false) {
        if (iniciar % 2 == 0) {
            videoFile.pause();
        } else {
            if (iniciar % 2 == 1) {
                videoFile.play();
            }
        }
    }

}

function mouseClicked() {

    if (mouseX > 0 &&
        mouseX < 40 &&
        mouseY > 320 &&
        mouseY < 360) {
        Press = true;
        iniciar += 1;
    } else {
        Press = false;
    }

    if (Press) {
        //establecerFiltro();
    }
}

function playVideo() {
    videoFile.play();
    status = 1;
}

function pauseVideo() {
    videoFile.pause();
    status = 0;
}

function volumeUp(event) {
    volume += 0.1;
    videoFile.volume(volume);
}

function volumeDown(event) {
    volume -= 0.1;
    videoFile.volume(volume);
}

function keyTyped() {
    if (key == ' ') {
        botonReproducir();
        changeImage();
    }
}

function Preguntas() {
    var tiempoVideo = videoFile.time();

    if (tiempoVideo > 5 && tiempoVideo < 5.03) {
        //Se pausa el video
        iniciar = 0;
        pauseVideo();
        //Escondo el botón
        Opcion112.style.display = "block";
        //Se encuentra en una pregunta
        enPregunta = true;
    }
}

function correcto(event) {
    //Establezco el video en cierto tiempo
    videoFile.currentTime = 5.05;
    //Reproduzco el video
    iniciar = 1;
    //Quito de la pantalla el elemento HTML (Boton)
    Opcion112.style.display = "none";
    //Ya no se encuentra en una pregunta
    enPregunta = false;
}