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
//Arreglo donde se guardará la información del estudiante en formato JSON
var partida = {};
var preguntas = [];
var infoPregunta = {};
//Variable que permitirá identificar y guardar la primera respuesta de cada pregunta
var primeraRespuesta;
var primera = true;
var today = 0;
var enviar = false;
//Variable para establecer cual de los videos de opcion incorrecta reproducir
var incorrecta = 0;

//Variable para reproducir o pausar el video
let iniciar = 0;
//Variable para identificar cuando se encuentra en una pregunta, de esta manera se permite o no la funcion de pausar
let enPregunta = false;
//Variable para reproducir el video principal en caso de que se seleccione una opcion correcta o de lo contrario los videos de las opciones incorrectas
let correcta = true;

//Variable para almacenar el puntaje
let puntaje = 0;
//Variable para establecer una serie de intentos
let intentos = 3;
//Variable para saltar el menú inicial
let menu = false;

function preload() {
    videoFile = createVideo('assets/vid/Final.mp4', videoLoad);
    //Videos de error de la primera selección de preguntas
    videoError[0] = createVideo('assets/vid/error1/incorrectoBateCirculo.mp4', videoLoad);
    videoError[1] = createVideo('assets/vid/error1/incorrectoCometaCirculo.mp4', videoLoad);
    videoError[2] = createVideo('assets/vid/error1/incorrectoCubetaCirculo.mp4', videoLoad);
    videoError[3] = createVideo('assets/vid/error1/incorrectoMegafonoCirculo.mp4', videoLoad);
    videoError[4] = createVideo('assets/vid/error1/incorrectoPiramideCirculo.mp4', videoLoad);
    videoError[5] = createVideo('assets/vid/error1/incorrectoTablaCirculo.mp4', videoLoad);
    videoError[6] = createVideo('assets/vid/error1/incorrectoToallaCirculo.mp4', videoLoad);
    //Videos de error de la segunda selección de preguntas
    videoError[7] = createVideo('assets/vid/error2/incorrectoBateCilindro.mp4', videoLoad);
    videoError[8] = createVideo('assets/vid/error2/incorrectoCometaCilindro.mp4', videoLoad);
    videoError[9] = createVideo('assets/vid/error2/incorrectoMegafonoCilindro.mp4', videoLoad);
    videoError[10] = createVideo('assets/vid/error2/incorrectoPiramideCilindro.mp4', videoLoad);
    videoError[11] = createVideo('assets/vid/error2/incorrectoTablaCilindro.mp4', videoLoad);
    videoError[12] = createVideo('assets/vid/error2/incorrectoToallaCilindro.mp4', videoLoad);
    //Videos de error de la tercera selección de preguntas
    videoError[13] = createVideo('assets/vid/error3/incorrectoBateOvalo.mp4', videoLoad);
    videoError[14] = createVideo('assets/vid/error3/incorrectoCometaOvalo.mp4', videoLoad);
    videoError[15] = createVideo('assets/vid/error3/incorrectoMegafonoOvalo.mp4', videoLoad);
    videoError[16] = createVideo('assets/vid/error3/incorrectoPiramideOvalo.mp4', videoLoad);
    videoError[17] = createVideo('assets/vid/error3/incorrectoToallaOvalo.mp4', videoLoad);
    //Videos de error de la cuarta selección de preguntas
    videoError[18] = createVideo('assets/vid/error4/incorrectoBateRectangulo.mp4', videoLoad);
    videoError[19] = createVideo('assets/vid/error4/incorrectoCometaRectangulo.mp4', videoLoad);
    videoError[20] = createVideo('assets/vid/error4/incorrectoMegafonoRectangulo.mp4', videoLoad);
    videoError[21] = createVideo('assets/vid/error4/incorrectoPiramideRectangulo.mp4', videoLoad);

    //Videos de error de la quinta selección de preguntas PARTE 2
    videoError[22] = createVideo('assets/vid/error5/Incorrecta1.mp4', videoLoad);
    videoError[23] = createVideo('assets/vid/error5/Incorrecta2.mp4', videoLoad);
    videoError[24] = createVideo('assets/vid/error5/Incorrecta3.1.mp4', videoLoad);
    videoError[25] = createVideo('assets/vid/error5/Incorrecta3.2.mp4', videoLoad);

    //Videos de error de la Sexta selección de preguntas PARTE 3
    videoError[26] = createVideo('assets/vid/error6/Incorrecta.mp4', videoLoad);

    //Videos de error finales para la primera parte (Circulo)
    videoError[27] = createVideo('assets/vid/ultimo1/incorrectoBateCirculoUltimo.mp4', videoLoad);
    videoError[28] = createVideo('assets/vid/ultimo1/incorrectoCometaCirculoUltimo.mp4', videoLoad);
    videoError[29] = createVideo('assets/vid/ultimo1/incorrectoMegafonoCirculoUltimo.mp4', videoLoad);
    videoError[30] = createVideo('assets/vid/ultimo1/incorrectoPiramideCirculoUltimo.mp4', videoLoad);
    videoError[31] = createVideo('assets/vid/ultimo1/incorrectoTablaCirculoUltimo.mp4', videoLoad);
    videoError[32] = createVideo('assets/vid/ultimo1/incorrectoToallaCirculoUltimo.mp4', videoLoad);
    videoError[33] = createVideo('assets/vid/ultimo1/incorrectoCubetaCirculoUltimo.mp4', videoLoad);
    //Videos de error finales para la primera parte (Cilindro)
    videoError[34] = createVideo('assets/vid/ultimo1/incorrectoBateCilindroUltimo.mp4', videoLoad);
    videoError[35] = createVideo('assets/vid/ultimo1/incorrectoCometaCilindroUltimo.mp4', videoLoad);
    videoError[36] = createVideo('assets/vid/ultimo1/incorrectoMegafonoCilindroUltimo.mp4', videoLoad);
    videoError[37] = createVideo('assets/vid/ultimo1/incorrectoPiramideCilindroUltimo.mp4', videoLoad);
    videoError[38] = createVideo('assets/vid/ultimo1/incorrectoTablaCilindroUltimo.mp4', videoLoad);
    videoError[39] = createVideo('assets/vid/ultimo1/incorrectoToallaCilindroUltimo.mp4', videoLoad);
    //Videos de error finales para la primera parte (Ovalo)
    videoError[40] = createVideo('assets/vid/ultimo1/incorrectoBateOvaloUltimo.mp4', videoLoad);
    videoError[41] = createVideo('assets/vid/ultimo1/incorrectoCometaOvaloUltimo.mp4', videoLoad);
    videoError[42] = createVideo('assets/vid/ultimo1/incorrectoMegafonoOvaloUltimo.mp4', videoLoad);
    videoError[43] = createVideo('assets/vid/ultimo1/incorrectoPiramideOvaloUltimo.mp4', videoLoad);
    videoError[44] = createVideo('assets/vid/ultimo1/incorrectoToallaOvaloUltimo.mp4', videoLoad);
    //Videos de error finales para la primera parte (Rectangulo)
    videoError[45] = createVideo('assets/vid/ultimo1/incorrectoBateRectanguloUltimo.mp4', videoLoad);
    videoError[46] = createVideo('assets/vid/ultimo1/incorrectoCometaRectanguloUltimo.mp4', videoLoad);
    videoError[47] = createVideo('assets/vid/ultimo1/incorrectoMegafonoRectanguloUltimo.mp4', videoLoad);
    videoError[48] = createVideo('assets/vid/ultimo1/incorrectoPiramideRectanguloUltimo.mp4', videoLoad);

    //Videos de error finales para la segunda parte
    videoError[49] = createVideo('assets/vid/ultimo2/Incorrecta1.2.mp4', videoLoad);
    videoError[50] = createVideo('assets/vid/ultimo2/Incorrecta2.2.mp4', videoLoad);
    videoError[51] = createVideo('assets/vid/ultimo2/Incorrecta3.1.2.mp4', videoLoad);
    videoError[52] = createVideo('assets/vid/ultimo2/Incorrecta3.2.2.mp4', videoLoad);

    //Videos de error finales para la tercera parte
    videoError[53] = createVideo('assets/vid/ultimo3/lupeAyuda.mp4', videoLoad);
}

