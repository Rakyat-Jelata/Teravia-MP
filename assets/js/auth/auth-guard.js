/* =====================================================
   TERAVIA - Auth Guard
   File: assets/js/auth/auth-guard.js
===================================================== */

const AuthGuard={

async user(){

const {data:{user},error}=await supabaseClient.auth.getUser();

if(error)return null;

return user;

},

async session(){

const {data:{session},error}=await supabaseClient.auth.getSession();

if(error)return null;

return session;

},

async check(){

const session=await this.session();

if(!session){
window.location.replace("login.html");
return false;
}

return true;

},

async profile(){

const user=await this.user();

if(!user)return null;

const {data,error}=await supabaseClient
.from("profiles")
.select("*")
.eq("id",user.id)
.single();

if(error)return null;

return data;

},

async admin(){

const profile=await this.profile();

if(!profile)return false;

return profile.is_verified_admin===true;

},

async logout(){

await supabaseClient.auth.signOut();

window.location.replace("login.html");

}

};

window.AuthGuard=AuthGuard;
