
$(document).ready(function() {
  let data_menu;
  let info_produits = {'pizza' : {}, 'entree' : {}, 'boisson' : {}, 'menu' : {}};
  let panier = {'pizza' : [], 'entree' : [], 'boisson' : [], 'menu' : {}};
  let nb_menu = 0;
  function ajoutPanier(e){
    for(let i=0; i<panier[e].length; i++){
      $("#panier").append('<p id="' + e + i + '">' + panier[e][i] + '</p>');
     }
  }
  function ajoutMenuPanier(){
    for(let i in panier["menu"]){
      $("#panier").append('<p id="' + i + '">' + panier["menu"][i]["nom"]);
      for(let j in panier["menu"][i]["entree"]){
        $("#panier").append('<br>' +panier["menu"][i]["entree"][j] );
      }
      for(let j in panier["menu"][i]["pizza"]){
        $("#panier").append('<br>' + panier["menu"][i]["pizza"][j] );
      }
      for(let j in panier["menu"][i]["boisson"]){
        $("#panier").append('<br>' + panier["menu"][i]["boisson"][j] );
      }
      $("#panier").append('</p>');
    }
  }
  function actualiserPanier(){
   $("#panier").empty();
   ajoutPanier("pizza");
   ajoutPanier("entree");
   ajoutPanier("boisson")
   ajoutMenuPanier();
  }
  function actualiserPrix(){
    let prix = 0;
    for(let i in panier['pizza']){
      prix += parseInt(info_produits[i]['prix']);
    }
    for(let i in panier['entree']){
      prix += parseInt(info_produits[i]['prix']);
    }
    for(let i in panier['boisson']){
      prix += parseInt(info_produits[i]['prix']);
    }
    for(let i in panier['menu']){
      prix += parseInt(info_produits['menu'][panier['menu'][i]['nom']]['prix']);
    }
    $('#prix').text(prix + '€');
  }
  function ajout(e){
    $.get("http://localhost:8080/"+ e,{},
    function(data) {
      let elphoto = '<div class="container-fluid '+e +'"><div class="row">';
      for(let i=0; i<data.length; i++){
        info_produits[e][data[i]["nom"]] = data[i];
        elphoto += ' <div id="' + data[i]["nom"] + '"';
        elphoto += ' class="col-lg-3 col-md-4 col-sm-6 photo">';
        elphoto += '<p>' +data[i]["nom"] + '<input type="checkbox" class="choix" value="'+data[i]["nom"]+'"></p>' + '<img height="200" width="200"  src="../images/'+data[i]["photo"] + '"></div>';
      }
      elphoto += '</div></div>';
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
      for(let i=0; i<data.length; i++){
        info_produits['menu'][data[i]["nom"]] = data[i];
        elphoto = '<button id="' + data[i]['nom'] +'" class="boutonMenu" type="button">' +data[i]['nom']+ ' menu</button>';
        $('body').append(elphoto);
        $('#liste'+data[i]['nom']).hide();
        $('#'+data[i]['nom']).click(function() {
          $('.boutonPopup').prop('disabled', true);
          $('#ajoutPizza').prop('disabled', false);
          $('#popup').show();
          $('.pizza').show();
          $('#ajoutPizza').hide();
          $('#ajoutBoisson').hide();
          $('#ajoutEntree').show();
          $('#confirmer').hide();
          $('.pizza .choix').off().on('change', function() {
            if($('.pizza input[type=checkbox]:checked').length > data[i]['nb_pizza']){
                this.checked = false;
            }
            else if($('.pizza input[type=checkbox]:checked').length == data[i]['nb_pizza']){
              $('#ajoutEntree').prop('disabled', false);
            }else{
              $('#ajoutEntree').prop('disabled', true);
            }
          });
          $('.entree .choix').off().on('change', function() {
            if($('.entree input[type=checkbox]:checked').length > data[i]['nb_entree']) {
                this.checked = false;
            }
            else if($('.entree input[type=checkbox]:checked').length == data[i]['nb_entree']){
              $('#ajoutBoisson').prop('disabled', false);
            }
            else{
              $('#ajoutBoisson').prop('disabled', true);
            }
          });
          $('.boisson .choix').off().on('change', function() {
            if($('.boisson input[type=checkbox]:checked').length > data[i]['nb_boisson']){
                this.checked = false;
            }
            else if($('.boisson input[type=checkbox]:checked').length == data[i]['nb_boisson']){
                 $('#confirmer').prop('disabled', false);
            }  
            else{
              $('#confirmer').prop('disabled', true);
            }
          });
          $('#ajoutPizza').off().click(function(){
            $('#popup .container-fluid').hide();
            $('#ajoutPizza').hide();
            $('#ajoutBoisson').hide();
            $('#ajoutEntree').show();
            $('#popup').show();
            $('.pizza').show();
            $('#confirmer').hide();
          });
          $('#ajoutEntree').off().click(function(){
            $('#popup .container-fluid').hide();
            $('#ajoutPizza').show();
            $('#confirmer').hide();
            $('#ajoutBoisson').show();
            $('#ajoutEntree').hide();
            $('#popup').show();
            $('.entree').show();
           
          });
          $('#ajoutBoisson').off().click(function(){
            $('#confirmer').show();
            $('#popup .container-fluid').hide();
            $('#ajoutPizza').hide();
            $('#ajoutBoisson').hide();
            $('#ajoutEntree').show();
            $('#popup').show();
            $('.boisson').show();
          });
          $('#confirmer').off().click(function(){
            panier['menu']['menu'+nb_menu] = {'nom' : data[i]['nom'], 'pizza' : [], 'boisson' : [], 'entree' : []};
            
            $('.boisson input[type=checkbox]:checked').each(function() {
              panier['menu']['menu'+nb_menu]['boisson'].push($(this).val());
            });
            $('.entree input[type=checkbox]:checked').each(function() {
              panier['menu']['menu'+nb_menu]['entree'].push($(this).val());
            });
            $('.pizza input[type=checkbox]:checked').each(function() {
              panier['menu']['menu'+nb_menu]['pizza'].push($(this).val());
            });
            $('#popup').hide();
            $('#popup .container-fluid').hide();
            $('.choix').prop( "checked", false );
            actualiserPrix();
            actualiserPanier();
            nb_menu++;
          })
         
      });
      }


    });

  }

  function formToJSON(form) {
    let array = $(form).serializeArray(); 
    let json = {};
    $.each(array, function () {
      json[this.name] = this.value || "";
    });
    return json;
  }
  
  $("#commander").click(function(){
    $.get("http://localhost:8080/formulaire" ,{},
    function(data) {
      let doc = document.open('text/html', 'replace');
      doc.write(data);
      doc.close();
      
      $('#submit').click(function(e){
        e.preventDefault();
        $.post("http://localhost:8080/formulaire-client",  {'form' : formToJSON('#form'), 'panier' : panier},
        function(data) {
          let doc = document.open('text/html', 'replace');
          doc.write(data);
          doc.close();
        });
    });
    });
  });

  $('.fermerPopup').click(function(){
    $('#popup').hide();
    $('#popup .container-fluid').hide();
    $('.choix').prop( "checked", false );
  });
  menu();
  

});
