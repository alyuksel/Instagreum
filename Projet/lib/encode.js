function _arrayBufferToBase64( buffer ) {
  var binary = '';
  var bytes = new Uint8Array( buffer );
  var len = bytes.byteLength;
  for (var i = 0; i < len; i++) {
    binary += String.fromCharCode( bytes[ i ] );
  }
  return window.btoa( binary );
}

function deleteFromArrayById(array,id){
  angular.forEach(array, function(item) {
    if(item.id == id){
      var index = array.indexOf(item);
      array.splice(index, 1);
    }
});
return array;
}
