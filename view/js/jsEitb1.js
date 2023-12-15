document.addEventListener("DOMContentLoaded", function () {

  //noticias eitb1 por defecto
  loadSelectEitb1();
  cargarUltimasNoticiasEitb1();
  nightModeOnLoad();

  $("#nightMode").click(nightMode);
  //Activa o desactiva el modo noche
  function nightMode() {
    if (localStorage.getItem('nightMode') != "true") {
      localStorage.setItem('nightMode', true);
      setNightMode();
    } else {
      localStorage.setItem('nightMode', false);
      unsetNightMode();
    }
  }


  //Mira si la opcion de modo noche era false o true 
  function nightModeOnLoad() {
    if (localStorage.getItem('nightMode') != "true") {
      unsetNightMode();
    } else {
      setNightMode();
    }
  }

  //Pone la pagina en modo noche
  function setNightMode() {
    $('#nightMode i').removeClass();
    $('#nightMode i').addClass("fas fa-sun").css("color", "#FCD440")
    $('body').addClass('bg-dark');
    $('footer').addClass('bg-dark');


  }

  //Devuelve la pagina a su estilo original
  function unsetNightMode() {
    $('#nightMode i').removeClass();
    $('#nightMode i').addClass("fas fa-moon").css("color", "#F4F1C9")
    $('footer').removeClass('bg-dark');
    $('body').removeClass('bg-dark');
    $('.noticias_pasadas').css('border', '0.2px solid black');
    $('.noticias2').css('border', '0.2px solid black');

  }



  $('.go-top ').on('click', function () {

    $("html, body").animate({
      scrollTop: 0
    }, 600);

  });
})
$(document).scroll(function () {
  // console.log(window.pageYOffset != 0, window.pageYOffset );
  if (window.pageYOffset >= 500) {

    //Nos sale
    $('.go-top').show();
  } else {
    //se oculta
    $('.go-top').hide();
  }


});

