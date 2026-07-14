/* =====================================================
   TERAVIA - Delete Property
   File: assets/js/property/property-delete.js
===================================================== */

const PropertyDelete={

async remove(id){

try{

if(!id)throw new Error("ID properti tidak valid.");

const user=await AuthGuard.user();

if(!user)throw new Error("Silakan login terlebih dahulu.");

const {error}=await supabaseClient
.from("properties")
.delete()
.eq("id",id)
.eq("user_id",user.id);

if(error)throw error;

return{
success:true,
message:"Listing berhasil dihapus."
};

}catch(err){

return{
success:false,
message:err.message
};

}

}

};

window.PropertyDelete=PropertyDelete;
