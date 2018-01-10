!function(window, undefined) {

}(window);

const Observable = function() {
    const _self = this;
    _self.data;
    _self.subs = [];
    _self.methods = {
        publish: function (newData) {
            if (typeof newData !== 'undefined') {
                _self.data = newData;
                for (let i = 0, ilen = _self.subs.length; i < ilen; ++i) {
                    _self.subs[i](_self.data);
                }
            } else {
                return _self.data;
            }
        },
        subscribe: function (callback) {
            if (_self.subs.indexOf(callback) === -1) {
                _self.subs.push(callback);
            }
        }
    };
    return _self.methods;
};

const view = {
    dockAppsLabels: document.querySelectorAll("ul.dock figcaption"),
    dockApps: document.querySelectorAll("ul.dock li"),
};
const model = {
    dockApps: [],

};
const layoutController = {
    initial: function () {
        this.correctLabel(view.dockAppsLabels);
    },
    correctLabel: function (dockLabels) {
        for(let i = 0,ilen = dockLabels.length;i < ilen; ++i){
            let appWidth = view.dockApps[i].offsetWidth;
            let labelWidth = dockLabels[i].offsetWidth;
            if(appWidth - labelWidth > 0){ // positive
                dockLabels[i].style.left = ((appWidth - labelWidth)/2) + "px";
            }else{ // negative
                dockLabels[i].style.right = ((appWidth - labelWidth)/2) + "px";
            }
        }
    }
};
const subscribeController = {
    initial: function () {
        this.apps(view.dockApps);
    },
    apps: function (apps) {
        for(let i = 0, ilen = apps.length;i < ilen;++i){
            let appObservable = new Observable();
            appObservable.subscribe(function (data) {
                switch (data){
                    case "mouse-over":
                        let optionsShowing= false;
                        for(let index = 0, ilen = apps.length;index < ilen;++index){
                            if(apps[index].classList.contains("options")){
                                optionsShowing = true;
                                break;
                            }
                        }
                        if(!optionsShowing && !apps[i].classList.contains("hover")){
                            apps[i].classList.add("hover");
                        }
                        break;
                    case "mouse-out":
                        if(apps[i].classList.contains("hover")){
                            apps[i].classList.remove("hover");
                        }
                        break;
                    case "click":
                        if(!apps[i].classList.contains("options")){
                            for(let index = 0, ilen = apps.length;index < ilen;++index){
                                if(apps[index].classList.contains("options")){
                                    apps[index].classList.remove("options");
                                    break;
                                }
                            }
                        }
                        if(!apps[i].classList.contains("click")){
                            apps[i].classList.add("click");
                        }
                        break;
                    case "release":
                        if(apps[i].classList.contains("click")){
                            apps[i].classList.remove("click");
                        }
                        break;
                    case "active":
                        const startupTimer = setTimeout(function () {
                            if(apps[i].classList.contains("activate")){
                                apps[i].classList.remove("activate");
                            }
                            if(!apps[i].classList.contains("active")){
                                apps[i].classList.add("active");
                            }
                            clearTimeout(startupTimer);
                        },1000);
                        if(!apps[i].classList.contains("activate")){
                            apps[i].classList.add("activate");
                        }
                        break;
                    case "inactive":
                        if(apps[i].classList.contains("active")){
                            apps[i].classList.remove("active");
                        }
                        break;
                    case "options":
                        for(let index = 0, ilen = apps.length;index < ilen;++index){
                            if(apps[index].classList.contains("options")){
                                apps[index].classList.remove("options");
                            }
                        }
                        if(!apps[i].classList.contains("options")){
                            apps[i].classList.add("options");
                            if(apps[i].classList.contains("hover")){
                                apps[i].classList.remove("hover");
                            }
                        }
                        break;
                    case "hide-options":
                        if(apps[i].classList.contains("options")){
                            apps[i].classList.remove("options");
                        }
                        break;
                        // drag stuff (implement when there is time)
                    // case "drag-start":
                    //     break;
                    // case "drag-release":
                    //     break;
                    default:
                        console.log("SwitchError in subscribeController.apps");
                        break;
                }
                model.dockApps.push(appObservable);
            });
            appObservable.publish("inactive");
        }
    },
};
const listenerController = {
    initial: function () {
        this.dockListeners(view.dockApps);
    },
    dockListeners: function (apps) {
        for(let i = 0, ilen = apps.length;i < ilen;++i){
            (function (i) {
                let index = i,holdTimer;
                apps[index].addEventListener("mouseover",function () {
                    model.dockApps[index].publish("mouse-over");
                });
                apps[index].addEventListener("mouseout",function () {
                    model.dockApps[index].publish("mouse-out");
                });

                apps[index].addEventListener("mousedown",function () {
                    holdTimer = setTimeout(function () {
                        model.dockApps[index].publish("options");
                    },500);
                    model.dockApps[index].publish("click");
                });
                apps[index].addEventListener("mouseup",function () {
                    clearTimeout(holdTimer);
                    model.dockApps[index].publish("release");
                    model.dockApps[index].publish("active");
                });
                apps[index].addEventListener("contextmenu",function (e) {
                    e.preventDefault();
                    model.dockApps[index].publish("options");
                });
            }(i));
        }
    }
};

// eerst aangeroepen functie
!function(){
    layoutController.initial();
    subscribeController.initial();
    listenerController.initial();

    // making Finder active
    model.dockApps[0].publish("active");
}();