//Cargar cards noticias eitb1
function cargarUltimasNoticiasEitb1() {


  fetch("https://hodeia.eitb.eus/datuak/json/parrilla/last7days/canal1_ETB1HD.json")


    .then(res => res.json()).then(result => {
      var noticias = result.epg;
      //console.log(noticias);

      var noticia = '';
      var video = '';

      var now = moment().toDate();
      var hoy = moment().format('YYYY-MM-DD');
      $("#date").val(hoy)


      video += " <div class='popup'><br><br>" +
        "<video id='video' width='100%' class='hide' controls autoplay muted> </video>" +
        "</div>";
      $("#videodirecto").html(video)
      for (let i = 0; i < noticias.length; i++) {

        var duracion = Math.round(Number(noticias[i].duration / 25 / 60));
        var irudiak = noticias[i].images;
        var start_directo = moment(noticias[i].onairdate).toDate(); // incluye fecha y hora del comienzo del directo
        var end_directo = moment(start_directo).add(duracion, 'm').toDate();

        var fechas = moment(noticias[i].onairdate).format('YYYY-MM-DD');
        var fechas_baq = moment(noticias[i].onairdate).format('YYYY-MM-DD'); // solo la fecha euskera
        var horas = new Date(noticias[i].onairdate).toLocaleTimeString('es', {
          hour: 'numeric',
          minute: 'numeric',
          second: 'numeric'
        });
        var directo = moment(now).isBetween(start_directo, end_directo); // true
        var directo_terminandose = moment(end_directo).subtract(5, 'm').toDate();
        var tiempo = moment(now).isBetween(directo_terminandose, end_directo)


        if (noticias[i].language == "baq") {


          if (directo === true) {

            noticia += "<div class='col-lg-12 col-md-12 col-sm-12 mb-4 order-2 row' >" +
              "<div class='card mb-3  box-shadow noticia_directo' id='zuzenean' data-valor='" + i + "'  >" +
              "<li class='caja' id='en-directo'>&nbsp; &nbsp; &nbsp; Zuzenean</li>";

          } else if (now < start_directo) {
            noticia += "<div class='col-lg-12 col-md-12  mb-4 col-sm-12 order-3 row' data-aos='zoom-in'>" +
              "<div class='card  mb-3  box-shadow noticias2 ' data-valor='" + i + "'>";

          } else if (now > end_directo) {
            noticia += "<div class='col-lg-12 col-md-12  mb-4 col-sm-12 order-1 row' data-aos='zoom-in'>" +
              "<div class='card  mb-3  box-shadow noticias_pasadas ' data-valor='" + i + "'>";
          }

          if (hoy === fechas) {
            noticia += "<div class='col-md-3'><p class='card-text'>" + horas + "</p><p class='card-text' id='ocultar_fecha'>" + fechas_baq + "</p></div>";
          } else {
            noticia += "<div class='col-md-3'><p class='card-text'>" + fechas_baq + ", " + horas + "</p></div>";
          }

          noticia += "<div class='col-md-6'><div class='card-body'>";


          noticia += "<b><p class='card-text'> " + noticias[i].title_baq + "</p></b>";
          noticia += "<p class='card-text'> Iraupena: " + duracion + " minutu</p>";


        } else {

          if (directo === true) {

            noticia += "<div class='col-lg-12 col-md-12 col-sm-12 mb-4 order-2 row'>" +
              "<div class='card mb-3  box-shadow noticia_directo' id='zuzenean' data-valor='" + i + "' >" +
              "<li class='caja' id='en-directo'>&nbsp; &nbsp; &nbsp;Zuzenean</li>";

          } else if (now < start_directo) {
            noticia += "<div class='col-lg-12 col-md-12  mb-4 col-sm-12 order-3 row' data-aos='zoom-in'>" +
              "<div class='card  mb-3  box-shadow noticias2 ' data-valor='" + i + "' >";

          } else if (now > end_directo) {
            noticia += "<div class='col-lg-12 col-md-12  mb-4 col-sm-12 order-1 row' data-aos='zoom-in'>" +
              "<div class='card  mb-3  box-shadow noticias_pasadas ' data-valor='" + i + "'>";
          }

          if (hoy === fechas) {
            noticia += "<div class='col-md-3'><p class='card-text'>" + horas + "</p><p class='card-text' id='ocultar_fecha'>" + fechas_baq + "</p></div>";
          } else {
            noticia += "<div class='col-md-3'><p class='card-text'>" + fechas_baq + ",   " + horas + "</p></div>";
          }
          noticia += "<div class='col-md-6'><div class='card-body'>";

          noticia += "<b><p class='card-text'>" + noticias[i].title_spa + "</p></b>";
          noticia += "<p class='card-text'> Iraupena: " + duracion + " minutu</p>";

        }

        noticia += "</div>";
        noticia += "</div>";
        if (irudiak == '') {

          noticia += "<div class='col-md-5'><img class='card-img-top' src='../img/default.png' style='object-fit:cover'; height='143px' width='236px'  alt='Card image cap'></div>";

        } else {

          noticia += "<div class='col-md-5'><img class='card-img-top'  src='" + irudiak[0].URL + "'  alt='Card image cap'></div>";

        }
        noticia += "</div>";
        noticia += "</div>";

        $("#noticias").html(noticia);

        $("#videos").hide();

        if (tiempo == true) {

          var previous = null;
          var current = null;
          setInterval(function () {
            $.getJSON("https://hodeia.eitb.eus/datuak/json/parrilla/last7days/canal1_ETB1HD.json", function (json) {
              current = JSON.stringify(json);
              if (previous && current && previous !== current) {

              }
              previous = current;
            });
          }, 30000);

        } else {


          var previous = null;
          var current = null;
          setInterval(function () {
            $.getJSON("https://hodeia.eitb.eus/datuak/json/parrilla/last7days/canal1_ETB1HD.json", function (json) {
              current = JSON.stringify(json);
              if (previous && current && previous !== current) {


              }
              previous = current;
            });
          }, 600000);

        }


        $("#date").on('input', function () {
          var value = $(this).val().toLowerCase();

          $(".card").filter(function () {
            //Esto hace un display none del padre del card, es decir, del col

            $(this).parent().toggle($(this).parent().text().toLowerCase().indexOf(value) > -1)

          });
        })

        var value = $("#date").val().toLowerCase();
        $(".card").filter(function () {
          //Esto hace un display none del padre del card, es decir, del col

          $(this).parent().toggle($(this).parent().text().toLowerCase().indexOf(value) > -1)

        });


      }

      $('#zuzenean_boton').on('click', function () {
        if (document.getElementById("zuzenean") == null) {

          swal("Hutsik", "Ez dago ezer zuzenean", "error")

        } else {
          $('html, body').animate({
            scrollTop: $("#zuzenean").offset().top - 160
          }, 600);
        }
      });


      $(".noticia_directo").click(function () {
        id = this.dataset.valor;
        var siguiente = Number(id) + 1

        var start_directo = moment(noticias[id].onairdate).toDate(); // incluye fecha y hora del comienzo del directo
        var end_directo = moment(noticias[siguiente].onairdate).toDate();


        var myEpochStart = start_directo / 1000 + 14;

        var video = document.getElementById('video');
        $("#videos").show();

        var videoSrc = "//live-dvr.eitb-fastly.cross-media.es/live-content/etb1hd-hls/master.m3u8?start=" + myEpochStart;



        if (Hls.isSupported()) {
          var hls = new Hls();
          hls.loadSource(videoSrc);
          hls.attachMedia(video);


        } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
          video.src = videoSrc;
        }

      })
      $(".noticias_pasadas").click(function () {

        id = this.dataset.valor;
        var siguiente = Number(id) + 1

        var start_directo = moment(noticias[id].onairdate).toDate(); // incluye fecha y hora del comienzo del directo
        var end_directo = moment(noticias[siguiente].onairdate).toDate();



        var myEpochStart = start_directo / 1000 + 14;
        var myEpochEnd = end_directo / 1000;
        var video = document.getElementById('video');
        $("#videos").show();
        var videoSrc = "//live-dvr.eitb-fastly.cross-media.es/live-content/etb1hd-hls/master.m3u8?start=" + myEpochStart + "&end=" + myEpochEnd;


        if (Hls.isSupported()) {
          var hls = new Hls();
          hls.loadSource(videoSrc);
          hls.attachMedia(video);


        } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
          video.src = videoSrc;
        }

      })

      $(".noticias2").click(function () {

        $("#videos").hide();
      })



      // Coge la id que está en el botón
      $(".card").click(function () {
        $("#video").show();
        $('.card').removeClass('active');
        $(this).addClass('active');

        id = this.dataset.valor;

        var irudiak = noticias[id].images;
        var duracion = Math.round(Number(noticias[id].duration / 25 / 60));
        var start_directo = moment(noticias[id].onairdate).toDate();
        var end_directo = moment(noticias[id].onairdate).add(duracion, 'm').toDate();
        var directo = moment(now).isBetween(start_directo, end_directo); // tr

        $("#noticia").show();


        noticiacompleta = '';


        if (noticias[id].language === "baq") {


          noticiacompleta += "<div class='col-12'>" +
            "<br><br><div class='card mb-3 box-shadow noticiacompleta'>" +
            "<a class='back'>&times;</a>";
          if (directo === true) {
            noticiacompleta += "<div class='noticiacompletadirecto'><li class='caja' id='en-directo'>&nbsp; &nbsp; &nbsp; Zuzenean</li></div>";
          }
          noticiacompleta += "<h1 justify-content-center>" + noticias[id].title_baq + "</h1>" +
            "<p justify-content-center>" + noticias[id].desc_baq + "</p>" +
            "<p justify-content-center>" + noticias[id].title_chapter_baq + "<br>";
          if (irudiak == '') {

            noticiacompleta += "<img src='../img/default.png'  class='rounded mt-5 mx-auto d-block'>";


          } else {
            noticiacompleta += "<img src='" + irudiak[0].URL + "' height='180px' width='320px' class='rounded mt-5 mx-auto d-block'>";
          }

          noticiacompleta += " <p class='mt-5'>" + noticias[id].desc_chapter_baq + "</p>";
        } else {

          noticiacompleta += "<div class='col-12'>" +
            "<br><br><div class='card mb-3 box-shadow noticiacompleta'>" +
            "<a class='back' >&times;</a>";
          if (directo === true) {
            noticiacompleta += "<div class='noticiacompletadirecto'><li class='caja' id='en-directo'>&nbsp; &nbsp; &nbsp; Zuzenean</li></div>";
          }
          noticiacompleta += "<h1 justify-content-center>" + noticias[id].title_spa + "</h1>" +
            "<p justify-content-center>" + noticias[id].desc_spa + "</p>" +
            "<p justify-content-center>" + noticias[id].title_chapter_spa + "<br>";

          if (irudiak == '') {

            noticiacompleta += "<img src='../img/default.png' class='rounded mt-5 mx-auto d-block'>";

          } else {
            noticiacompleta += "<img src='" + irudiak[0].URL + "' height='180px' width='320px' class='rounded mt-5 mx-auto d-block'>";
          }

          noticiacompleta += " <p class='mt-5'>" + noticias[id].desc_chapter_spa + "</p>";

        }

        noticiacompleta += "</div>" +
          "</div>";

        $("#noticia").html(noticiacompleta);
        //Del botón en directo 

        $("#noticia").mouseover(function () {
          $(".back").show();
        })
        $("#noticia").mouseout(function () {
          $(".back").hide();
        })
        $(".back").click(function () {
          $("#noticia").hide();
          $(".card").removeClass("active")

        })

      })

      //----------------CARGAR VIDEO EN DIRECTO SIN TOCAR NINGUNA CARD (FUERA DEL FOR)-------------------------


      if (directo != null) {
        window.location.href = "#zuzenean";
        window.scrollBy(0, -160);
      }

      idcard = $(".noticia_directo").attr("data-valor");


      var start_directo = moment(noticias[idcard].onairdate).toDate(); // incluye fecha y hora del comienzo del directo
      var end_directo = moment(start_directo).add(duracion, 'm').toDate();
      var directo = moment(now).isBetween(start_directo, end_directo); // true
      var irudiak = noticias[idcard].images;



      var myEpochStart = start_directo / 1000 + 14;

      var video = document.getElementById('video');
      $("#videos").show();
      var videoSrc = "//live-dvr.eitb-fastly.cross-media.es/live-content/etb1hd-hls/master.m3u8?start=" + myEpochStart;





      if (Hls.isSupported()) {
        var hls = new Hls();
        hls.loadSource(videoSrc);
        hls.attachMedia(video);

      } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
        video.src = videoSrc;
      }

      //----------------CARGAR VIDEO EN DIRECTO SIN TOCAR NINGUNA CARD FIN-------------------------

      //----------------CARGAR NOTICIA EN DIRECTO  SIN TOCAR NINGUNA CARD (FUERA DEL FOR)-------------------------


      $("#noticia").show();


      noticiacompleta = '';


      if (noticias[idcard].language === "baq") {

        noticiacompleta += "<div class='col-12'>" +
          "<br><br><div class='card mb-3 box-shadow noticiacompleta'>" +
          "<a class='back'>&times;</a>";

        noticiacompleta += "<div class='noticiacompletadirecto'><li class='caja' id='en-directo'>&nbsp; &nbsp; &nbsp; Zuzenean</li></div>";

        noticiacompleta += "<h1 justify-content-center>" + noticias[idcard].title_baq + "</h1>" +
          "<p justify-content-center>" + noticias[idcard].desc_baq + "</p>" +
          "<p justify-content-center>" + noticias[idcard].title_chapter_baq + "<br>";
        if (irudiak == '') {

          noticiacompleta += "<img src='../img/default.png'  class='rounded mt-5 mx-auto d-block'>";


        } else {
          noticiacompleta += "<img src='" + irudiak[0].URL + "' height='180px' width='320px' class='rounded mt-5 mx-auto d-block'>";
        }

        noticiacompleta += " <p class='mt-5'>" + noticias[idcard].desc_chapter_baq + "</p>";
      } else {

        noticiacompleta += "<div class='col-12'>" +
          "<br><br><div class='card mb-3 box-shadow noticiacompleta'>" +
          "<a class='back'>&times;</a>";

        noticiacompleta += "<div class='noticiacompletadirecto'><li class='caja' id='en-directo'>&nbsp; &nbsp; &nbsp; Zuzenean</li></div>";

        noticiacompleta += "<h1 justify-content-center>" + noticias[idcard].title_spa + "</h1>" +
          "<p justify-content-center>" + noticias[idcard].desc_spa + "</p>" +
          "<p justify-content-center>" + noticias[idcard].title_chapter_spa + "<br>";

        if (irudiak == '') {

          noticiacompleta += "<img src='../img/default.png' class='rounded mt-5 mx-auto d-block'>";

        } else {
          noticiacompleta += "<img src='" + irudiak[0].URL + "' height='180px' width='320px' class='rounded mt-5 mx-auto d-block'>";
        }

        noticiacompleta += " <p class='mt-5'>" + noticias[idcard].desc_chapter_spa + "</p>";

      }

      noticiacompleta += "</div>" +
        "</div>";

      $("#noticia").html(noticiacompleta);

      $("#noticia").mouseover(function () {
        $(".back").show();
      })
      $("#noticia").mouseout(function () {
        $(".back").hide();
      })
      //Del botón en directo 
      $(".back").click(function () {
        $("#noticia").hide();
        $(".card").removeClass("active")

      })

      //----------------CARGAR NOTICIA EN DIRECTO FIN SIN TOCAR NINGUNA CARD (FUERA DEL FOR)-------------------------

    })
    .catch(error => console.error('Error status:', error));
}


