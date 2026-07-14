/* =====================================================
   TERAVIA - Detail Property Page
   File: assets/js/pages/detail-property.js
===================================================== */

const DetailPropertyPage={

async load(id){

try{

if(!id)
throw new Error("ID properti tidak ditemukan.");


const property=await PropertyDetail.get(id);


if(!property.success)
throw new Error(property.message);


const favorite=await PropertyFavorite.check(id);


return{

success:true,

data:{

property:property.data,

isFavorite:favorite

}

};


}catch(err){

return{

success:false,

message:err.message

};

}

},


async favorite(id){

const exists=await PropertyFavorite.check(id);


if(exists){

return await PropertyFavorite.remove(id);

}


return await PropertyFavorite.add(id);

},


async contact(property){

try{

if(!property)
throw new Error("Data properti tidak tersedia.");


return{

success:true,

phone:property.profiles?.phone_whatsapp,

owner:property.profiles?.full_name

};


}catch(err){

return{

success:false,

message:err.message

};

}

},


async view(id){

return await PropertyDetail.incrementView(id);

}

};


window.DetailPropertyPage=DetailPropertyPage;
