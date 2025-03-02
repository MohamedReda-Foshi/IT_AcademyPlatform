import Google from "next-auth/providers/google";
import {type AuthOptions} from 'next-auth';


export const authOptions:AuthOptions={
    
    providers:[
        Google({
        clientId:process.env.GOOGLE_CLIENT_ID as string,
        clientSecret:process.env.GOOGLE_CLIENT_SECRET as string,
    })
    
],
    session:{
        strategy:'jwt',
        maxAge:1*24*60*60,
    },
    jwt:{

    },callbacks:{ 

    }



}