function videoLoad() {
    //Pauso el video principal
    videoFile.pause();
    //Pauso todos los videos de error
    for (var k in videoError) {
        videoError[k].pause();
    }
}

function setup() {
    createCanvas(1920, 1080);
    //Escondo el html del video principal
    videoFile.hide();
    //Escondo cada uno de los videos de error
    for (var k in videoError) {
        videoError[k].hide();
    }

    //Código para ejecutar las acciones de control de video a partir de los elementos HTML
    document.getElementById("icono-play").addEventListener("click", botonReproducir);
    document.getElementById("icono-up").addEventListener("click", volumeUp);
    document.getElementById("icono-down").addEventListener("click", volumeDown);
    //document.getElementsByTagName("video").autoplay = true;

    //Código para llamar las opciones de respuesta para la primera parte del video
    Opciones11 = document.getElementById("opcion1-1");
    Opciones12 = document.getElementById("opcion1-2");
    Opciones13 = document.getElementById("opcion1-3");
    Opciones14 = document.getElementById("opcion1-4");
    Opciones15 = document.getElementById("opcion1-5");
    Opciones16 = document.getElementById("opcion1-6");
    Opciones17 = document.getElementById("opcion1-7");
    Opciones18 = document.getElementById("opcion1-8");
    //Código para llamar las opciones de respuesta para la segunda parte del video
    Opciones21 = document.getElementById("opcion2-1");
    Opciones22 = document.getElementById("opcion2-2");
    Opciones23 = document.getElementById("opcion2-3");
    Opciones24 = document.getElementById("opcion2-4");
    Opciones25 = document.getElementById("opcion2-5");
    Opciones26 = document.getElementById("opcion2-6");
    Opciones27 = document.getElementById("opcion2-7");
    Opciones28 = document.getElementById("opcion2-8");
    Opciones29 = document.getElementById("opcion2-9");
    //Código para llamar las opciones de respuesta para la tercera parte del video
    Opciones31 = document.getElementById("opcion3-1");
    Opciones32 = document.getElementById("opcion3-2");
    Opciones33 = document.getElementById("opcion3-3");

    //Se esconden las opciones hasta el momento de la pregunta
    esconderOpciones();

    //Corazones, intentos del estudiante
    corazon1 = document.getElementById("corazon1");
    corazon2 = document.getElementById("corazon2");
    corazon3 = document.getElementById("corazon3");
    trofeo = document.getElementById("trofeo");
    bordeCorazon1 = document.getElementById("bordeCorazon1");
    bordeCorazon2 = document.getElementById("bordeCorazon2");
    bordeCorazon3 = document.getElementById("bordeCorazon3");

    //En el menú inicial escondo los corazones, los trofeos y el puntaje
    corazon1.style.visibility = "hidden";
    corazon2.style.visibility = "hidden";
    corazon3.style.visibility = "hidden";
    bordeCorazon1.style.visibility = "hidden";
    bordeCorazon2.style.visibility = "hidden";
    bordeCorazon3.style.visibility = "hidden";
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
}

