/* =====================================================
   TERAVIA - Home Page Controller
   File: assets/js/pages/home.js
===================================================== */

const HomePage={

async load(){

try{

const latest=await PropertyList.all(12,1);


if(!latest.success)
throw new Error(latest.message);


return{

success:true,

data:{

latest:latest.data||[]

}

};


}catch(err){

return{

success:false,

message:err.message

};

}

},


async category(category){

try{

const result=await PropertyList.byCategory(
category,
12,
1
);


return result;


}catch(err){

return{

success:false,

message:err.message

};

}

},


async search(filters){

return await PropertySearch.find(
filters,
12,
1
);

}


};


window.HomePage=HomePage;
