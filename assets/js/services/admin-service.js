const supabase =
    window.supabaseClient;


export async function checkAdmin(){

    const { data:{ user } } =
    await supabase.auth.getUser();


    if(!user){
        return false;
    }


    const { data,error } =
    await supabase
        .from("profiles")
        .select("role")
        .eq("id",user.id)
        .single();


    if(error){
        console.error(
            "Check admin error:",
            error
        );

        return false;
    }


    return (
        data.role === "admin" ||
        data.role === "super_admin"
    );
}



export async function getDashboardStats(){

    const [
        users,
        properties,
        memberships,
        payments
    ] = await Promise.all([

        supabase
        .from("profiles")
        .select("id",{count:"exact"}),

        supabase
        .from("properties")
        .select("id",{count:"exact"}),

        supabase
        .from("memberships")
        .select("id",{count:"exact"})
        .eq("status","active"),

        supabase
        .from("payments")
        .select("id",{count:"exact"})
        .eq("status","pending")

    ]);


    return {

        totalUsers:
        users.count || 0,

        totalProperties:
        properties.count || 0,

        activeMembership:
        memberships.count || 0,

        pendingPayments:
        payments.count || 0

    };
}



export async function getAllUsers(){

    const { data,error } =
    await supabase
        .from("profiles")
        .select("*")
        .order(
            "created_at",
            {
                ascending:false
            }
        );


    if(error){

        console.error(
            "Get users error:",
            error
        );

        throw error;
    }


    return data;
}



export async function updateUserRole(
    userId,
    role
){

    const { data,error } =
    await supabase
        .from("profiles")
        .update({
            role
        })
        .eq("id",userId)
        .select()
        .single();


    if(error){

        console.error(
            "Update role error:",
            error
        );

        throw error;
    }


    return data;
}



export async function getPendingProperties(){

    const { data,error } =
    await supabase
        .from("properties")
        .select(`
            *,
            profiles:user_id(
                name,
                phone
            )
        `)
        .eq(
            "status",
            "pending"
        )
        .order(
            "created_at",
            {
                ascending:false
            }
        );


    if(error){

        console.error(
            "Pending property error:",
            error
        );

        throw error;
    }


    return data;
}



export async function approveProperty(id){

    const { data,error } =
    await supabase
        .from("properties")
        .update({
            status:"active"
        })
        .eq("id",id)
        .select()
        .single();


    if(error){

        console.error(
            "Approve property error:",
            error
        );

        throw error;
    }


    return data;
}



export async function rejectProperty(
    id,
    reason
){

    const { data,error } =
    await supabase
        .from("properties")
        .update({
            status:"rejected",
            reject_reason:reason
        })
        .eq("id",id)
        .select()
        .single();


    if(error){

        console.error(
            "Reject property error:",
            error
        );

        throw error;
    }


    return data;
}



export async function getPendingPayments(){

    const { data,error } =
    await supabase
        .from("payments")
        .select(`
            *,
            profiles:user_id(
                name,
                email
            )
        `)
        .eq(
            "status",
            "waiting_confirmation"
        )
        .order(
            "created_at",
            {
                ascending:false
            }
        );


    if(error){

        console.error(
            "Payment queue error:",
            error
        );

        throw error;
    }


    return data;
}



export async function approvePayment(
    paymentId
){

    const { data,error } =
    await supabase
        .from("payments")
        .update({

            status:"paid",

            paid_at:
            new Date()

        })
        .eq("id",paymentId)
        .select()
        .single();


    if(error){

        console.error(
            "Approve payment error:",
            error
        );

        throw error;
    }


    return data;
}



export async function deleteUser(
    userId
){

    const { error } =
    await supabase
        .from("profiles")
        .delete()
        .eq("id",userId);


    if(error){

        console.error(
            "Delete user error:",
            error
        );

        throw error;
    }


    return true;
                }