//Función para cuando presione el botón html y presione la barra espaciadora
function botonReproducir(event) {
    //Iniciar si es par, pausa el video, si es impar lo reproduce, al aumentarlo, se intercambia
    iniciar += 1;
    reproducir();
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
    if (key == 'm') {
        intentos -= 1;
    }
    //Al presionar la barra espaciadora, llama a la funcion para cambiar la variable "iniciar"
    if (key == ' ') {
        botonReproducir();
        //Se llama la función js presente en el html que cambia el icono del boton de reproducir
        changeImage();
    }
    // Al presionar ENTER se salta el menú inicial
    if (keyCode == ENTER) {
        menu = true;
    }

    if (key == '1') {
        setTimeout(function() {
            //Opción correcta de la primera parte, continua con el video
            videoFile.time(50);
        }, 250);
    }
    if (key == '2') {
        setTimeout(function() {
            //Opción correcta de la primera parte, continua con el video
            videoFile.time(115);
        }, 250);
    }
    if (key == '3') {
        setTimeout(function() {
            //Opción correcta de la primera parte, continua con el video
            videoFile.time(172);
        }, 250);
    }
    if (key == '4') {
        setTimeout(function() {
            //Opción correcta de la primera parte, continua con el video
            videoFile.time(240);
        }, 250);
    }
    if (key == '5') {
        setTimeout(function() {
            //Opción correcta de la primera parte, continua con el video
            videoFile.time(352);
        }, 250);
    }
    if (key == '6') {
        setTimeout(function() {
            //Opción correcta de la primera parte, continua con el video
            videoFile.time(430);
        }, 250);
    }
    if (key == '7') {
        setTimeout(function() {
            //Opción correcta de la primera parte, continua con el video
            videoFile.time(522);
        }, 250);
    }
    if (key == '8') {
        setTimeout(function() {
            //Opción correcta de la primera parte, continua con el video
            videoFile.time(662);
        }, 250);
    }

}

