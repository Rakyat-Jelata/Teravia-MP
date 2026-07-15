/* =====================================================
   TERAVIA - Authentication Service
   File: assets/js/services/auth-service.js
===================================================== */
import {
    supabaseClient
}
from "../supabase.js";

const TERAVIA_AUTH = {


    /**
     * Register User
     */

    async register(userData){


        const {
            email,
            password,
            name,
            phone,
            role
        } = userData;



        const {
            data,
            error
        } =
        await supabaseClient
        .auth
        .signUp({

            email,

            password,

            options:{
                
                data:{
                    name,
                    phone,
                    role
                }

            }

        });



        if(error){

            console.error(
                error
            );

            throw error;

        }



        return data;


    },



    /**
     * Login User
     */

    async login(
        email,
        password
    ){


        const {
            data,
            error
        } =
        await supabaseClient
        .auth
        .signInWithPassword({

            email,

            password

        });



        if(error){

            throw error;

        }



        window.TERAVIA_USER =
            data.user;



        return data;


    },



    /**
     * Logout
     */

    async logout(){


        const {
            error
        } =
        await supabaseClient
        .auth
        .signOut();



        if(error){

            throw error;

        }



        window.TERAVIA_USER =
            null;


    },



    /**
     * Get Current Session
     */

    async getSession(){


        const {
            data,
            error
        } =
        await supabaseClient
        .auth
        .getSession();



        if(error){

            throw error;

        }



        return data.session;


    },



    /**
     * Get Current User
     */

    async getUser(){


        const {
            data,
            error
        } =
        await supabaseClient
        .auth
        .getUser();



        if(error){

            throw error;

        }



        return data.user;


    },



    /**
     * Check Login Status
     */

    async isLoggedIn(){


        const session =
            await this.getSession();



        return !!session;


    },



    /**
     * Update User Metadata
     */

    async updateProfile(data){


        const {
            data:result,
            error
        } =
        await supabaseClient
        .auth
        .updateUser({

            data

        });



        if(error){

            throw error;

        }



        return result;


    },



    /**
     * Reset Password
     */

    async resetPassword(email){


        const {
            data,
            error
        } =
        await supabaseClient
        .auth
        .resetPasswordForEmail(

            email,

            {

                redirectTo:
                `${window.location.origin}/reset-password.html`

            }

        );



        if(error){

            throw error;

        }



        return data;


    },



    /**
     * Auth State Listener
     */

    onAuthChange(callback){


        return supabaseClient
        .auth
        .onAuthStateChange(

            (
                event,
                session
            )=>{


                window.TERAVIA_USER =
                    session?.user || null;



                callback(
                    event,
                    session
                );


            }

        );


    }


};





export {
    TERAVIA_AUTH
};


window.TERAVIA_AUTH =
    TERAVIA_AUTH;
