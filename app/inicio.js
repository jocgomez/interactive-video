var volume = 0.5;
var speed = 1;
//Video principal
var videoFile;
//Videos de opciones incorrectas
var videoError = [];
//Variable que va a guardar el tiempo del video reproducido
var tiempoVideo = 0;
//Variable que guarda la duración del video para crear la barra de progreso
var duracionVideo = 0;
//Variable que va a guardar el tiempo del video de error y su duración para cambiar al video principal apenas termine
var tiempoError = 0;
var duracionError = 0;
//Variable para identificar si se encuentra en un video actualmente y así quitar de la pantalla las opciones de selección
var enError = false;
//Variable para identificar en que pregunta se encuentra
var pregunta = 0;

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
//Variable para saltar el menú inicial
let menu = false;

var Opciones11;

function preload() {
    videoFile = createVideo('assets/vid/VideoFinal.mp4', videoLoad);
    videoError[0] = createVideo('assets/vid/error1/incorrectoBateCirculo.mp4', videoLoad);
    videoError[1] = createVideo('assets/vid/error1/incorrectoCometaCirculo.mp4', videoLoad);
    videoError[2] = createVideo('assets/vid/error1/incorrectoCubetaCirculo.mp4', videoLoad);
    videoError[3] = createVideo('assets/vid/error1/incorrectoMegafonoCirculo.mp4', videoLoad);
    videoError[4] = createVideo('assets/vid/error1/incorrectoPiramideCirculo.mp4', videoLoad);
    videoError[5] = createVideo('assets/vid/error1/incorrectoTablaCirculo.mp4', videoLoad);
    videoError[6] = createVideo('assets/vid/error1/incorrectoToallaCirculo.mp4', videoLoad);
}

function videoLoad() {
    videoFile.pause();
    videoError[0].pause();
    videoError[1].pause();
    videoError[2].pause();
    videoError[3].pause();
    videoError[4].pause();
    videoError[5].pause();
    videoError[6].pause();
}

function setup() {
    createCanvas(1920, 1080);
    videoFile.hide();
    videoError[0].hide();
    videoError[1].hide();
    videoError[2].hide();
    videoError[3].hide();
    videoError[4].hide();
    videoError[5].hide();
    videoError[6].hide();

    //Código para ejecutar las acciones de control de video a partir de los elementos HTML
    document.getElementById("icono-play").addEventListener("click", botonReproducir);
    document.getElementById("icono-up").addEventListener("click", volumeUp);
    document.getElementById("icono-down").addEventListener("click", volumeDown);
    //document.getElementsByTagName("video").autoplay = true;

    //Código para identificar cuando clickea una opción en pantalla
    Opciones11 = document.getElementById("opcion1-1");
    Opciones12 = document.getElementById("opcion1-2");
    Opciones13 = document.getElementById("opcion1-3");
    Opciones14 = document.getElementById("opcion1-4");
    Opciones15 = document.getElementById("opcion1-5");
    Opciones16 = document.getElementById("opcion1-6");
    Opciones17 = document.getElementById("opcion1-7");

    //Se esconden las opciones hasta el momento de la pregunta
    esconderOpciones();

    //Corazones, intentos del estudiante
    corazon1 = document.getElementById("corazon1");
    corazon2 = document.getElementById("corazon2");
    corazon3 = document.getElementById("corazon3");
    trofeo = document.getElementById("trofeo");

    //En el menú inicial escondo los corazones, los trofeos y el puntaje
    corazon1.style.display = "none";
    corazon2.style.display = "none";
    corazon3.style.display = "none";
    trofeo.style.display = "none";
    document.getElementById("puntaje").style.display = "none";
}