function volverVideo(videoError) {
    //Se guarda la duración y el tiempo actual del video error
    var duracion = videoError.duration();
    var tiempo = videoError.time();

    //Apenas termine el video de error se dibuja el video principal y se reproduce
    if (tiempo == duracion) {
        correcta = true;
        //Sale del video de error
        enError = false;
        //Reproduce el video principal nuevamente
        iniciar = 1;
        reproducir();

        if (intentos <= 0) {
            primera = true;
            //Escondo las opciones para continuar con el video
            esconderOpciones();
            infoPregunta["Intentos"] = 3;
            preguntas.push(infoPregunta);
            infoPregunta = {};
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
                    }, 1);
                    break;
                case 2:
                    //Al terminar sus intentos, se continua con el video
                    setTimeout(function() {
                        //Opción correcta de la segunda parte, continua con el video
                        videoFile.play().time(156.5);
                    }, 1);
                    break;
                case 3:
                    //Al terminar sus intentos, se continua con el video
                    setTimeout(function() {
                        //Opción correcta de la segunda parte, continua con el video
                        videoFile.play().time(223.2);
                    }, 1);
                    break;
                case 4:
                    //Al terminar sus intentos, se continua con el video
                    setTimeout(function() {
                        //Opción correcta de la segunda parte, continua con el video
                        videoFile.play().time(286);
                    }, 1);
                    break;
                case 5:
                    //Al terminar sus intentos, se continua con el video
                    setTimeout(function() {
                        //Opción correcta de la segunda parte, continua con el video
                        videoFile.play().time(390.5);
                    }, 1);
                    break;
                case 6:
                    //Al terminar sus intentos, se continua con el video
                    setTimeout(function() {
                        //Opción correcta de la segunda parte, continua con el video
                        videoFile.play().time(474);
                    }, 1);
                    break;
                case 7:
                    //Al terminar sus intentos, se continua con el video
                    setTimeout(function() {
                        //Opción correcta de la segunda parte, continua con el video
                        videoFile.play().time(574);
                    }, 1);
                    break;
                case 8:
                    //Al terminar sus intentos, se continua con el video
                    setTimeout(function() {
                        //Opción correcta de la segunda parte, continua con el video
                        videoFile.play().time(728);
                    }, 1);
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
    //Se quitan de la pantalla todas las opciones de todas las partes del video
    esconderOpciones(1);
    esconderOpciones(21);
    esconderOpciones(22);
    esconderOpciones(23);
    esconderOpciones(3);

    //Inicio
    if (!menu) {
        if (tiempoVideo > 22 && tiempoVideo < 22.03) {
            //videoFile.pause();
            //Si no presiona enter, no sale del menú inicial
            setTimeout(function() {
                videoFile.time(0);
            }, 250);

        }
    } else {
        //Al precionar enter, continua con el video
        //videoFile.pause();
        setTimeout(function() {
            videoFile.play().time(23);
            //videoFile.time(50);
        }, 250);

        //Al continuar con el video, muestro los corazones, los trofeos y el puntaje
        mostrarCorazones();
        trofeo.style.display = "block";
        document.getElementById("puntaje").style.display = "block";
        //Ya no esta en el menu
        menu = false;
    }

    //------------------- PRIMERA PARTE -------------------
    //Pregunta 1
    if (tiempoVideo > 52.1 && tiempoVideo < 87.5) {

        if (!enError) {
            //Si no se encuentra en un video de error, muestra las opciones de respuesta
            mostrarOpciones(1);
        }

        //Se encuentra en una pregunta, esto hace que no pueda pausar o reproducir el video
        //enPregunta = false;
        if (tiempoVideo > 87 && tiempoVideo < 87.03) {
            //videoFile.pauseVideo();
            setTimeout(function() {
                //Bucle en la pregunta 1 hasta que pierda todas las vidas o seleccione la respuesta correcta
                videoFile.time(55);
            }, 250);
        }
    }

    //Pregunta 2
    else if (tiempoVideo > 116.65 && tiempoVideo < 151.85) {

        if (!enError) {
            //Si no se encuentra en un video de error, muestra las opciones de respuesta
            mostrarOpciones(1);
            //Escondo la opción de pelota anteriormente seleccionada
            Opciones11.style.display = "none";
        }

        //Se encuentra en una pregunta, esto hace que no pueda pausar o reproducir el video
        //enPregunta = false;
        if (tiempoVideo > 151.5 && tiempoVideo < 151.75) {
            //videoFile.pauseVideo();
            setTimeout(function() {
                //Bucle en la pregunta 1 hasta que pierda todas las vidas o seleccione la respuesta correcta
                videoFile.time(120);
            }, 250);
        }
    }

    //Pregunta 3
    else if (tiempoVideo > 173.6 && tiempoVideo < 215) {

        if (!enError) {
            //Si no se encuentra en un video de error, muestra las opciones de respuesta
            mostrarOpciones(1);
            //Escondo la opción de pelota anteriormente seleccionada
            Opciones11.style.display = "none";
            Opciones12.style.display = "none";
        }

        //Se encuentra en una pregunta, esto hace que no pueda pausar o reproducir el video
        //enPregunta = false;
        if (tiempoVideo > 214.75 && tiempoVideo < 215) {
            //videoFile.pauseVideo();
            setTimeout(function() {
                //Bucle en la pregunta 1 hasta que pierda todas las vidas o seleccione la respuesta correcta
                videoFile.time(176);
            }, 250);
        }
    }


    //Pregunta 4
    else if (tiempoVideo > 241.5 && tiempoVideo < 279.5) {

        if (!enError) {
            //Si no se encuentra en un video de error, muestra las opciones de respuesta
            mostrarOpciones(1);
            //Escondo la opción de pelota anteriormente seleccionada
            Opciones11.style.display = "none";
            Opciones12.style.display = "none";
            Opciones13.style.display = "none";
        }

        //Se encuentra en una pregunta, esto hace que no pueda pausar o reproducir el video
        //enPregunta = false;
        if (tiempoVideo > 278.75 && tiempoVideo < 279) {
            //videoFile.pauseVideo();
            setTimeout(function() {
                //Bucle en la pregunta 1 hasta que pierda todas las vidas o seleccione la respuesta correcta
                videoFile.time(244);
            }, 250);
        }
    }

    //------------------- SEGUNDA PARTE -------------------
    //Pregunta 5
    else if (tiempoVideo > 353.65 && tiempoVideo < 385) {

        if (!enError) {
            //Si no se encuentra en un video de error, muestra las opciones de respuesta
            mostrarOpciones(21);
        }

        //Se encuentra en una pregunta, esto hace que no pueda pausar o reproducir el video
        //enPregunta = false;
        if (tiempoVideo > 384.60 && tiempoVideo < 384.9) {
            //videoFile.pauseVideo();
            setTimeout(function() {
                //Bucle en la pregunta 1 hasta que pierda todas las vidas o seleccione la respuesta correcta
                videoFile.time(358);
            }, 250);
        }
    }

    //Pregunta 6
    else if (tiempoVideo > 431.25 && tiempoVideo < 470) {

        if (!enError) {
            //Si no se encuentra en un video de error, muestra las opciones de respuesta
            mostrarOpciones(22);
        }

        //Se encuentra en una pregunta, esto hace que no pueda pausar o reproducir el video
        //enPregunta = false;
        if (tiempoVideo > 469.7 && tiempoVideo < 470) {
            //videoFile.pauseVideo();
            setTimeout(function() {
                //Bucle en la pregunta 1 hasta que pierda todas las vidas o seleccione la respuesta correcta
                videoFile.time(435);
            }, 250);
        }
    }

    //Pregunta 7
    else if (tiempoVideo > 524.52 && tiempoVideo < 568.5) {

        if (!enError) {
            //Si no se encuentra en un video de error, muestra las opciones de respuesta
            mostrarOpciones(23);
        }

        //Se encuentra en una pregunta, esto hace que no pueda pausar o reproducir el video
        //enPregunta = false;
        if (tiempoVideo > 568 && tiempoVideo < 568.5) {
            //videoFile.pauseVideo();
            setTimeout(function() {
                //Bucle en la pregunta 1 hasta que pierda todas las vidas o seleccione la respuesta correcta
                videoFile.time(527.5);
            }, 250);
        }
    }

    //------------------- TERCERA PARTE -------------------
    //Pregunta 8
    else if (tiempoVideo > 664 && tiempoVideo < 718) {

        if (!enError) {
            //Si no se encuentra en un video de error, muestra las opciones de respuesta
            mostrarOpciones(3);
        }

        //Se encuentra en una pregunta, esto hace que no pueda pausar o reproducir el video
        //enPregunta = false;
        if (tiempoVideo > 717.6 && tiempoVideo < 718) {
            //videoFile.pauseVideo();
            setTimeout(function() {
                //Bucle en la pregunta 1 hasta que pierda todas las vidas o seleccione la respuesta correcta
                videoFile.time(669);
            }, 250);
        }
    }

    //FINAL JSON
    else if (tiempoVideo > 741 && tiempoVideo < 741.3) {
        esconderCorazonesTrofeos();
        partida["Preguntas"] = preguntas;
        partida["Fecha"] = today;
        var jsonPartida = JSON.stringify(partida);
        if (!enviar) {
            console.log(jsonPartida);
            document.getElementById("campos").value = jsonPartida;
            document.getElementById("botonEnviar").click;
            enviar = true;
        }
    }

}

