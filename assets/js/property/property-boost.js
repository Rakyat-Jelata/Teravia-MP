/* =====================================================
   TERAVIA - Property Boost
   File: assets/js/property/property-boost.js
===================================================== */

const PropertyBoost={

async boost(propertyId){

try{

const user=await AuthGuard.user();

if(!user)throw new Error("Silakan login terlebih dahulu.");


const {data:profile,error:profileError}=await supabaseClient
.from("profiles")
.select(`
boost_limit,
boost_used,
membership_status
`)
.eq("id",user.id)
.single();


if(profileError)throw profileError;


if(profile.membership_status!=="active")
throw new Error("Membership aktif diperlukan untuk melakukan boost.");


if(profile.boost_used>=profile.boost_limit)
throw new Error("Kuota boost sudah habis.");


const {data:property,error:propertyError}=await supabaseClient
.from("properties")
.select("id,user_id")
.eq("id",propertyId)
.single();


if(propertyError)throw propertyError;


if(property.user_id!==user.id)
throw new Error("Anda tidak memiliki akses ke listing ini.");


const now=new Date().toISOString();


const {error:updatePropertyError}=await supabaseClient
.from("properties")
.update({
boosted_at:now
})
.eq("id",propertyId);


if(updatePropertyError)throw updatePropertyError;


const {error:updateProfileError}=await supabaseClient
.from("profiles")
.update({
boost_used:profile.boost_used+1
})
.eq("id",user.id);


if(updateProfileError)throw updateProfileError;


return{
success:true,
message:"Listing berhasil disundul."
};


}catch(err){

return{
success:false,
message:err.message
};

}

}

};


window.PropertyBoost=PropertyBoost;