function draw() {

    background(255, 255, 255);

    if (correcta) {
        //Se dibuja en pantalla el video principal
        image(videoFile, 0, 0);
    } else {
        image(videoError[incorrecta], 0, 0);
        volverVideo(videoError[incorrecta]);
    }

    //Función para establecer las preguntas en su determinado tiempo
    Preguntas();

    // Definir colores
    fill(255, 0, 0);
    noStroke();
    //Rectangulo inferior que se completa a partir de la duración del video, progreso del estudiante durante el video
    rect(10, 1065, (tiempoVideo * 1900) / duracionVideo, 5);

    //Función para pausar o reproducir el video
    reproducir();
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
    if (keyCode == ENTER) {
        menu = true;
    }
}

function volverVideo(videoError) {
    //Se guarda la duración y el tiempo actual del video error
    var duracion = videoError.duration();
    var tiempo = videoError.time();

    //Apenas termine el video de error se dibuja el video principal y se reproduce
    if (tiempo == duracion) {
        correcta = true;
        videoFile.pause();
        //Sale del video de error
        enError = false;
        //Reproduce el video principal nuevamente
        iniciar = 1;

        if (intentos == 0) {
            //Escondo las opciones para continuar con el video
            esconderOpciones();
            //Establezco nuevamente los intentos a 3, para las siguientes opciones de respuesta
            intentos = 3;
            //Ya no se encuentra en una pregunta
            enPregunta = false;
            //Muestro nuevamente todos los corazones
            mostrarCorazones();
            //Se continua con el video a partir del tiempo de cada pregunta
            switch (pregunta) {
                case 1:
                    //Al terminar sus intentos, se continua con el video
                    setTimeout(function() {
                        //Opción correcta de la primera parte, continua con el video
                        videoFile.play().time(97);
                    }, 250);
                    break;
            }
        }
    }
}

//Función donde se establecen todos los tiempos de las preguntas presentes en el video
function Preguntas() {
    //Se guarda el tiempo del video actual
    tiempoVideo = videoFile.time();
    //Duración del video actual
    duracionVideo = videoFile.duration();
    //Se quitan de la pantalla todas las opciones
    esconderOpciones();

    //Inicio
    if (!menu) {
        if (tiempoVideo > 22 && tiempoVideo < 22.03) {
            videoFile.pause();
            //Si no presiona enter, no sale del menú inicial
            setTimeout(function() {
                videoFile.play().time(0);
            }, 250);

        }
    } else {
        //Al precionar enter, continua con el video
        videoFile.pause();
        setTimeout(function() {
            //videoFile.play().time(23);
            videoFile.play().time(50);
        }, 250);

        //Al continuar con el video, muestro los corazones, los trofeos y el puntaje
        corazon1.style.display = "block";
        corazon2.style.display = "block";
        corazon3.style.display = "block";
        trofeo.style.display = "block";
        document.getElementById("puntaje").style.display = "block";
        //Ya no esta en el menu
        menu = false;
    }

    //Pregunta 1
    if (tiempoVideo > 52 && tiempoVideo < 87.03) {

        if (!enError) {
            //Si no se encuentra en un video de error, muestra las opciones de respuesta
            mostrarOpciones();
        }

        //Se encuentra en una pregunta, esto hace que no pueda pausar o reproducir el video
        //enPregunta = false;
        if (tiempoVideo > 87 && tiempoVideo < 87.03) {
            videoFile.pauseVideo();
            setTimeout(function() {
                //Bucle en la pregunta 1 hasta que pierda todas las vidas o seleccione la respuesta correcta
                videoFile.play().time(55);
            }, 250);
        }
    }

    //Pregunta 2
    else if (tiempoVideo > 30 && tiempoVideo < 30.03) {
        //Se pausa el video
        //iniciar = 0;
        //pauseVideo();
        //Escondo el botón
        //Opciones12.style.display = "block";
        //Opciones15.style.display = "block";
        //Opciones16.style.display = "block";
        //Opciones17.style.display = "block";
        //Se encuentra en una pregunta, esto hace que no pueda pausar o reproducir el video
        //enPregunta = true;
    }

    //Pregunta 3
    else if (tiempoVideo > 45 && tiempoVideo < 45.03) {
        //Se pausa el video
        //iniciar = 0;
        //pauseVideo();
        //Escondo el botón
        //Opciones13.style.display = "block";
        //Opciones15.style.display = "block";
        //Opciones16.style.display = "block";
        //Opciones17.style.display = "block";
        //Se encuentra en una pregunta, esto hace que no pueda pausar o reproducir el video
        //enPregunta = true;
    }


    //Pregunta 4
    else if (tiempoVideo > 60 && tiempoVideo < 60.03) {
        //Se pausa el video
        //iniciar = 0;
        //pauseVideo();
        //Escondo el botón
        // Opciones14.style.display = "block";
        //Opciones15.style.display = "block";
        //Opciones16.style.display = "block";
        //Opciones17.style.display = "block";
        //Se encuentra en una pregunta, esto hace que no pueda pausar o reproducir el video
        //enPregunta = true;
    }

}

