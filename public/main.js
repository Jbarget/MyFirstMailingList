
// function sortingShitOut(){
  function requestingOutputFromDatabase(){
    var res = new XMLHttpRequest();
    res.open('GET', '/');
    res.send();
    return res.responseText;

    // out.onreadystatechange = function(){
      // if(out.readyState === 4 && out.status  === 200){

        // document.getElementById('favTing').innerHTML = out.
      // }
    };

  }
  //
  // function gettingInputFromDatabase(){
  //   var out = new XMLHttpRequest();
  //   out.onreadystatechange(function(){
  //     if (out.readyState === 4 && out.status === 200){
  //       console.log(out.responseText);
  //       document.getElementsByClassName('favourite-things').innerHTML = out.responseText;
  //     }
  //   });
  //   out.open('GET', '/');
  //   out.send();
  // }
// }
