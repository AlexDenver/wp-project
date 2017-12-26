filter = {
  query: null,
  veg: true,
  starter: true,
  main: true,
  dessert: true,
  spicy: 7,
  typeFlag: false,
  spicyFlag: false
};
var dishes;
$(function() {
  $.get("http://127.0.0.1:3000/data/dishes", {} , function(data){
    console.log('data');
    dishes = JSON.parse(data);
    updateDishes(dishes);
  });

  $('input').on('input change',function(e){
    //console.log(e);
    ele = e.target;
    if(e.type=="change"){
      if(ele.name!="spicy"){
        filter[ele.name] = !filter[ele.name];
          //console.log(ele.checked);
          filter['typeFlag'] = true;
      }else if(!ele.checked){
        filter['spicyFlag'] = true;
        filter['spicy'] -= parseInt(ele.value);
      }else{
        filter['spicyFlag'] = true;
        filter['spicy'] += parseInt(ele.value);
      }
      if(filter['spicy']==0);

    }else if(e.type="type"){
      filter['query'] = ele.value;
      console.log('Typing' + filter.query);
    }
    //console.log(filter);
    updateDishes();
  })
});

function updateDishes(){
  f = filter;
  x = Array();

  //Filter Veg/Non-Veg Dishes
  dishes.forEach(function(d) {
    if(filter['veg']){
      if(d['veg'])
        x.push(d);
    }else{
      x.push(d);
    }
  });


  if(f['typeFlag']){
    //Dish Type Filter
    if(x.length==0)
    y=dishes;
    else{
      y=x;
      x=[];
    }
    y.forEach(function(d) {
      console.log(d.type);
      console.log(f);
      match = false;
      if((d['type'].toLowerCase()=='starter' && f['starter']) || (d['type'].toLowerCase()=='main' && f['main']) || (d['type'].toLowerCase()=='dessert' && f['dessert']))
        match = true;
      if(match)
        x.push(d);
    })
    f['typeFlag']=false;
  }

  if(f['spicyFlag']){
    //Spice Level Filter
    if(x.length==0)
    y=dishes;
    else{
      y=x;
      x=[];
    }
    y.forEach(function(d) {
      match = false;
      if((d['spicy']==1 && f['spicy']>=1) || (d['spicy']==2 && f['spicy']>=2) || (d['spicy']==4 && f['spicy']>=4))
      match = true;
      if(match)
      x.push(d);
    })
    f['spicyFlag']=false;
  }

  //Search Function
  if(f['query']!=null){
    y=x;
    x=[];
    // ar = [];
    // if(x.length==0)
    //   y=dishes;
    // else{
    //   y=x;
    //   x=[];
    // }
    y.forEach(function(d){
      r = JSON.stringify(d).toLowerCase().match(f['query'].toLowerCase());
      if(r!=null){
        x.push(d);
      }
    });
  }


	putDishes(x);
}

function advFilters(ele){

}

function putDishes(data){
  console.log(data);
  cont = $(".dishes");
  cont.html('');
  for(i=0;i<data.length;i++){
    var cardHtml = `<div class="mb-4 col-12 col-sm-6 col-md-4">
      <div class="dish card">
        <img class="card-img-top g-scale" src="./img/dishes/${data[i].img}"  alt="Chilly">
        <div class="card-body">
          <span class="font-weight-bold">${data[i].name}</span>
          <span class="badge badge-dark float-right ml-2"><i class="fas fa-star"></i> ${data[i].rating}/5</span>
          <img src="./img/${data[i].veg?'':'n'}veg.png" height="20px" class="g-scale float-right" />
          <p>${data[i].description}.</p>
          <div class="row text-center">
            <div class="col-4">
              <span class="badge badge-dark p-1">₹${data[i].price}</span>
            </div>
            <div class="col-4 spice">
            <i class="fas ${data[i].spicy>=1?'fa-fire':''}"></i><i class="fas ${data[i].spicy>=2?'fa-fire':''}"></i><i class="fas ${data[i].spicy>=4?'fa-fire':''}"></i>
            </div>
            <div class="col-4">
            <i class="fas fa-user"></i> ${data[i].servings}
            </div>
          </div>
        </div>
      </div>
    </div>`;
    cont.append(cardHtml);
  }
}
