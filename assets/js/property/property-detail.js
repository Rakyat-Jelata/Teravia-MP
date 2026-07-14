/* =====================================================
   TERAVIA - Property Detail
   File: assets/js/property/property-detail.js
===================================================== */

const PropertyDetail={

async get(id){

try{

if(!id)throw new Error("ID properti tidak valid.");

const {data,error}=await supabaseClient
.from("properties")
.select(`
*,
property_images(*),
profiles(
id,
full_name,
phone_whatsapp,
verified_badge,
is_verified_admin
)
`)
.eq("id",id)
.single();

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

async incrementView(id){

try{

const {data,error}=await supabaseClient.rpc(
"increment_property_views",
{
property_id:id
}
);

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

window.PropertyDetail=PropertyDetail;