function opcionesRespuesta(clicked_id) {
    tiempoVideo = videoFile.time();

    //Opciones para la PRIMERA pregunta, correctas e incorrectas
    if (tiempoVideo > 52.1 && tiempoVideo < 87.03) {
        pregunta = 1;
        switch (clicked_id) {
            case 'opcion1-1':
                //videoFile.pause();
                setTimeout(function() {
                    //Opción correcta de la primera parte, continua con el video
                    videoFile.time(88);
                }, 250);
                guardarPrimeraRespuesta("Pelota", 0);
                opcionCorrecta();
                break;
                //Opciones incorrectas para la sección de opciones
            case 'opcion1-2':
                if (intentos <= 1) { incorrecta = 33 } else { incorrecta = 2; }
                opcionIncorrecta(incorrecta, 1);
                guardarPrimeraRespuesta("Cubeta", 0);
                break;
            case 'opcion1-3':
                if (intentos <= 1) { incorrecta = 31 } else { incorrecta = 5; }
                opcionIncorrecta(incorrecta, 1);
                guardarPrimeraRespuesta("Tabla de Surf", 0);
                break;
            case 'opcion1-4':
                if (intentos <= 1) { incorrecta = 30 } else { incorrecta = 4; }
                opcionIncorrecta(incorrecta, 1);
                guardarPrimeraRespuesta("Piramide", 0);
                break;
            case 'opcion1-5':
                if (intentos <= 1) { incorrecta = 29 } else { incorrecta = 3; }
                opcionIncorrecta(incorrecta, 1);
                guardarPrimeraRespuesta("Megafono", 0);
                break;
            case 'opcion1-6':
                if (intentos <= 1) { incorrecta = 28 } else { incorrecta = 1; }
                opcionIncorrecta(incorrecta, 1);
                guardarPrimeraRespuesta("Cometa", 0);
                break;
            case 'opcion1-7':
                if (intentos <= 1) { incorrecta = 32 } else { incorrecta = 6; }
                opcionIncorrecta(incorrecta, 1);
                guardarPrimeraRespuesta("Toalla", 0);
                break;
            case 'opcion1-8':
                if (intentos <= 1) { incorrecta = 27 } else { incorrecta = 0; }
                opcionIncorrecta(incorrecta, 1);
                guardarPrimeraRespuesta("Bate", 0);
                break;
        }
        //partida[0] = preguntas;
    }

    //Opciones para la SEGUNDA pregunta, correctas e incorrectas
    if (tiempoVideo > 117 && tiempoVideo < 151) {
        pregunta = 2;
        switch (clicked_id) {
            case 'opcion1-2':
                setTimeout(function() {
                    //Opción correcta de la segunda parte, continua con el video
                    videoFile.time(152);
                }, 250);
                guardarPrimeraRespuesta("Cubeta", 1);
                opcionCorrecta();
                break;
                //Opciones incorrectas para la sección de opciones
            case 'opcion1-3':
                if (intentos <= 1) { incorrecta = 38 } else { incorrecta = 11; }
                opcionIncorrecta(incorrecta, 1);
                guardarPrimeraRespuesta("Tabla de Surf", 1);
                break;
            case 'opcion1-4':
                if (intentos <= 1) { incorrecta = 37 } else { incorrecta = 10; }
                opcionIncorrecta(incorrecta, 1);
                guardarPrimeraRespuesta("Piramide", 1);
                break;
            case 'opcion1-5':
                if (intentos <= 1) { incorrecta = 36 } else { incorrecta = 9; }
                opcionIncorrecta(incorrecta, 1);
                guardarPrimeraRespuesta("Megafono", 1);
                break;
            case 'opcion1-6':
                if (intentos <= 1) { incorrecta = 35 } else { incorrecta = 8; }
                opcionIncorrecta(incorrecta, 1);
                guardarPrimeraRespuesta("Cometa", 1);
                break;
            case 'opcion1-7':
                if (intentos <= 1) { incorrecta = 39 } else { incorrecta = 12; }
                opcionIncorrecta(incorrecta, 1);
                guardarPrimeraRespuesta("Toalla", 1);
                break;
            case 'opcion1-8':
                if (intentos <= 1) { incorrecta = 34 } else { incorrecta = 7; }
                opcionIncorrecta(incorrecta, 1);
                guardarPrimeraRespuesta("Bate", 1);
                break;
        }
        //partida[1] = preguntas;
    }

    //Opciones para la TERCERA pregunta, correctas e incorrectas
    if (tiempoVideo > 173.6 && tiempoVideo < 215) {
        pregunta = 3;
        switch (clicked_id) {
            case 'opcion1-3':
                setTimeout(function() {
                    //Opción correcta de la tercera parte, continua con el video
                    videoFile.time(216.1);
                }, 250);
                guardarPrimeraRespuesta("Tabla de Surf", 2);
                opcionCorrecta();
                break;
                //Opciones incorrectas para la sección de opciones
            case 'opcion1-4':
                if (intentos <= 1) { incorrecta = 43 } else { incorrecta = 16; }
                opcionIncorrecta(incorrecta, 1);
                guardarPrimeraRespuesta("Piramide", 2);
                break;
            case 'opcion1-5':
                if (intentos <= 1) { incorrecta = 42 } else { incorrecta = 15; }
                opcionIncorrecta(incorrecta, 1);
                guardarPrimeraRespuesta("Megafono", 2);
                break;
            case 'opcion1-6':
                if (intentos <= 1) { incorrecta = 41 } else { incorrecta = 14; }
                opcionIncorrecta(incorrecta, 1);
                guardarPrimeraRespuesta("Cometa", 2);
                break;
            case 'opcion1-7':
                if (intentos <= 1) { incorrecta = 44 } else { incorrecta = 17; }
                opcionIncorrecta(incorrecta, 1);
                guardarPrimeraRespuesta("Toalla", 2);
                break;
            case 'opcion1-8':
                if (intentos <= 1) { incorrecta = 40 } else { incorrecta = 13; }
                opcionIncorrecta(incorrecta, 1);
                guardarPrimeraRespuesta("Bate", 2);
                break;
        }
        //partida[2] = preguntas;
    }

    //Opciones para la CUARTA pregunta, correctas e incorrectas
    if (tiempoVideo > 241.5 && tiempoVideo < 279) {
        pregunta = 4;
        switch (clicked_id) {
            //Opciones incorrectas para la sección de opciones
            case 'opcion1-4':
                if (intentos <= 1) { incorrecta = 48 } else { incorrecta = 21; }
                opcionIncorrecta(incorrecta, 1);
                guardarPrimeraRespuesta("Piramide", 3);
                break;
            case 'opcion1-5':
                if (intentos <= 1) { incorrecta = 47 } else { incorrecta = 20; }
                opcionIncorrecta(incorrecta, 1);
                guardarPrimeraRespuesta("Megafono", 3);
                break;
            case 'opcion1-6':
                if (intentos <= 1) { incorrecta = 46 } else { incorrecta = 19; }
                opcionIncorrecta(incorrecta, 1);
                guardarPrimeraRespuesta("Cometa", 3);
                break;
            case 'opcion1-7':
                setTimeout(function() {
                    //Opción correcta de la cuarta parte, continua con el video
                    videoFile.time(279.5);
                }, 250);
                guardarPrimeraRespuesta("Toalla", 3);
                opcionCorrecta();
                break;
            case 'opcion1-8':
                if (intentos <= 1) { incorrecta = 45 } else { incorrecta = 18; }
                opcionIncorrecta(incorrecta, 1);
                guardarPrimeraRespuesta("Bate", 3);
                break;
        }
        //partida[3] = preguntas;
    }

    //Opciones para la QUINTA pregunta, correctas e incorrectas
    if (tiempoVideo > 353.65 && tiempoVideo < 385) {
        pregunta = 5;
        switch (clicked_id) {
            //Opciones incorrectas para la sección de opciones
            case 'opcion2-1':
                if (intentos <= 1) { incorrecta = 49 } else { incorrecta = 22; }
                opcionIncorrecta(incorrecta, 21);
                guardarPrimeraRespuesta("Triangulo", 4);
                break;
            case 'opcion2-2':
                setTimeout(function() {
                    //Opción correcta de la cuarta parte, continua con el video
                    videoFile.time(386.105);
                }, 250);
                guardarPrimeraRespuesta("Rombo", 4);
                opcionCorrecta();
                break;
            case 'opcion2-3':
                if (intentos <= 1) { incorrecta = 49 } else { incorrecta = 22; }
                opcionIncorrecta(incorrecta, 21);
                guardarPrimeraRespuesta("Pentagono", 4);
                break;
        }
        //partida[4] = preguntas;
    }

    //Opciones para la SEXTA pregunta, correctas e incorrectas
    if (tiempoVideo > 431.25 && tiempoVideo < 470) {
        pregunta = 6;
        switch (clicked_id) {
            //Opciones incorrectas para la sección de opciones
            case 'opcion2-4':
                if (intentos <= 1) { incorrecta = 50 } else { incorrecta = 23; }
                opcionIncorrecta(incorrecta, 22);
                guardarPrimeraRespuesta("Rectangulo", 5);
                break;
            case 'opcion2-5':
                setTimeout(function() {
                    //Opción correcta de la cuarta parte, continua con el video
                    videoFile.time(470.815);
                }, 250);
                guardarPrimeraRespuesta("Triangulo", 5);
                opcionCorrecta();
                break;
            case 'opcion2-6':
                if (intentos <= 1) { incorrecta = 50 } else { incorrecta = 23; }
                opcionIncorrecta(incorrecta, 22);
                guardarPrimeraRespuesta("Circulo", 5);
                break;
        }
        //partida[5] = preguntas;
    }

    //Opciones para la SEPTIMA pregunta, correctas e incorrectas
    if (tiempoVideo > 524.52 && tiempoVideo < 568.5) {
        pregunta = 7;
        switch (clicked_id) {
            //Opciones incorrectas para la sección de opciones
            case 'opcion2-7':
                if (intentos <= 1) { incorrecta = 51 } else { incorrecta = 24; }
                opcionIncorrecta(incorrecta, 23);
                guardarPrimeraRespuesta("Prisma", 6);
                break;
            case 'opcion2-8':
                setTimeout(function() {
                    //Opción correcta de la cuarta parte, continua con el video
                    videoFile.time(570.7);
                }, 250);
                guardarPrimeraRespuesta("Piramide", 6);
                opcionCorrecta();
                break;
            case 'opcion2-9':
                if (intentos <= 1) { incorrecta = 52 } else { incorrecta = 25; }
                opcionIncorrecta(incorrecta, 23);
                guardarPrimeraRespuesta("Esfera", 6);
                break;
        }
        //partida[6] = preguntas;
    }

    //Opciones para la OCTAVA pregunta, correctas e incorrectas
    if (tiempoVideo > 664 && tiempoVideo < 718) {
        pregunta = 8;
        switch (clicked_id) {
            //Opciones incorrectas para la sección de opciones
            case 'opcion3-1':
                setTimeout(function() {
                    //Opción correcta de la cuarta parte, continua con el video
                    videoFile.time(719);
                }, 250);
                guardarPrimeraRespuesta("Prisma pentagonal", 7);
                opcionCorrecta();
                break;
            case 'opcion3-2':
                if (intentos <= 1) { incorrecta = 53 } else { incorrecta = 26; }
                opcionIncorrecta(incorrecta, 3);
                guardarPrimeraRespuesta("Prisma rectangular", 7);
                break;
            case 'opcion3-3':
                if (intentos <= 1) { incorrecta = 53 } else { incorrecta = 26; }
                opcionIncorrecta(incorrecta, 3);
                guardarPrimeraRespuesta("Prisma triangular", 7);
                break;
        }
        //partida[7] = preguntas;
    }

    //partida.push(preguntas);
    //console.log(preguntas);
    //console.log(partida);
    //console.log(JSON.stringify(partida));
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
    //Se reestablecen los intentos por pregunta
    infoPregunta["Intentos"] = 3 - intentos;
    infoPregunta["Puntaje"] = 1;
    preguntas.push(infoPregunta);
    infoPregunta = {};
    intentos = 3;
    primera = true;
}