// /*Cargar noticias eitb1 en el select*/
function loadSelectEitb1() {


  fetch('https://hodeia.eitb.eus/datuak/json/parrilla/last7days/canal1_ETB1HD.json')

    .then(res => res.json()).then(result => {

      var noticias = result.epg;

      var selectNoticia = '';

      /*Cargar los equipos en el select*/

      selectNoticia = "<option  selected value='all'>Guztiak</option>";
      for (let i = 0; i < noticias.length; i++) {

        selectNoticia += "<option id='" + noticias[i].content_descriptor_text1 + "'>" + noticias[i].content_descriptor_text1 + "</option>";

        $("#selectEquipos").append(selectNoticia);

      }
      /*Cargar los equipos en el select fin*/

      /*Eliminar campos duplicados*/
      var optionValues = [];
      $('#selectEquipos option').each(function () {
        if ($.inArray(this.value, optionValues) > -1) {
          $(this).remove()
        } else {
          optionValues.push(this.value);
        }
      });
      /*Eliminar campos duplicados fin*/

      $("#selectEquipos").val("all").change(function () {
        cargarUltimasNoticiasEitb1();
        $("#divFiltro").hide();
        $("#btnBuscarUsuario").show();
        $("#filtro").val('');


      })

      /*Conseguir la id del equipo y añadir una funcion al hacer change*/
      $("#selectEquipos").change(function () {

        $("#divFiltro").hide();
        $("#btnBuscarUsuario").show();
        $("#filtro").val('');
        var content_descriptor_text1 = $(this).children(":selected").attr("id");

        document.getElementById("selectEquipos").addEventListener("click", loadCategoryByContentEitb1(content_descriptor_text1));


      });

    })
    .catch(error => console.error('Error status:', error));

}

