import Google from "next-auth/providers/google";
import Github from "next-auth/providers/github";

import {type AuthOptions} from 'next-auth';

export const authOptions:AuthOptions={
    
    providers:[
        Google({
        clientId:process.env.GOOGLE_CLIENT_ID as string,
        clientSecret:process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    Github({
        clientId:process.env.GITHUB_ID as string,
        clientSecret:process.env.GITHUB_SECRET as string,
    })
   
    
],
    session:{
        strategy:'jwt',
        maxAge:1*24*60*60,
    },
    jwt:{

    },
    callbacks:{ 
        

    },
    secret:process.env.NEXTAUTH_SECRET as string,
    



}