function opcionIncorrecta(preg, parte) {
    //Se esconden las opciones de selección
    esconderOpciones(parte);
    //Se pausa el video principal para darle paso al error
    iniciar = 0;
    reproducir();
    //Se cambia la variable a una incorrecta para reproducir uno de los videos incorrectos
    correcta = false;
    //Se va reduciendo los intentos hasta llegar a cero
    intentos -= 1;
    //Se reproduce el video de error determinado
    videoError[preg].play();
    //Se encuentra en un video de error
    enError = true;
    infoPregunta["Puntaje"] = 0;
    infoPregunta["Intentos"] = 3 - intentos;

    //Se destruyen los corazons a partir de la cantidad de incorrectos realizados
    switch (intentos) {
        case 2:
            corazon3.style.visibility = "hidden";
            break;
        case 1:
            corazon2.style.visibility = "hidden";
            break;
        case 0:
            corazon1.style.visibility = "hidden";
            break;
    }
}

function esconderOpciones(parte) {
    //Se divide el video en diferentes partes, en cualquier caso se muestran diferentes elementos
    switch (parte) {
        case 1:
            //Quito de la pantalla el elemento HTML de la primera parte
            Opciones11.style.display = "none";
            Opciones12.style.display = "none";
            Opciones13.style.display = "none";
            Opciones14.style.display = "none";
            Opciones15.style.display = "none";
            Opciones16.style.display = "none";
            Opciones17.style.display = "none";
            Opciones18.style.display = "none";
            break;
        case 21:
            //Quito de la pantalla el elemento HTML de la segunda parte
            Opciones21.style.display = "none";
            Opciones22.style.display = "none";
            Opciones23.style.display = "none";
            break;
        case 22:
            //Quito de la pantalla el elemento HTML de la segunda parte
            Opciones24.style.display = "none";
            Opciones25.style.display = "none";
            Opciones26.style.display = "none";
            break;
        case 23:
            //Quito de la pantalla el elemento HTML de la segunda parte
            Opciones27.style.display = "none";
            Opciones28.style.display = "none";
            Opciones29.style.display = "none";
            break;
        case 3:
            //Quito de la pantalla el elemento HTML de la tercera parte
            Opciones31.style.display = "none";
            Opciones32.style.display = "none";
            Opciones33.style.display = "none";
    }

}

