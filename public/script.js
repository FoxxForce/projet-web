$(document).ready(function() {
  let extra = $('#extra');
  let listeExtra = $('#listeExtra');
  let mega = $('#mega');
  let listeMega = $('#listeMega');
  let giga = $('#giga');
  let listeGiga = $('#listeGiga');

  listeExtra.hide();
  extra.click(function() {
    listeExtra.slideToggle();
  });

  listeMega.hide();
  mega.click(function() {
    listeMega.slideToggle();
  });

  listeGiga.hide();
  giga.click(function() {
    listeGiga.slideToggle();
  });


  function ajout(e){
    $.get("http://localhost:8080/"+ e,{},
    function(data) {
      let elphoto = '<div class="container-fluid '+e +'"><div class="row">';
      for(let i=0; i<data.length; i++){
        elphoto += ' <div id="' + data[i]["nom"] + '"';
        elphoto += ' class="col-lg-3 col-md-3 col-sm-3 photo">';
        elphoto += '<p>' +data[i]["nom"] + '<input type="checkbox" class="choix" name="'+data[i]["nom"]+'"></p>' + '<img height="200" width="200"  src="../images/'+data[i]["photo"] + '"></div>';
      }
      elphoto += '</div></div>';
      console.log("elphoto");
      $('#popup').append(elphoto);
      $('.'+e).hide();
    });
  }
  ajout('pizza');
  ajout('entree');
  ajout('boisson');
  function menu(){
    $.get("http://localhost:8080/menu" ,{},
    function(data) {
      let elphoto = "";
      console.log(data);
      for(let i=0; i<data.length; i++){
        elphoto = '<button id="' + data[i]['nom'] +'" type="button">' +data[i]['nom']+ 'menu</button>';
        elphoto += '<ul id="liste'+ data[i]['nom'] +'">'
        elphoto += '<li class="popupButton ajoutPizza">Ajout pizza</li>'
        elphoto += '<li class="popupButton ajoutEntree">Ajout  entrée</li>'
        elphoto += '<li class="popupButton ajoutBoisson">Ajout boisson</li></ul>'
        console.log(elphoto);
        $('body').append(elphoto);
        $('#liste'+data[i]['nom']).hide();
        $('#'+data[i]['nom']).click(function() {
          $('#liste'+data[i]['nom']).slideToggle();
      });
        $('#liste'+data[i]['nom']+' .ajoutPizza').click(function(){
          $('#popup').show();
          $('.pizza').show();
          $('.pizza .choix').off().on('change', function() {
            console.log("okok" +data[i]['nb_pizza']);
            if($('.pizza input[type=checkbox]:checked').length > data[i]['nb_pizza']) {
                this.checked = false;
            }
          });
        });
        $('#liste'+data[i]['nom']+' .ajoutEntree').click(function(){
          $('#popup').show();
          $('.entree').show();
          $('.entree .choix').off().on('change', function() {
            console.log("okok" +data[i]['entree']);
            if($('.entree input[type=checkbox]:checked').length > data[i]['nb_entree']) {
                this.checked = false;
            }
          });
        });
        $('#liste'+data[i]['nom']+' .ajoutBoisson').click(function(){
          $('#popup').show();
          $('.boisson').show();
          $('.boisson .choix').off().on('change', function() {
            if($('.boisson input[type=checkbox]:checked').length > data[i]['nb_boisson']) {
                this.checked = false;
            }
          });
        });
      }


    });

  }
  menu();

    $('.popupClose').click(function(){
        $('#popup').hide();
        $('#popup .container-fluid').hide();
    });


});
