/* =====================================================
   TERAVIA - Image Manager
   File: assets/js/upload/image-manager.js
===================================================== */

const ImageManager={

async list(propertyId){

try{

if(!propertyId)
throw new Error("ID properti tidak valid.");

const {data,error}=await supabaseClient
.from("property_images")
.select("*")
.eq("property_id",propertyId)
.order("sort_order",{ascending:true});


if(error)throw error;


return{
success:true,
data
};


}catch(err){

return{
success:false,
message:err.message
};

}

},


async setPrimary(imageId,propertyId){

try{

const user=await AuthGuard.user();

if(!user)
throw new Error("Silakan login terlebih dahulu.");


const {data:image,error:imageError}=await supabaseClient
.from("property_images")
.select(`
id,
properties(
user_id
)
`)
.eq("id",imageId)
.eq("property_id",propertyId)
.single();


if(imageError)throw imageError;


if(image.properties.user_id!==user.id)
throw new Error("Tidak memiliki akses.");


await supabaseClient
.from("property_images")
.update({
is_primary:false
})
.eq("property_id",propertyId);


const {error}=await supabaseClient
.from("property_images")
.update({
is_primary:true
})
.eq("id",imageId);


if(error)throw error;


return{
success:true,
message:"Gambar utama berhasil diubah."
};


}catch(err){

return{
success:false,
message:err.message
};

}

},


async reorder(images){

try{

const updates=images.map(item=>({

id:item.id,
sort_order:item.sort_order

}));


for(const item of updates){

const {error}=await supabaseClient
.from("property_images")
.update({
sort_order:item.sort_order
})
.eq("id",item.id);


if(error)throw error;

}


return{
success:true,
message:"Urutan gambar diperbarui."
};


}catch(err){

return{
success:false,
message:err.message
};

}

}

};


window.ImageManager=ImageManager;