function opcionesRespuesta(clicked_id) {
    tiempoVideo = videoFile.time();

    //Opciones para la primera pregunta, correctas e incorrectas
    if (tiempoVideo > 52 && tiempoVideo < 88) {
        pregunta = 1;
        switch (clicked_id) {
            case 'opcion1-1':
                videoFile.pause();
                setTimeout(function() {
                    //Opción correcta de la primera parte, continua con el video
                    videoFile.play().time(88);
                }, 250);
                opcionCorrecta();
                break;
            case 'opcion1-2':
                incorrecta = 2;
                opcionIncorrecta(incorrecta);
                break;
            case 'opcion1-3':
                incorrecta = 5;
                opcionIncorrecta(incorrecta);
                break;
            case 'opcion1-4':
                incorrecta = 4;
                opcionIncorrecta(incorrecta);
                break;
            case 'opcion1-5':
                incorrecta = 3;
                opcionIncorrecta(incorrecta);
                break;
            case 'opcion1-6':
                incorrecta = 1;
                opcionIncorrecta(incorrecta);
                break;
            case 'opcion1-7':
                incorrecta = 6;
                opcionIncorrecta(incorrecta);
                break;
        }
    }
}

function opcionCorrecta() {
    //Aumento el puntaje del estudiante
    puntaje += 1;
    //Ya no se encuentra en una pregunta
    enPregunta = false;
    //La respuesta fue correcta, esto para seguir reproduciendo el video principal (mirar el draw)
    correcta = true;
    //Establezco el puntaje en el elemento html
    document.getElementById("puntaje").innerHTML = puntaje;
    //Muestro nuevamente todos los corazones
    mostrarCorazones();

}

function opcionIncorrecta(pregunta) {
    //Se esconden las opciones de selección
    esconderOpciones();
    //Se pausa el video principal para darle paso al error
    iniciar = 0;
    //Se cambia la variable a una incorrecta para reproducir uno de los videos incorrectos
    correcta = false;
    //Se va reduciendo los intentos hasta llegar a cero
    intentos -= 1;
    //Se reproduce el video de error determinado
    videoError[pregunta].play();
    //Se encuentra en un video de error
    enError = true;

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
    //Quito de la pantalla el elemento HTML
    Opciones11.style.display = "none";
    Opciones12.style.display = "none";
    Opciones13.style.display = "none";
    Opciones14.style.display = "none";
    Opciones15.style.display = "none";
    Opciones16.style.display = "none";
    Opciones17.style.display = "none";
}

function mostrarOpciones() {
    //Muestro en pantalla las opciones HTML
    Opciones11.style.display = "block";
    Opciones12.style.display = "block";
    Opciones13.style.display = "block";
    Opciones14.style.display = "block";
    Opciones15.style.display = "block";
    Opciones16.style.display = "block";
    Opciones17.style.display = "block";
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