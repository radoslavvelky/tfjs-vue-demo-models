import * as tfjs from "@/utils/tf.js";

export let sessionId = "";

export let tf = new tfjs.TribefireJs({ 
    
    /*
    protocol: "https",
    host: "/stable-tribefire20demo-cortex.tribefire.cloud",
    tribefireServicesUrl: "services",
    port: "",
    */
    
    protocol: "http",
    host: "localhost",
    tribefireServicesUrl: "tribefire-services",
    port: "8080",
 
     sessionIdProvider: function(){
        return sessionId;
    }
});

export async function tfAuthenticate(username = "cortex", password = "cortex") {
    return tf.authenticate(username,password).then(session => {
        sessionId = session.userSession.sessionId;  
    }); 
}

export async function getSession(accessId) {
    return tf.session(accessId);
}

