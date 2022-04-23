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
          $('.popup').show();
          $('#popup').show();
          $('.pizza').show();
          $('.pizza .choix').off().on('change', function() {
            console.log("okok" +data[i]['nb_pizza']);
            if($('input[type=checkbox]:checked').length > data[i]['nb_pizza']) {
                this.checked = false;
            }
          });
        });
      }
      
      
    });
    
  }
  menu();
       /* $('#liste'+data[i]['nom']+' .ajoutBoisson').click(function(){
          $('.popup').show();
          $('#popup').show();
          $('.boisson').show();
          $('.boisson .choix').on('change', function() {
            if($(this).siblings(':checked').length >= data[i]['nb_boisson']) {
                this.checked = false;
            }
          });
        });
        $('#liste'+data[i]['nom']+' .ajoutEntree').click(function(){
          $('.popup').show();
          $('#popup').show();
          $('.entree').show();
          $('.entree .choix').on('change', function() {
            if($(this).siblings(':checked').length >= data[i]['nb_entree']) {
                this.checked = false;
            }
          });
        });
      }
    });*/
  

  $('.ajoutPizza').click(function(){
    $('.popup').show();
    $('#popup').show();
    $('.pizza').show();
    });
    $('.popupClose').click(function(){
        $('.popup').hide();
        $('#popup').hide();
        $('#popup .container-fluid').hide();
    });


});

/*
$(document).ready(function() {
  let extra = $('#extra');
  let listeExtra = $('#listExtra');
  listeExtra.hide();

  

  function ajout(e){
    $('#pizza.popup').show();
    $('.row').empty();
    $.get("http://localhost:8080/"+ e,{},
    function(data) {
      let elphoto = '<div class="container-fluid"><div class="row">';
      for(let i=0; i<data.length; i++){
        elphoto += ' <div id="' + data[i]["photo"] + '"';
        elphoto += ' class="col-lg-3 col-md-6 col-sm-3 photo">';
        elphoto += '<p>' +data[i]["photo"] + '</p>' + '<img height="200" width="200"  src="../images/'+data[i]["photo"] + '"></div>';
      }
      elphoto += '</div></div>';
      console.log("elphoto");
      $('#popup').append(elphoto );
    });
  }

  extra.click(function() {
    listeExtra.slideToggle();
  });

  $('#ajoutPizza').click(ajout("pizza"));

  $('.popupClose').click(function(){
      $('.popup').hide();
      $('#listPizza').empty();
    });
*/