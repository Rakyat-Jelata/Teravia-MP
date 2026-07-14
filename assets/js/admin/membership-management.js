/* =====================================================
   TERAVIA - Membership Manager Admin
   File: assets/js/admin/membership-manager.js
===================================================== */

const MembershipManager={

async list(limit=50){

try{

const admin=await AuthGuard.admin();

if(!admin)
throw new Error("Akses admin diperlukan.");


const {data,error}=await supabaseClient
.from("profiles")
.select(`
id,
full_name,
membership_type,
membership_status,
membership_start,
membership_expired,
listing_limit,
listing_used,
boost_limit,
boost_used
`)
.order("updated_at",{ascending:false})
.limit(limit);


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


async activate(userId,planType="premium",days=30){

try{

const admin=await AuthGuard.admin();

if(!admin)
throw new Error("Akses admin diperlukan.");


const benefit=MembershipBenefit.get(planType);


const start=new Date();

const expired=new Date();

expired.setDate(
expired.getDate()+days
);


const {data,error}=await supabaseClient
.from("profiles")
.update({

membership_type:planType,

membership_status:"active",

membership_start:start.toISOString(),

membership_expired:expired.toISOString(),

listing_limit:benefit.listing_limit,

listing_used:0,

boost_limit:benefit.boost_limit,

boost_used:0,

updated_at:new Date().toISOString()

})
.eq("id",userId)
.select()
.single();


if(error)throw error;


return{

success:true,

data,

message:"Membership berhasil diaktifkan."

};


}catch(err){

return{

success:false,

message:err.message

};

}

},


async extend(userId,days=30){

try{

const admin=await AuthGuard.admin();

if(!admin)
throw new Error("Akses admin diperlukan.");


const {data:user,error:getError}=await supabaseClient
.from("profiles")
.select("membership_expired")
.eq("id",userId)
.single();


if(getError)throw getError;


const current=
user.membership_expired
?
new Date(user.membership_expired)
:
new Date();


current.setDate(
current.getDate()+days
);


const {error}=await supabaseClient
.from("profiles")
.update({

membership_expired:current.toISOString(),

updated_at:new Date().toISOString()

})
.eq("id",userId);


if(error)throw error;


return{

success:true,

message:"Masa membership diperpanjang."

};


}catch(err){

return{

success:false,

message:err.message

};

}

}

};


window.MembershipManager=MembershipManager;
