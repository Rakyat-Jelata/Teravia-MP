/* =====================================================
   TERAVIA - User Profile
   File: assets/js/dashboard/profile.js
===================================================== */

const UserProfile={

async get(){

try{

const user=await AuthGuard.user();

if(!user)
throw new Error("Silakan login terlebih dahulu.");


const {data,error}=await supabaseClient
.from("profiles")
.select("*")
.eq("id",user.id)
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


async update(payload){

try{

const user=await AuthGuard.user();

if(!user)
throw new Error("Silakan login terlebih dahulu.");


delete payload.id;
delete payload.membership_type;
delete payload.membership_status;
delete payload.listing_limit;
delete payload.listing_used;
delete payload.boost_limit;
delete payload.boost_used;


const {data,error}=await supabaseClient
.from("profiles")
.update({

...payload,

updated_at:new Date().toISOString()

})
.eq("id",user.id)
.select()
.single();


if(error)throw error;


return{
success:true,
data,
message:"Profil berhasil diperbarui."
};


}catch(err){

return{
success:false,
message:err.message
};

}

},


async avatar(file){

return await AvatarUpload.upload(file);

},


async membership(){

return await MembershipService.get();

}

};


window.UserProfile=UserProfile;
