const supabase = window.supabaseClient;

const TABLE = "payments";


export async function createPayment(amount,type="membership"){

    const { data:{ user } } = await supabase.auth.getUser();

    if(!user){
        throw new Error("User belum login");
    }


    const invoice =
    `TRV-${Date.now()}-${user.id.slice(0,6)}`;


    const payload = {
        user_id:user.id,
        invoice_number:invoice,
        type,
        amount,
        status:"pending",
        payment_method:null,
        paid_at:null
    };


    const { data,error } = await supabase
        .from(TABLE)
        .insert(payload)
        .select()
        .single();


    if(error){
        console.error("Create payment error:",error);
        throw error;
    }


    return data;
}



export async function getMyPayments(){

    const { data:{ user } } = await supabase.auth.getUser();


    if(!user){
        throw new Error("User belum login");
    }


    const { data,error } = await supabase
        .from(TABLE)
        .select("*")
        .eq("user_id",user.id)
        .order("created_at",{ascending:false});


    if(error){
        console.error("Payment history error:",error);
        throw error;
    }


    return data;
}



export async function getPaymentById(id){

    const { data,error } = await supabase
        .from(TABLE)
        .select("*")
        .eq("id",id)
        .single();


    if(error){
        console.error("Get payment error:",error);
        throw error;
    }


    return data;
}



export async function updatePaymentStatus(
    id,
    status,
    paymentMethod=null
){


    const updateData={
        status
    };


    if(paymentMethod){
        updateData.payment_method = paymentMethod;
    }


    if(status==="paid"){
        updateData.paid_at = new Date();
    }


    const { data,error } = await supabase
        .from(TABLE)
        .update(updateData)
        .eq("id",id)
        .select()
        .single();


    if(error){
        console.error("Update payment error:",error);
        throw error;
    }


    return data;
}



export async function cancelPayment(id){

    const { data,error } = await supabase
        .from(TABLE)
        .update({
            status:"cancelled"
        })
        .eq("id",id)
        .select()
        .single();


    if(error){
        console.error("Cancel payment error:",error);
        throw error;
    }


    return data;
}



export async function confirmManualPayment(
    paymentId,
    proofUrl
){

    const { data,error } = await supabase
        .from(TABLE)
        .update({
            status:"waiting_confirmation",
            payment_proof:proofUrl
        })
        .eq("id",paymentId)
        .select()
        .single();


    if(error){
        console.error(
            "Confirm payment error:",
            error
        );

        throw error;
    }


    return data;
}



export const membershipProduct = {

    name:"TERAVIA Premium",

    price:500000,

    currency:"IDR",

    description:
    "Upgrade akun kamu supaya bisa posting listingan kamu di TERAVIA.",

    benefits:[
    "Membership Premium Lifetime",
    "Bisa memposting listing properti",
    "Listing diverifikasi admin",
    "Akses seluruh fitur member TERAVIA"
    ]
};
