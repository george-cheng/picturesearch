function zoom(img) {
  let zoom = 100 / img.width;
  return {
    width: img.width * zoom,
    height: img.height * zoom
  }
}
function imgQueryUrl(word,page,row){
  let url = "https://image.baidu.com/search/acjson?tn=resultjson_com&ipn=r";
  return url + "&word=" + word + "&pn=" + (page * row - row) + "&rn=" + row;
}
export{zoom,imgQueryUrl}