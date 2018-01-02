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

function serverDataToImg(item){
  return {user:item.username,id:item.id, mimetype:item.img.contentType,data:_arrayBufferToBase64(item.img.data.data),
           date:item.publicationDate,like:item.like,commentaire:item.commentaire};
}
