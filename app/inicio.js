var volume = 0.5;
var speed = 1;
//Video principal
var videoFile;
//Videos de opciones incorrectas
var videoError1;
var videoError2;
var videoError3;
var videoError4;
//Variable que va a guardar el tiempo del video reproducido
var tiempoVideo = 0;
//Variable que guarda la duración del video para crear la barra de progreso
var duracionVideo = 0;

//Variable para reproducir o pausar el video
let iniciar = 0;
//Variable para identificar cuando se encuentra en una pregunta, de esta manera se permite o no la funcion de pausar
let enPregunta = false;
//Variable para reproducir el video principal en caso de que se seleccione una opcion correcta o de lo contrario los videos de las opciones incorrectas
let correcta = true;
//Variable para establecer cual de los videos de opcion incorrecta reproducir
let incorrecta = 0;
//Variable para almacenar el puntaje
let puntaje = 0;
//Variable para establecer una serie de intentos
let intentos = 3;

var Opciones11;

function preload() {
    videoFile = createVideo('assets/vid/Oso Etapa 1 (TODO).mp4', videoLoad);
    videoError1 = createVideo('assets/vid/Oso Etapa 1 E1.mp4', videoLoad);
    videoError2 = createVideo('assets/vid/Oso Etapa 1 E2.mp4', videoLoad);
    videoError3 = createVideo('assets/vid/Oso Etapa 1 E3.mp4', videoLoad);
    videoError4 = createVideo('assets/vid/Oso Etapa 1 E4.mp4', videoLoad);
    imagenOpcion11 = loadImage("assets/img/EL_CILINDRO.jpg");
}

function videoLoad() {
    videoFile.play();
    videoError1.play();
    videoError2.play();
    videoError3.play();
    videoError4.play();
}

function setup() {
    createCanvas(1920, 1080);
    videoFile.hide();
    videoError1.hide();
    videoError2.hide();
    videoError3.hide();
    videoError4.hide();


    //Código para ejecutar las acciones de control de video a partir de los elementos HTML
    document.getElementById("icono-play").addEventListener("click", botonReproducir);
    document.getElementById("icono-up").addEventListener("click", volumeUp);
    document.getElementById("icono-down").addEventListener("click", volumeDown);
    document.getElementsByTagName("video").autoplay = true;

    //Código para identificar cuando clickea una opción en pantalla
    Opciones11 = document.getElementById("opcion1-1");
    Opciones12 = document.getElementById("opcion1-2");
    Opciones13 = document.getElementById("opcion1-3");
    Opciones14 = document.getElementById("opcion1-4");
    Opciones15 = document.getElementById("opcion1-5");
    Opciones16 = document.getElementById("opcion1-6");
    Opciones17 = document.getElementById("opcion1-7");

    //Corazones, intentos del estudiante
    corazon1 = document.getElementById("corazon1");
    corazon2 = document.getElementById("corazon2");
    corazon3 = document.getElementById("corazon3");

    //Código para llamar a la funcion si es correcta o incorrecta
    Opciones11.addEventListener("click", correcto1);
    Opciones12.addEventListener("click", correcto1);
    Opciones13.addEventListener("click", correcto1);
    Opciones14.addEventListener("click", correcto1);
    Opciones15.addEventListener("click", incorrecto1);
    Opciones16.addEventListener("click", incorrecto1);
    Opciones17.addEventListener("click", incorrecto1);
}

function draw() {

    background(255, 255, 255);

    if (correcta) {
        //Se dibuja en pantalla el video principal
        image(videoFile, 0, 0);
    } else {
        //En caso de que se seleccione una opción incorrecta, se reproduce su respectivo video
        switch (incorrecta) {
            case 1:
                image(videoError1, 0, 0);
                break;
            case 2:
                image(videoError2, 0, 0);
                break;
            case 3:
                image(videoError3, 0, 0);
                break;
            case 4:
                image(videoError4, 0, 0);
                break;
        }

    }

    //Función para pausar o reproducir el video
    reproducir();
    //Función para establecer las preguntas en su determinado tiempo
    Preguntas();

    // Definir colores
    fill(255, 0, 0);
    noStroke();
    //Rectangulo inferior que se completa a partir de la duración del video, progreso del estudiante durante el video
    rect(10, 1065, (tiempoVideo * 1900) / duracionVideo, 5);
}

//Función para cuando presione el botón html y presione la barra espaciadora
function botonReproducir(event) {
    //Iniciar si es par, pausa el video, si es impar lo reproduce, al aumentarlo, se intercambia
    iniciar += 1;
}

