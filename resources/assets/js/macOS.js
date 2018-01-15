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
    language: document.getElementsByTagName("html")[0].getAttribute("lang"),
    clock: document.getElementById("clock"),
    dockAppsLabels: document.querySelectorAll(".dock figcaption"),
    dockApps: document.querySelectorAll(".dock li"),
    contextMenuItems: document.querySelectorAll(".dock li div.menu p"),
    openWindows: document.getElementById("open-windows"),
    closeButtons: document.getElementsByClassName("close"),
};
const model = {
    dockApps: [],
    contextMenuItems: [],
    holdTimer: new Observable(),
    optionsOpened: new Observable(),
    optionsToggle: new Observable(),
    secondRelease: new Observable(),
    window: new Observable(),
};
const layoutController = {
    initial: function () {
        this.correctLabel(view.dockAppsLabels);
        this.clock();
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
    },
    clock: function () {
        setInterval(function () {
            let currentDate = new Date();
            view.clock.innerHTML = currentDate.toLocaleDateString(view.language + "-BE",{weekday: 'short', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit'});
        },1000);
    }
};
const subscribeController = {
    initial: function () {
        this.dockMenu();
        this.dockMenuUpdate();
        this.apps(view.dockApps);
        this.contextMenus(view.contextMenuItems);
        this.window();
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
    dockMenuUpdate: function () {
        model.optionsToggle.subscribe(function (appMenu) {
            let toToggle = appMenu.querySelectorAll("p[data-toggle]");
            for(let i = 0, ilen = toToggle.length;i < ilen;++i){
                let currentText = toToggle[i].innerHTML;
                let currentAction = toToggle[i].dataset.action;
                let currentLoad = toToggle[i].dataset.load;
                let newText = toToggle[i].dataset.toggle;
                let newAction = toToggle[i].dataset.toggleAction;
                let newLoad = toToggle[i].dataset.toggleLoad;

                toToggle[i].dataset.toggle = currentText;
                toToggle[i].dataset.toggleAction = currentAction;
                toToggle[i].dataset.toggleLoad = currentLoad;
                toToggle[i].innerHTML = newText;
                toToggle[i].dataset.action = newAction;
                toToggle[i].dataset.load = newLoad;
            }
        });
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
                        if(model.optionsOpened.publish() !== null){
                            model.secondRelease.publish(true);
                        }
                        model.holdTimer.publish(setTimeout(function () {
                            model.optionsOpened.publish(i);
                        },500));
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
                        if(model.optionsOpened.publish() !== null && model.secondRelease.publish()){
                            model.optionsOpened.publish(null);
                            model.secondRelease.publish(false);
                        }
                        break;
                    case "active":
                        if (!apps[i].classList.contains("active")) {
                            appController.open(apps[i]);
                            if (!apps[i].classList.contains("activate") && i !== 1) {
                                apps[i].classList.add("activate");
                            }
                        }
                        break;
                    case "inactive":
                        model.optionsOpened.publish(null);
                        model.optionsToggle.publish(apps[i].children[1]);
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
                const app = menuItems[i].parentElement.parentElement;
                const appIndex = dockController.findIndex(app);
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
                        model.dockApps[appIndex].publish("active");
                        break;
                    case "show":
                        appController.file(app);
                        break;
                    case "new":
                        appController.dir(app);
                        break;
                    case "stop":
                        windowController.closeAllWindowsFrom(menuItems[i].dataset.load);
                        model.dockApps[appIndex].publish("inactive");
                        break;
                    case "restart":
                        location.reload();
                        break;
                    default:
                        console.log("SwitchError in subscribeController.apps");
                        break;
                }
            });
            model.contextMenuItems.push(menuObservable);
        }
    },
    window: function () {
        model.window.subscribe(function (data) {
            const alreadyOpen = view.openWindows.innerHTML;
            view.openWindows.innerHTML = alreadyOpen + data;
        });
    }
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
                menuItems[index].addEventListener("click",function (e) {
                    e.preventDefault();
                    model.contextMenuItems[index].publish(view.contextMenuItems[index].dataset["action"].toLowerCase());
                });
            }(i);
        }
    },
};
const dockController = {
    findIndex: function (DOMElement) {
        for(let i = 0, ilen = view.dockApps.length;i < ilen;++i){
            if(view.dockApps[i] === DOMElement){
                return i;
            }
        }
    },
    getName: function (appIndex) {
        return view.dockApps[appIndex].children[0].children[0].dataset.name;
    },
};
const appController = {
    open: function (app) {
        const appLink = app.getElementsByClassName("menu")[0].querySelector("p[data-action=open]").dataset.load;

        const htmlRequest = new XMLHttpRequest();
        htmlRequest.open("GET",location.href + appLink);
        htmlRequest.onreadystatechange = function(){
            if(htmlRequest.readyState === 4 && htmlRequest.status === 200){

                model.window.publish(htmlRequest.responseText);
                windowController.new(app);
            }
        };
        htmlRequest.send();

        // load JS once
        if(document.querySelectorAll("script[src*=" + dockController.getName(dockController.findIndex(app)) + "]").length < 1){
            const JScript = document.createElement("script");
            JScript.src = "/js" + appLink + ".js";
            document.body.appendChild(JScript);
        }
    },
    file:function (app) {
        const appLink = app.getElementsByClassName("menu")[0].querySelector("p[data-action=show]").dataset.load;
        const path = app.getElementsByClassName("menu")[0].querySelector("p[data-action=show]").dataset.load;

        const FinderRequest = new XMLHttpRequest();
        FinderRequest.open("GET",location.href + appLink + "/" + path);
        FinderRequest.onreadystatechange = function(){
            if(FinderRequest.readyState === 4 && FinderRequest.status === 200){
                model.window.publish(FinderRequest.responseText);

            }
        };
        FinderRequest.send();
    },
    dir:function (app) {
        const appLink = app.getElementsByClassName("menu")[0].querySelector("p[data-action=new]").dataset.load;
        const path = app.getElementsByClassName("menu")[0].querySelector("p[data-action=new]").dataset.load;

        const FinderRequest = new XMLHttpRequest();
        FinderRequest.open("GET",location.href + appLink + "/" + path);
        FinderRequest.onreadystatechange = function(){
            if(FinderRequest.readyState === 4 && FinderRequest.status === 200){
                model.window.publish(FinderRequest.responseText);

            }
        };
        FinderRequest.send();
    },
};
const windowController = {
    new: function (app) {
        if (app.classList.contains("activate")) {
            app.classList.remove("activate");
        }
        if (!app.classList.contains("active")) {
            app.classList.add("active");
        }
        this.closeButtonListen(view.closeButtons);
        model.optionsOpened.publish(null);
        model.optionsToggle.publish(app.getElementsByClassName("menu")[0]);
    },
    closeButtonListen: function(buttons){
        for(let i = 0, ilen = buttons.length;i < ilen;++i) {
            !function (i) {
                buttons[i].addEventListener("click",function (e) {
                    e.preventDefault();
                    e.target.removeEventListener("click",this);
                    const currentWindow = e.target.parentElement.parentElement;
                    const appId = windowController.getAppIndex(currentWindow);
                    currentWindow.remove();
                    if(!windowController.anyWindowsOpen(appId)){
                        model.dockApps[appId].publish("inactive");
                    }
                });
            }(i);
        }
    },
    closeAllWindowsFrom: function (appName) {
        for(let i = 0, ilen = view.openWindows.children.length;i < ilen;++i) {
            if(view.openWindows.children[i].classList.contains(appName)){
                view.openWindows.children[i].remove();
            }
        }
    },
    getAppIndex: function (WindowElement) {
        for(let i = 0, ilen = view.dockApps.length;i < ilen;++i) {
            if(WindowElement.classList.contains(dockController.getName(i))){
                return i;
            }
        }
    },
    anyWindowsOpen: function (appIndex) {
        let windowsOpen = false;
        for(let i = 0, ilen = view.openWindows.children.length;i < ilen;++i) {
            if(view.openWindows.children[i].classList.contains(dockController.getName(appIndex))){
                windowsOpen = true;
                break;
            }
        }
        return windowsOpen;
    }
};
// eerst aangeroepen functie
!function(){
    layoutController.initial();
    subscribeController.initial();
    listenerController.initial();
}();