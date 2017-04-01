$( document ).ready(function() {
  $("#tableMenuAlbum").val(1)
  $("#conteneurPhotoAlbum").val(1)
  $( "#boutonMenuAlbumPre" ).hide();
  $( "#boutonMenuAlbumSuiv" ).show();
  $( "#boutonMenuAlbumDebut" ).hide();
  $( "#boutonPhotoPre" ).hide();
  hideImgTable();
  hideImgAlbum();


  if ($(".cellMenuAlbum").length <= 12) {
    $( "#boutonMenuAlbumSuiv" ).hide();
    $( "#boutonMenuAlbumFin" ).hide();
  }

  if($(".photoAlbum").length <= 1){
    $( "#boutonPhotoSuiv" ).hide();
  }

    $("#boutonMenuAlbumPre").click(function() {
      tableIncrement(-12);
    });

    $("#boutonMenuAlbumSuiv").click(function() {
      tableIncrement(12);
    });

    $("#boutonMenuAlbumFin").click(function() {
      while (!(parseInt($("#tableMenuAlbum").val()) + 12 > $(".cellMenuAlbum").length)) {
        $("#boutonMenuAlbumSuiv").trigger("click");
      }
    });

    $("#boutonMenuAlbumDebut").click(function(){
      while(!($("#tableMenuAlbum").val() <= 1)){
        $("#boutonMenuAlbumPre").trigger("click");
      }
    });

    $("#boutonPhotoPre").click(function() {
      AlbumIncrement(-1);
    });

    $("#boutonPhotoSuiv").click(function() {
      AlbumIncrement(1);
    });


    function tableIncrement(value) {
      $("#tableMenuAlbum").val(parseInt($("#tableMenuAlbum").val())+value);
      if($("#tableMenuAlbum").val() <= 1){
        $( "#boutonMenuAlbumPre" ).hide();
        $( "#boutonMenuAlbumDebut" ).hide();
      }
      else {
        $( "#boutonMenuAlbumPre" ).show();
        $( "#boutonMenuAlbumDebut" ).show();
      }

      if(parseInt($("#tableMenuAlbum").val()) + 12 > $(".cellMenuAlbum").length){
        $( "#boutonMenuAlbumSuiv" ).hide();
        $( "#boutonMenuAlbumFin" ).hide();
      }else{
        $( "#boutonMenuAlbumSuiv" ).show();
        $( "#boutonMenuAlbumFin" ).show();
      }

      hideImgTable();

    }

    function AlbumIncrement(value) {
      $("#conteneurPhotoAlbum").val(parseInt($("#conteneurPhotoAlbum").val())+value);
      if($("#conteneurPhotoAlbum").val() <= 1){
        $( "#boutonPhotoPre" ).hide();
      }else{
        $( "#boutonPhotoPre" ).show();
      }

      if($("#conteneurPhotoAlbum").val() >= $(".photoAlbum").length){
        $( "#boutonPhotoSuiv" ).hide();
      }else{
        $( "#boutonPhotoSuiv" ).show();
      }

      hideImgAlbum();
    }

    function hideImgTable() {
      $(".cellMenuAlbum").hide();

      var i = 1;


      $(".cellMenuAlbum").each(function() {

        if(i >= parseInt($("#tableMenuAlbum").val()) && i < parseInt($("#tableMenuAlbum").val())+12){
          $(this).show();
        }

        i++;
      })
    }

    function hideImgAlbum() {
      $('.photoAlbum').hide();

      var i = 1;

      $('.photoAlbum').each(function () {
        if(i == parseInt($("#conteneurPhotoAlbum").val())){
          $(this).show();
        }

        i++;
      })
    }
});
