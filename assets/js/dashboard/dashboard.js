/* =====================================================
   TERAVIA - User Dashboard
   File: assets/js/dashboard/dashboard.js
===================================================== */

const Dashboard={

async load(){

try{

const user=await AuthGuard.user();

if(!user)
throw new Error("User belum login.");


const profile=await MembershipService.get();


const listings=await PropertyList.mine(5,1);


const favorites=await PropertyFavorite.mine();


const membership=await MembershipCheck.remaining();


return{

success:true,

data:{

user,

profile:profile.data,

listings:listings.data||[],

favorites:favorites.data||[],

remaining:membership

}

};


}catch(err){

return{

success:false,

message:err.message

};

}

},


async summary(){

try{

const data=await this.load();


if(!data.success)
throw new Error(data.message);


return{

listing:data.data.listings.length,

favorite:data.data.favorites.length,

listingRemaining:data.data.remaining.listing,

boostRemaining:data.data.remaining.boost

};


}catch(err){

return{

listing:0,

favorite:0,

listingRemaining:0,

boostRemaining:0

};

}

}

};


window.Dashboard=Dashboard;
