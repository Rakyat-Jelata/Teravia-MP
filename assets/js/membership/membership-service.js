/* =====================================================
   TERAVIA - Membership Service
   File: assets/js/membership/membership-service.js
===================================================== */

const MembershipService={

async get(){

try{

const user=await AuthGuard.user();

if(!user)
throw new Error("Silakan login terlebih dahulu.");


const {data,error}=await supabaseClient
.from("profiles")
.select(`
membership_type,
membership_status,
membership_start,
membership_expired,
listing_limit,
listing_used,
boost_limit,
boost_used,
verified_badge
`)
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


async active(){

try{

const result=await this.get();

if(!result.success)return false;


return result.data.membership_status==="active";


}catch(err){

return false;

}

}

};


window.MembershipService=MembershipService;
