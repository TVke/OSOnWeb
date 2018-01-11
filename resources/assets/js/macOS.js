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
        },
        unsubscribe: function (callback) {
            if (_self.subs.indexOf(callback) !== -1) {
                _self.subs.splice(_self.subs.indexOf(callback),1);
            }
        }
    };
    return _self.methods;
};

const view = {
    dockAppsLabels: document.querySelectorAll("ul.dock figcaption"),
    dockApps: document.querySelectorAll("ul.dock li"),
    contextMenuItems: document.querySelectorAll("ul.dock li div.menu p"),
};
const model = {
    dockApps: [],
    contextMenuItems: [],
    holdTimer: new Observable(),
    optionsOpened: new Observable(),
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
        this.dockMenu();
        this.apps(view.dockApps);
        this.contextMenus(view.contextMenuItems);
    },
    dockMenu: function () {
        model.optionsOpened.subscribe(function (dockAppIndex) {
            for(let i = 0, ilen = view.dockApps.length;i < ilen;++i){
                if (view.dockApps[i].classList.contains("options")) {
                    view.dockApps[i].classList.remove("options");
                }
            }
            if(dockAppIndex !== null){
                if(!view.dockApps[dockAppIndex].classList.contains("options")){
                    view.dockApps[dockAppIndex].classList.add("options");
                    if(view.dockApps[dockAppIndex].classList.contains("hover")){
                        view.dockApps[dockAppIndex].classList.remove("hover");
                    }
                }
            }
        });
        model.optionsOpened.publish(null);
    },
    apps: function (apps) {
        for(let i = 0, ilen = apps.length;i < ilen;++i){
            let appObservable = new Observable();
            appObservable.subscribe(function (data) {
                switch (data) {
                    case "mouse-over":
                        if (model.optionsOpened.publish() === null && !apps[i].classList.contains("hover")) {
                            apps[i].classList.add("hover");
                        }
                        break;
                    case "mouse-out":
                        if (apps[i].classList.contains("hover")) {
                            apps[i].classList.remove("hover");
                        }
                        break;
                    case "click":
                        model.holdTimer.publish(setTimeout(function () {
                            model.optionsOpened.publish(i);
                        },500));
                        model.optionsOpened.publish(null);
                        if (!apps[i].classList.contains("click")) {
                            apps[i].classList.add("click");
                        }
                        break;
                    case "release":
                        clearTimeout(model.holdTimer.publish());
                        if (apps[i].classList.contains("click")) {
                            apps[i].classList.remove("click");
                        }
                        if(model.optionsOpened.publish() === null){
                            model.dockApps[i].publish("active");
                        }
                        break;
                    case "active":
                        if (i !== 1){
                            if (!apps[i].classList.contains("active") && model.optionsOpened.publish() !== i) {
                                const startupTimer = setTimeout(function () {
                                    if (apps[i].classList.contains("activate")) {
                                        apps[i].classList.remove("activate");
                                    }
                                    if (!apps[i].classList.contains("active")) {
                                        apps[i].classList.add("active");
                                    }
                                    clearTimeout(startupTimer);
                                }, 1000);
                                if (!apps[i].classList.contains("activate") && i !== 0) {
                                    apps[i].classList.add("activate");
                                }
                            }
                        }
                        break;
                    case "inactive":
                        if(apps[i].classList.contains("active")){
                            apps[i].classList.remove("active");
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
            });
            model.dockApps.push(appObservable);
        }
    },
    contextMenus: function (menuItems) {
        for(let i = 0, ilen = menuItems.length;i < ilen;++i){
            let menuObservable = new Observable();
            menuObservable.subscribe(function (data) {
                switch (data) {
                    case "mouse-over":
                        if(!menuItems[i].classList.contains("hover")){
                            menuItems[i].classList.add("hover");
                        }
                        break;
                    case "mouse-out":
                        if(menuItems[i].classList.contains("hover")){
                            menuItems[i].classList.remove("hover");
                        }
                        break;
                    case "open":
                        // if (apps[i].classList.contains("hover")) {
                        //     apps[i].classList.remove("hover");
                        // }
                        // break;
                    case "show":
                        // if (apps[i].classList.contains("hover")) {
                        //     apps[i].classList.remove("hover");
                        // }
                        // break;
                    default:
                        console.log("SwitchError in subscribeController.apps");
                        break;
                }
            });
            model.contextMenuItems.push(menuObservable);
        }
    },
};
const listenerController = {
    initial: function () {
        this.dockListeners(view.dockApps);
        this.contextMenuListeners(view.contextMenuItems);
    },
    dockListeners: function (apps) {
        for(let i = 0, ilen = apps.length;i < ilen;++i){
            !function (i) {
                let index = i;
                apps[index].children[0].addEventListener("mouseover",function () {
                    model.dockApps[index].publish("mouse-over");
                });
                apps[index].children[0].addEventListener("mouseout",function () {
                    model.dockApps[index].publish("mouse-out");
                });
                apps[index].children[0].addEventListener("mousedown",function () {
                    model.dockApps[index].publish("click");
                });
                apps[index].children[0].addEventListener("mouseup",function () {
                    model.dockApps[index].publish("release");
                });
                apps[index].children[0].addEventListener("contextmenu",function (e) {
                    e.preventDefault();
                    model.optionsOpened.publish(index);
                });
            }(i);
        }
    },
    contextMenuListeners: function (menuItems) {
        for(let i = 0, ilen = menuItems.length;i < ilen;++i){
            !function (i) {
                let index = i;
                menuItems[index].addEventListener("mouseover",function () {
                    model.contextMenuItems[index].publish("mouse-over");
                });
                menuItems[index].addEventListener("mouseout",function () {
                    model.contextMenuItems[index].publish("mouse-out");
                });
                menuItems[index].addEventListener("click",function () {
                    model.contextMenuItems[index].publish(view.contextMenuItems[index].dataset["action"].toLowerCase());
                });
            }(i);
        }
    },
};

// eerst aangeroepen functie
!function(){
    layoutController.initial();
    subscribeController.initial();
    listenerController.initial();
}();