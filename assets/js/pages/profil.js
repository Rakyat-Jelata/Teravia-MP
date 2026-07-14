/* =====================================================
   TERAVIA - Public Profile Page
   File: assets/js/pages/profil.js
===================================================== */

const ProfilePage={

async load(userId){

try{

if(!userId)
throw new Error("User ID tidak ditemukan.");


const {data:profile,error}=await supabaseClient
.from("profiles")
.select(`
id,
full_name,
phone_whatsapp,
avatar_url,
persona_type,
verified_badge,
is_verified_admin
`)
.eq("id",userId)
.single();


if(error)throw error;


const listings=await supabaseClient
.from("properties")
.select("*")
.eq("user_id",userId)
.eq("status","approved")
.order("created_at",{ascending:false});


return{

success:true,

data:{

profile,

properties:listings.data||[]

}

};


}catch(err){

return{

success:false,

message:err.message

};

}

},


async properties(userId){

try{

const {data,error}=await supabaseClient
.from("properties")
.select("*")
.eq("user_id",userId)
.eq("status","approved")
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


window.ProfilePage=ProfilePage;
