$(document).ready(function() {
  $(".trigger_popup_fricc").click(function(){
       $('.hover_bkgr_fricc').show();
       $.get("http://localhost:8080/pizza",{},
        function(data) {
          console.log(data);
          for(let i=0; i<data.length; i++){
            console.log(data[i]["photo"]);

            $('#listPizza').append('<img src="../images/'+data[i]["photo"] + '">'+ data[i]["nom"]);
          }
        });
    });
    $('.popupCloseButton').click(function(){
        $('.hover_bkgr_fricc').hide();
    });

  /*$(".boisson").click(function(){

  });

  $(".entree").click(function(){

  });*/


});
