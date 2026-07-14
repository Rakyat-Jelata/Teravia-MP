/* =====================================================
   TERAVIA - Post Property Page
   File: assets/js/pages/pasang-iklan.js
===================================================== */

const PasangIklan={

async submit(propertyData,files=[]){

try{

const user=await AuthGuard.user();

if(!user)
throw new Error("Silakan login terlebih dahulu.");


const allowed=await MembershipCheck.canPost();


if(!allowed)
throw new Error("Limit listing habis. Silakan upgrade membership.");


propertyData.status="pending";


const property=await PropertyCreate.save(propertyData);


if(!property.success)
throw new Error(property.message);


if(files.length){

const upload=await ImageUpload.property(
files,
property.data.id
);


if(!upload.success)
throw new Error(upload.message);

}


await supabaseClient
.from("profiles")
.update({

listing_used:
supabaseClient.raw("listing_used + 1")

})
.eq("id",user.id);


return{

success:true,

data:property.data,

message:"Listing berhasil dikirim dan menunggu approval admin."

};


}catch(err){

return{

success:false,

message:err.message

};

}

},


async check(){

return await MembershipCheck.canPost();

}

};


window.PasangIklan=PasangIklan;