/*Cargar noticias eitb1 según el select*/
function loadCategoryByContentEitb1(content_descriptor_text1) {

  fetch('https://hodeia.eitb.eus/datuak/json/parrilla/last7days/canal1_ETB1HD.json')

    .then(res => res.json()).then(result => {

      var noticias = result.epg;
      //limpiar div para que no se repita

      var now = moment().toDate();
      var hoy = moment().format('YYYY-MM-DD');

      var noticia = '';

      for (let i = 0; i < noticias.length; i++) {

        var duracion = Math.round(Number(noticias[i].duration / 25 / 60));
        var irudiak = noticias[i].images;
        var start_directo = moment(noticias[i].onairdate).toDate(); // incluye fecha y hora del comienzo del directo
        var end_directo = moment(start_directo).add(duracion, 'm').toDate();
        var fechas = moment(noticias[i].onairdate).format('YYYY-MM-DD'); // solo la fecha euskera

        var fechas_baq = moment(noticias[i].onairdate).format('YYYY-MM-DD'); // solo la fecha euskera
        var fechas_spa = moment(noticias[i].onairdate).format('DD-MM-YYYY'); // solo la fecha español
        var horas = new Date(noticias[i].onairdate).toLocaleTimeString('es', {
          hour: 'numeric',
          minute: 'numeric',
          second: 'numeric'
        });
        var directo = moment(now).isBetween(start_directo, end_directo); // true
        var directo_terminandose = moment(end_directo).subtract(5, 'm').toDate();
        var tiempo = moment(now).isBetween(directo_terminandose, end_directo)

        if (noticias[i].content_descriptor_text1 == content_descriptor_text1) {


          if (noticias[i].language == "baq") {


            if (directo === true) {

              noticia += "<div class='col-lg-12 col-md-12 col-sm-12 mb-4 order-2 row' >" +
                "<div class='card mb-3  box-shadow noticia_directo' id='zuzenean' data-valor='" + i + "'>" +
                "<li class='caja' id='en-directo'>&nbsp; &nbsp; &nbsp; Zuzenean</li>";

            } else if (now < start_directo) {
              noticia += "<div class='col-lg-12 col-md-12  mb-4 col-sm-12 order-3 row' data-aos='zoom-in'>" +
                "<div class='card  mb-3  box-shadow noticias2 ' data-valor='" + i + "'>";

            } else if (now > end_directo) {
              noticia += "<div class='col-lg-12 col-md-12  mb-4 col-sm-12 order-1 row' data-aos='zoom-in'>" +
                "<div class='card  mb-3  box-shadow noticias_pasadas ' data-valor='" + i + "' >";
            }

            if (hoy === fechas) {
              noticia += "<div class='col-md-3'><p class='card-text'>" + horas + "</p><p class='card-text' id='ocultar_fecha'>" + fechas_baq + "</p></div>";
            } else {
              noticia += "<div class='col-md-3'><p class='card-text'>" + fechas_baq + ", " + horas + "</p></div>";
            }

            noticia += "<div class='col-md-6'><div class='card-body'>";


            noticia += "<b><p class='card-text'> " + noticias[i].title_baq + "</p></b>";
            noticia += "<p class='card-text'> Iraupena: " + duracion + " minutu</p>";


          } else {

            if (directo === true) {

              noticia += "<div class='col-lg-12 col-md-12 col-sm-12 mb-4 order-2 row' >" +
                "<div class='card mb-3  box-shadow noticia_directo' id='zuzenean' data-valor='" + i + "' >" +
                "<li class='caja' id='en-directo'>&nbsp; &nbsp; &nbsp;Zuzenean</li>";

            } else if (now < start_directo) {
              noticia += "<div class='col-lg-12 col-md-12  mb-4 col-sm-12 order-3 row' data-aos='zoom-in'>" +
                "<div class='card  mb-3  box-shadow noticias2 ' data-valor='" + i + "' >";

            } else if (now > end_directo) {
              noticia += "<div class='col-lg-12 col-md-12  mb-4 col-sm-12 order-1 row' data-aos='zoom-in'>" +
                "<div class='card  mb-3  box-shadow noticias_pasadas ' data-valor='" + i + "' >";
            }

            if (hoy === fechas) {
              noticia += "<div class='col-md-3'><p class='card-text'>" + horas + "</p><p class='card-text' id='ocultar_fecha'>" + fechas_baq + "</p></div>";
            } else {
              noticia += "<p class='card-text'>" + fechas_baq + ",   " + horas + "</p>";
            }
            noticia += "<div class='col-md-6'><div class='card-body'>";

            noticia += "<b><p class='card-text'>" + noticias[i].title_spa + "</p></b>";
            noticia += "<p class='card-text'> Iraupena: " + duracion + " minutu</p>";



          }

          noticia += "</div>";
          noticia += "</div>";
          if (irudiak == '') {

            noticia += "<div class='col-md-5'><img class='card-img-top' src='../img/default.png' style='object-fit:cover'; height='143px' width='236px'  alt='Card image cap'></div>";

          } else {

            noticia += "<div class='col-md-5'><img class='card-img-top'  src='" + irudiak[0].URL + "'  alt='Card image cap'></div>";

          }
          noticia += "</div>";

          noticia += "</div>";

          $("#noticias").html(noticia);


          if (tiempo == true) {

            var previous = null;
            var current = null;
            setInterval(function () {
              $.getJSON("https://hodeia.eitb.eus/datuak/json/parrilla/last7days/canal1_ETB1HD.json", function (json) {
                current = JSON.stringify(json);
                if (previous && current && previous !== current) {


                }
                previous = current;
              });
            }, 30000);

          } else {


            var previous = null;
            var current = null;
            setInterval(function () {
              $.getJSON("https://hodeia.eitb.eus/datuak/json/parrilla/last7days/canal1_ETB1HD.json", function (json) {
                current = JSON.stringify(json);
                if (previous && current && previous !== current) {


                }
                previous = current;
              });
            }, 600000);

          }

        }

      }

      $("#date").val('')

      $('#zuzenean_boton').on('click', function () {
        if (document.getElementById("zuzenean") == null) {

          swal("Hutsik", "Ez dago ezer zuzenean", "error")

        } else {
          $('html, body').animate({
            scrollTop: $("#zuzenean").offset().top - 160
          }, 600);
        }
      });

      $(".noticia_directo").click(function () {
        id = this.dataset.valor;
        var siguiente = Number(id) + 1

        var start_directo = moment(noticias[id].onairdate).toDate(); // incluye fecha y hora del comienzo del directo
        var end_directo = moment(noticias[siguiente].onairdate).toDate();
        var myEpochStart = start_directo / 1000 + 14;
        var video = document.getElementById('video');
        $("#videos").show();
        var videoSrc = "//live-dvr.eitb-fastly.cross-media.es/live-content/etb1hd-hls/master.m3u8?start=" + myEpochStart;



        if (Hls.isSupported()) {
          var hls = new Hls();
          hls.loadSource(videoSrc);
          hls.attachMedia(video);

        } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
          video.src = videoSrc;
        }

      })
      $(".noticias_pasadas").click(function () {

        id = this.dataset.valor;
        var siguiente = Number(id) + 1

        var start_directo = moment(noticias[id].onairdate).toDate(); // incluye fecha y hora del comienzo del directo
        var end_directo = moment(noticias[siguiente].onairdate).toDate();


        var myEpochStart = start_directo / 1000 + 14;
        var myEpochEnd = end_directo / 1000;
        var video = document.getElementById('video');
        $("#videos").show();
        var videoSrc = "//live-dvr.eitb-fastly.cross-media.es/live-content/etb1hd-hls/master.m3u8?start=" + myEpochStart + "&end=" + myEpochEnd;




        if (Hls.isSupported()) {
          var hls = new Hls();
          hls.loadSource(videoSrc);
          hls.attachMedia(video);


        } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
          video.src = videoSrc;
        }

      })



      $(".noticias2").click(function () {

        $("#videos").hide();
      })



      // Coge la id que está en el botón
      $(".card").click(function () {

        $('.card').removeClass('active');
        $(this).addClass('active');

        id = this.dataset.valor;

        var irudiak = noticias[id].images;
        var duracion = Math.round(Number(noticias[id].duration / 25 / 60));
        var start_directo = moment(noticias[id].onairdate).toDate();
        var end_directo = moment(noticias[id].onairdate).add(duracion, 'm').toDate();
        var directo = moment(now).isBetween(start_directo, end_directo); // tr

        $("#noticia").show();


        noticiacompleta = '';


        if (noticias[id].language === "baq") {


          noticiacompleta += "<div class='col-12'>" +
            "<br><br><div class='card mb-3 box-shadow noticiacompleta'>" +
            "<a class='back'>&times;</a>";
          if (directo === true) {
            noticiacompleta += "<div class='noticiacompletadirecto'><li class='caja' id='en-directo'>&nbsp; &nbsp; &nbsp; Zuzenean</li></div>";
          }
          noticiacompleta += "<h1 justify-content-center>" + noticias[id].title_baq + "</h1>" +
            "<p justify-content-center>" + noticias[id].desc_baq + "</p>" +
            "<p justify-content-center>" + noticias[id].title_chapter_baq + "<br>";
          if (irudiak == '') {

            noticiacompleta += "<img src='../img/default.png'  class='rounded mt-5 mx-auto d-block'>";


          } else {
            noticiacompleta += "<img src='" + irudiak[0].URL + "' height='180px' width='320px' class='rounded mt-5 mx-auto d-block'>";
          }

          noticiacompleta += " <p class='mt-5'>" + noticias[id].desc_chapter_baq + "</p>";
        } else {

          noticiacompleta += "<div class='col-12'>" +
            "<br><br><div class='card mb-3 box-shadow noticiacompleta'>" +
            "<a class='back'>&times;</a>";
          if (directo === true) {
            noticiacompleta += "<div class='noticiacompletadirecto'><li class='caja' id='en-directo'>&nbsp; &nbsp; &nbsp; Zuzenean</li></div>";
          }
          noticiacompleta += "<h1 justify-content-center>" + noticias[id].title_spa + "</h1>" +
            "<p justify-content-center>" + noticias[id].desc_spa + "</p>" +
            "<p justify-content-center>" + noticias[id].title_chapter_spa + "<br>" +
            "<p justify-content-center><u>Edad</u>: " + noticias[id].parental_rating + "<br>";

          if (irudiak == '') {

            noticiacompleta += "<img src='../img/default.png' class='rounded mt-5 mx-auto d-block'>";

          } else {
            noticiacompleta += "<img src='" + irudiak[0].URL + "' height='180px' width='320px' class='rounded mt-5 mx-auto d-block'>";
          }

          noticiacompleta += " <p class='mt-5'>" + noticias[id].desc_chapter_spa + "</p>";

        }

        noticiacompleta += "</div>" +
          "</div>";

        $("#noticia").html(noticiacompleta);
        //Del botón en directo 
        $("#noticia").mouseover(function () {
          $(".back").show();
        })
        $("#noticia").mouseout(function () {
          $(".back").hide();
        })
        $(".back").click(function () {
          $("#noticia").hide();
          $(".card").removeClass("active")

        })

      })

    })
    .catch(error => console.error('Error status:', error));

}

//-----------------------------FILTRO BUSCAR-----------------------------------
$("#btnBuscarUsuario").click(function () {
  $("#divFiltro").show();
  $("#btnBuscarUsuario").hide();
  $(".album").css("margin-top", "37px");

})

$('#filtro').on("keyup", function () {
  var value = $(this).val().toLowerCase();

  $("#date").val('')
  $(".card").filter(function () {
    //Esto hace un display none del padre del card, es decir, del col
    $(this).parent().toggle($(this).parent().text().toLowerCase().indexOf(value) > -1)

  });


});

/*Función para cerrar el filtro, hay que resetear*/
function cerrarFiltro() {

  $("#divFiltro").hide();
  $("#btnBuscarUsuario").show();
  $(".card").parent().show();
  $("#filtro").val('');

}