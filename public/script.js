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
        console.log(elphoto);
        $('body').append(elphoto);
        $('#liste'+data[i]['nom']).hide();
        $('#'+data[i]['nom']).click(function() {
          $('.popupButton').prop('disabled', true);
          $('.ajoutPizza').prop('disabled', false);
          $('#popup').show();
          $('.pizza').show();
          $('.ajoutPizza').hide();
          $('.ajoutBoisson').hide();
          $('.ajoutEntree').show();
          $('.confirmer').hide();
          $('.pizza .choix').off().on('change', function() {
            if($('.pizza input[type=checkbox]:checked').length > data[i]['nb_pizza']) {
                this.checked = false;
            }
            else if($('.pizza input[type=checkbox]:checked').length == data[i]['nb_pizza']){
              $('.ajoutEntree').prop('disabled', false);
            }else{
              $('.ajoutEntree').prop('disabled', true);
            }
          });
          $('.entree .choix').off().on('change', function() {
            if($('.entree input[type=checkbox]:checked').length > data[i]['nb_entree']) {
                this.checked = false;
            }
            else if($('.entree input[type=checkbox]:checked').length == data[i]['nb_entree']){
              $('.ajoutBoisson').prop('disabled', false);
            }
            else{
              $('.ajoutBoisson').prop('disabled', true);
            }
          });
          $('.boisson .choix').off().on('change', function() {
            if($('.boisson input[type=checkbox]:checked').length > data[i]['nb_boisson']) {
                this.checked = false;
            }
            else if($('.boisson input[type=checkbox]:checked').length == data[i]['nb_boisson']){
                 $('.confirmer').prop('disabled', false);
            }  
            else{
              $('.confirmer').prop('disabled', true);
            }
          });
          $('.ajoutPizza').off().click(function(){
            $('#popup .container-fluid').hide();
            $('.ajoutPizza').hide();
            $('.ajoutBoisson').hide();
            $('.ajoutEntree').show();
            $('#popup').show();
            $('.pizza').show();
            $('.confirmer').hide();
          });
          $('.ajoutEntree').off().click(function(){
            $('#popup .container-fluid').hide();
            $('.ajoutPizza').show();
            $('.confirmer').hide();
            $('.ajoutBoisson').show();
            $('.ajoutEntree').hide();
            $('#popup').show();
            $('.entree').show();
           
          });
          $('.ajoutBoisson').off().click(function(){
            $('.confirmer').show();
            $('#popup .container-fluid').hide();
            $('.ajoutPizza').hide();
            $('.ajoutBoisson').hide();
            $('.ajoutEntree').show();
            $('#popup').show();
            $('.boisson').show();
          });
      });
        
      }


    });

  }
  menu();

    $('.popupClose').click(function(){
        $('#popup').hide();
        $('#popup .container-fluid').hide();
        $('.choix').prop( "checked", false );
    });


});