function mostrarOpciones(parte) {
    //Se divide el video en diferentes partes, en cualquier caso se muestran diferentes elementos
    switch (parte) {
        //------------------- PRIMERA PARTE -------------------
        case 1:
            //Muestro en pantalla las opciones HTML de la primera parte
            Opciones11.style.display = "block";
            Opciones12.style.display = "block";
            Opciones13.style.display = "block";
            Opciones14.style.display = "block";
            Opciones15.style.display = "block";
            Opciones16.style.display = "block";
            Opciones17.style.display = "block";
            Opciones18.style.display = "block";
            break;
            //------------------- SEGUNDA PARTE -------------------
        case 21:
            //Muestro en pantalla las opciones HTML de la primera parte
            Opciones21.style.display = "block";
            Opciones22.style.display = "block";
            Opciones23.style.display = "block";

            break;
        case 22:
            //Muestro en pantalla las opciones HTML de la primera parte
            Opciones24.style.display = "block";
            Opciones25.style.display = "block";
            Opciones26.style.display = "block";
            break;
        case 23:
            //Muestro en pantalla las opciones HTML de la primera parte
            Opciones27.style.display = "block";
            Opciones28.style.display = "block";
            Opciones29.style.display = "block";
            break;
            //------------------- TERCERA PARTE -------------------
        case 3:
            //Muestro en pantalla las opciones HTML de la primera parte
            Opciones31.style.display = "block";
            Opciones32.style.display = "block";
            Opciones33.style.display = "block";
            break;
    }

}

function mostrarCorazones() {
    //Se muestran todos los corazones nuevamente
    corazon1.style.visibility = "visible";
    corazon2.style.visibility = "visible";
    corazon3.style.visibility = "visible";
    bordeCorazon1.style.visibility = "visible";
    bordeCorazon2.style.visibility = "visible";
    bordeCorazon3.style.visibility = "visible";

}

function esconderCorazonesTrofeos() {
    corazon1.style.visibility = "hidden";
    corazon2.style.visibility = "hidden";
    corazon3.style.visibility = "hidden";
    bordeCorazon1.style.visibility = "hidden";
    bordeCorazon2.style.visibility = "hidden";
    bordeCorazon3.style.visibility = "hidden";
    document.getElementById("puntaje-trofeos").style.display = "none";
}

function guardarPrimeraRespuesta(nombreRespuesta, pos) {
    if (primera) {
        today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();
        today = yyyy + '/' + mm + '/' + dd;

        primeraRespuesta = nombreRespuesta;
        infoPregunta["Respuesta"] = primeraRespuesta;
        //preguntas[3] = today;
        primera = false;
    }
}