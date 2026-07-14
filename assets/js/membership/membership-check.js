/* =====================================================
   TERAVIA - Membership Check
   File: assets/js/membership/membership-check.js
===================================================== */

const MembershipCheck={

async data(){

const result=await MembershipService.get();

if(!result.success)
throw new Error(result.message);

return result.data;

},


async active(){

try{

const data=await this.data();

if(data.membership_status!=="active")
return false;


if(data.membership_expired){

const expired=new Date(data.membership_expired);
const now=new Date();


if(now>expired)
return false;

}


return true;


}catch(err){

return false;

}

},


async canPost(){

try{

const active=await this.active();

if(!active)
return false;


const data=await this.data();


return data.listing_used < data.listing_limit;


}catch(err){

return false;

}

},


async canBoost(){

try{

const active=await this.active();

if(!active)
return false;


const data=await this.data();


return data.boost_used < data.boost_limit;


}catch(err){

return false;

}

},


async remaining(){

try{

const data=await this.data();


return{

listing:
Math.max(
0,
data.listing_limit-data.listing_used
),

boost:
Math.max(
0,
data.boost_limit-data.boost_used
)

};


}catch(err){

return{
listing:0,
boost:0
};

}

}

};


window.MembershipCheck=MembershipCheck;
