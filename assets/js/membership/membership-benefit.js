/* =====================================================
   TERAVIA - Membership Benefit
   File: assets/js/membership/membership-benefit.js
===================================================== */

const MembershipBenefit={

plans:{

free:{

name:"Free",

price:0,

listing_limit:0,

boost_limit:0,

auto_boost:false,

verified_badge:false

},


premium:{

name:"Premium",

price:150000,

listing_limit:10,

boost_limit:10,

auto_boost:true,

auto_boost_daily:1,

verified_badge:false

},


pro_agent:{

name:"Pro Agent",

price:500000,

listing_limit:50,

boost_limit:50,

auto_boost:true,

auto_boost_daily:3,

verified_badge:true

},


business:{

name:"Business",

price:1000000,

listing_limit:100,

boost_limit:100,

auto_boost:true,

auto_boost_daily:5,

verified_badge:true

}

},


get(type){

return this.plans[type]||this.plans.free;

},


compare(type){

const plan=this.get(type);

return{

listing:plan.listing_limit,

boost:plan.boost_limit,

autoBoost:plan.auto_boost,

badge:plan.verified_badge

};

}

};


window.MembershipBenefit=MembershipBenefit;
