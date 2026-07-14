/* =====================================================
   TERAVIA - User Service
   File: assets/js/services/user-service.js
===================================================== */

const TERAVIA_USER_SERVICE = {

    async getCurrentUser(){
        const user = await TERAVIA_AUTH.getUser();
        if(!user) return null;
        return this.getUserById(user.id);
    },

    async getUserById(id){
        const {data,error}=await supabaseClient
        .from("users")
        .select("*")
        .eq("id",id)
        .single();

        if(error) throw error;
        return data;
    },

    async createProfile(userData){
        const {data,error}=await supabaseClient
        .from("users")
        .insert([userData])
        .select()
        .single();

        if(error) throw error;
        return data;
    },

    async updateProfile(id,userData){
        const {data,error}=await supabaseClient
        .from("users")
        .update(userData)
        .eq("id",id)
        .select()
        .single();

        if(error) throw error;
        return data;
    },

    async updateRole(id,role){
        const {data,error}=await supabaseClient
        .from("users")
        .update({
            role:role
        })
        .eq("id",id)
        .select()
        .single();

        if(error) throw error;
        return data;
    },

    async checkRole(role){
        const user=await this.getCurrentUser();

        if(!user) return false;

        return user.role===role;
    },

    async getAllUsers(){
        const {data,error}=await supabaseClient
        .from("users")
        .select("*")
        .order(
            "created_at",
            {
                ascending:false
            }
        );

        if(error) throw error;
        return data;
    },

    async deleteUser(id){
        const {error}=await supabaseClient
        .from("users")
        .delete()
        .eq("id",id);

        if(error) throw error;

        return true;
    }

};

window.TERAVIA_USER_SERVICE = TERAVIA_USER_SERVICE;
