/* =====================================================
   TERAVIA - Property Favorite
   File: assets/js/property/property-favorite.js
===================================================== */

const PropertyFavorite={

async add(propertyId){

try{

const user=await AuthGuard.user();

if(!user)throw new Error("Silakan login terlebih dahulu.");

const {data,error}=await supabaseClient
.from("favorites")
.insert({
user_id:user.id,
property_id:propertyId
})
.select()
.single();

if(error)throw error;

return{
success:true,
data,
message:"Properti ditambahkan ke favorit."
};

}catch(err){

return{
success:false,
message:err.message
};

}

},


async remove(propertyId){

try{

const user=await AuthGuard.user();

if(!user)throw new Error("Silakan login terlebih dahulu.");

const {error}=await supabaseClient
.from("favorites")
.delete()
.eq("user_id",user.id)
.eq("property_id",propertyId);

if(error)throw error;

return{
success:true,
message:"Properti dihapus dari favorit."
};

}catch(err){

return{
success:false,
message:err.message
};

}

},


async check(propertyId){

try{

const user=await AuthGuard.user();

if(!user)return false;


const {data,error}=await supabaseClient
.from("favorites")
.select("id")
.eq("user_id",user.id)
.eq("property_id",propertyId)
.maybeSingle();


if(error)throw error;


return !!data;


}catch(err){

return false;

}

},


async mine(){

try{

const user=await AuthGuard.user();

if(!user)throw new Error("Silakan login terlebih dahulu.");


const {data,error}=await supabaseClient
.from("favorites")
.select(`
*,
properties(
*
)
`)
.eq("user_id",user.id)
.order("created_at",{ascending:false});


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

}

};


window.PropertyFavorite=PropertyFavorite;
