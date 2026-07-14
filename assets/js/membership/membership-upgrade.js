/* =====================================================
   TERAVIA - Membership Upgrade
   File: assets/js/membership/membership-upgrade.js
===================================================== */

const MembershipUpgrade={

async request(planType){

try{

const user=await AuthGuard.user();

if(!user)
throw new Error("Silakan login terlebih dahulu.");


const plan=MembershipBenefit.get(planType);


if(!plan||planType==="free")
throw new Error("Paket membership tidak valid.");


const {data:order,error}=await supabaseClient
.from("membership_orders")
.insert({

user_id:user.id,

plan_type:planType,

amount:plan.price,

status:"pending"

})
.select()
.single();


if(error)throw error;


return{

success:true,

data:{
order,
plan
},

message:"Permintaan upgrade berhasil dibuat."

};


}catch(err){

return{

success:false,

message:err.message

};

}

}

};


window.MembershipUpgrade=MembershipUpgrade;

