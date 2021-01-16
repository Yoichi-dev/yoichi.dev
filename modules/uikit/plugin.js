import UIkit from "uikit";
import Icons from "uikit/dist/js/uikit-icons";

// Carica le icone
UIkit.use(Icons);
// Inietta l'oggetto $uikit nel context Vue
export default (ctx, inject) => {
    ctx.$UIkit = UIkit;
    inject("UIkit", UIkit);
};
