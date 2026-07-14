/* =====================================================
   TERAVIA - Create Property
   File: assets/js/property/property-create.js
===================================================== */

const PropertyCreate={

async save(property){

try{

const user=await AuthGuard.user();

if(!user)throw new Error("Silakan login terlebih dahulu.");

property.user_id=user.id;
property.created_at=new Date().toISOString();
property.updated_at=new Date().toISOString();

const {data,error}=await supabaseClient
.from("properties")
.insert(property)
.select()
.single();

if(error)throw error;

return{
success:true,
data,
message:"Listing berhasil dibuat."
};

}catch(err){

return{
success:false,
message:err.message
};

}

}

};

window.PropertyCreate=PropertyCreate;
