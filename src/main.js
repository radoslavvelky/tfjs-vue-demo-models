
import * as TfJsUtils from "./utils/tfjsUtils.js"
import {GenericView} from "./vuecomponent.js"
import * as tfjsUtils from "@/utils/tfjsUtils.js";


async function run() {
    let contentView = new GenericView();

    //this should be filled by GME when docked inside
    //now need to configure session and login
    contentView.tfjs = TfJsUtils.tf;
    await tfjsUtils.tfAuthenticate();
    let session = await tfjsUtils.getSession("cortex");
    contentView.configureGmSession(session);
    
    //test call
    contentView.setContent(null);
}

run();
