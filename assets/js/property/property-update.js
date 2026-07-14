/* =====================================================
   TERAVIA - Update Property
   File: assets/js/property/property-update.js
===================================================== */

const PropertyUpdate={

async save(id,property){

try{

if(!id)throw new Error("ID properti tidak valid.");

const user=await AuthGuard.user();

if(!user)throw new Error("Silakan login terlebih dahulu.");

delete property.id;
delete property.user_id;
delete property.created_at;

property.updated_at=new Date().toISOString();

const {data,error}=await supabaseClient
.from("properties")
.update(property)
.eq("id",id)
.eq("user_id",user.id)
.select()
.single();

if(error)throw error;

return{
success:true,
data,
message:"Listing berhasil diperbarui."
};

}catch(err){

return{
success:false,
message:err.message
};

}

}

};

window.PropertyUpdate=PropertyUpdate;
