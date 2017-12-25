filter = {
  query: null,
  veg: true,
  starter: true,
  main: true,
  dessert: true,
  spicy: 7
};
var dishes;
$(function() {
  $.get("http://127.0.0.1:3000/data/dishes", {} , function(data){
    console.log('data');
    dishes = JSON.parse(data);
  });

  $('input').on('input change',function(e){
    console.log(e);
    ele = e.target;
    if(e.type=="change"){
      if(ele.name!="spicy"){
        filter[ele.name] = !filter[ele.name];
          console.log(ele.checked);
      }else if(!ele.checked)
        filter['spicy'] -= parseInt(ele.value);
      else
        filter['spicy'] += parseInt(ele.value);
    }else if(e.type="type"){
      filter['query'] = ele.value;
      console.log('Typing' + filter.query);
    }
    console.log(filter);
    updateDishes();
  })
});

function updateDishes(){
  console.log("Update Called");

}
function putDishes(data){
  for(i=0;i<data.length;i++){
    
  }
}