function reproducir() {
    //Funcionamiento del botón inicio/pause
    //Si el video se encuentra en una pregunta no se puede pausar ni reproducir el video
    if (enPregunta == false) {
        //Si la variable iniciar es par se pausa el video, de lo contrario se reproduce
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

}

function playVideo() {
    videoFile.play();
}

function pauseVideo() {
    videoFile.pause();
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
    //Al presionar la barra espaciadora, llama a la funcion para cambiar la variable "iniciar"
    if (key == ' ') {
        botonReproducir();
        //Se llama la función js presente en el html que cambia el icono del boton de reproducir
        changeImage();
    }
    if (key == 'e') {
        //Al presionar la tecla e, se sale del video que se reproduce al seleccionar una respuesta incorrecta
        correcta = true;
    }
}

//Función donde se establecen todos los tiempos de las preguntas presentes en el video
function Preguntas() {
    //Se guarda el tiempo del video actual
    tiempoVideo = videoFile.time();
    //Duración del video actual
    duracionVideo = videoFile.duration();

    //Pregunta 1
    if (tiempoVideo > 10 && tiempoVideo < 10.03) {
        //Se pausa el video
        iniciar = 0;
        pauseVideo();
        //Escondo el botón
        Opciones11.style.display = "block";
        Opciones15.style.display = "block";
        Opciones16.style.display = "block";
        Opciones17.style.display = "block";
        //Se encuentra en una pregunta, esto hace que no pueda pausar o reproducir el video
        enPregunta = true;
    }

    //Pregunta 2
    else if (tiempoVideo > 30 && tiempoVideo < 30.03) {
        //Se pausa el video
        iniciar = 0;
        pauseVideo();
        //Escondo el botón
        Opciones12.style.display = "block";
        Opciones15.style.display = "block";
        Opciones16.style.display = "block";
        Opciones17.style.display = "block";
        //Se encuentra en una pregunta, esto hace que no pueda pausar o reproducir el video
        enPregunta = true;
    }

    //Pregunta 3
    else if (tiempoVideo > 45 && tiempoVideo < 45.03) {
        //Se pausa el video
        iniciar = 0;
        pauseVideo();
        //Escondo el botón
        Opciones13.style.display = "block";
        Opciones15.style.display = "block";
        Opciones16.style.display = "block";
        Opciones17.style.display = "block";
        //Se encuentra en una pregunta, esto hace que no pueda pausar o reproducir el video
        enPregunta = true;
    }


    //Pregunta 4
    else if (tiempoVideo > 60 && tiempoVideo < 60.03) {
        //Se pausa el video
        iniciar = 0;
        pauseVideo();
        //Escondo el botón
        Opciones14.style.display = "block";
        Opciones15.style.display = "block";
        Opciones16.style.display = "block";
        Opciones17.style.display = "block";
        //Se encuentra en una pregunta, esto hace que no pueda pausar o reproducir el video
        enPregunta = true;
    }

}

function correcto1(event) {

    //Se guarda el tiempo del video principal
    tiempoVideo = videoFile.time();

    //Se identifican los tiempos de las preguntas para establecer un tiempo seguido y continuar

    //Pregunta 1
    if (tiempoVideo > 10 && tiempoVideo < 10.03) {
        //Establezco el video en cierto tiempo
        videoFile.currentTime = 15;

    }

    //Pregunta 2
    else if (tiempoVideo > 30 && tiempoVideo < 30.03) {
        //Establezco el video en cierto tiempo
        videoFile.currentTime = 35;
    }

    //Pregunta 3
    else if (tiempoVideo > 45 && tiempoVideo < 45.03) {
        //Establezco el video en cierto tiempo
        videoFile.currentTime = 50;
    }

    //Pregunta 4
    else if (tiempoVideo > 60 && tiempoVideo < 60.03) {
        //Establezco el video en cierto tiempo
        videoFile.currentTime = 65;
    }

    //Aumento el puntaje del estudiante
    puntaje += 1;
    //Reproduzco el video
    iniciar = 1;
    //Se quitan de la pantalla todas las opciones
    esconderOpciones();
    //Ya no se encuentra en una pregunta
    enPregunta = false;
    //La respuesta fue correcta, esto para seguir reproduciendo el video principal (mirar el draw)
    correcta = true;
    //Establezco el puntaje en el elemento html
    document.getElementById("puntaje").innerHTML = puntaje;
    //Muestro nuevamente todos los corazones
    mostrarCorazones();

}

function esconderOpciones() {
    //Quito de la pantalla el elemento HTML (Boton)
    Opciones11.style.display = "none";
    Opciones12.style.display = "none";
    Opciones13.style.display = "none";
    Opciones14.style.display = "none";
    Opciones15.style.display = "none";
    Opciones16.style.display = "none";
    Opciones17.style.display = "none";
}

function mostrarCorazones() {
    //Se muestran todos los corazones nuevamente
    corazon1.style.display = "block";
    corazon2.style.display = "block";
    corazon3.style.display = "block";
}

//Funcion que se llama al seleccionar una opcion incorrecta
function incorrecto1(event) {
    //Se cambia la variable a una incorrecta para reproducir uno de los videos incorrectos
    correcta = false;
    //Se identifica en que tiempo quedó el video principal
    tiempoVideo = videoFile.time();
    //Se va reduciendo los intentos hasta llegar a cero
    intentos -= 1;
    // Una vez con el tiempo del video principal, se establece uno de los videos de opcion incorrecta dependiendo de este tiempo

    //Se destruyen los corazons a partir de la cantidad de incorrectos realizados
    switch (intentos) {
        case 2:
            corazon3.style.display = "none";
            break;
        case 1:
            corazon2.style.display = "none";
            break;
        case 0:
            corazon1.style.display = "none";
            break;
    }

    //Pregunta 1
    if (tiempoVideo > 10 && tiempoVideo < 10.03) {
        incorrecta = 1;
        //En caso de terminar los intentos, salto estas opciones de respuesta
        if (intentos == -1) {
            //Variable para cambiar al video principal
            correcta = true;
            //Establezco el video en cierto tiempo
            videoFile.currentTime = 15;
            //Escondo las opciones para continuar con el video
            esconderOpciones();
            //Establezco nuevamente los intentos a 3, para las siguientes opciones de respuesta
            intentos = 3;
            //Reproduzco el video para seguir
            iniciar = 1;
            //Ya no se encuentra en una pregunta
            enPregunta = false;
            //Muestro nuevamente todos los corazones
            mostrarCorazones();
        }
    }

    //Pregunta 2
    else if (tiempoVideo > 30 && tiempoVideo < 30.03) {
        incorrecta = 2;
        //En caso de terminar los intentos, salto estas opciones de respuesta
        if (intentos == -1) {
            //Variable para cambiar al video principal
            correcta = true;
            //Establezco el video en cierto tiempo
            videoFile.currentTime = 35;
            //Escondo las opciones para continuar con el video
            esconderOpciones();
            //Establezco nuevamente los intentos a 3, para las siguientes opciones de respuesta
            intentos = 3;
            //Reproduzco el video para seguir
            iniciar = 1;
            //Ya no se encuentra en una pregunta
            enPregunta = false;
            //Muestro nuevamente todos los corazones
            mostrarCorazones();
        }
    }

    //Pregunta 3
    else if (tiempoVideo > 45 && tiempoVideo < 45.03) {
        incorrecta = 3;
        //En caso de terminar los intentos, salto estas opciones de respuesta
        if (intentos == -1) {
            //Variable para cambiar al video principal
            correcta = true;
            //Establezco el video en cierto tiempo
            videoFile.currentTime = 50;
            //Escondo las opciones para continuar con el video
            esconderOpciones();
            //Establezco nuevamente los intentos a 3, para las siguientes opciones de respuesta
            intentos = 3;
            //Reproduzco el video para seguir
            iniciar = 1;
            //Ya no se encuentra en una pregunta
            enPregunta = false;
            //Muestro nuevamente todos los corazones
            mostrarCorazones();
        }
    }

    //Pregunta 4
    else if (tiempoVideo > 60 && tiempoVideo < 60.03) {
        incorrecta = 4;
        //En caso de terminar los intentos, salto estas opciones de respuesta
        if (intentos == -1) {
            //Variable para cambiar al video principal
            correcta = true;
            //Establezco el video en cierto tiempo
            videoFile.currentTime = 65;
            //Escondo las opciones para continuar con el video
            esconderOpciones();
            //Establezco nuevamente los intentos a 3, para las siguientes opciones de respuesta
            intentos = 3;
            //Reproduzco el video para seguir
            iniciar = 1;
            //Ya no se encuentra en una pregunta
            enPregunta = false;
            //Muestro nuevamente todos los corazones
            mostrarCorazones();
        }
    }

}