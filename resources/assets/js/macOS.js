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
        dockAppsImages: document.querySelectorAll("ul.dock img"),
    };
    const model = {
        dockApps: [],

    };
const subscribeController = {
    initial: function () {
        this.modelFiller(model.dockApps);
    },
    modelFiller: function (model) {

    }
};
    const gameSetup = {
        pawns: function () {

        },
    };

    // eerst aangeroepen functie
    !function(){
        subscribeController.initial();
        // gameSetup.goose();
        // gameSetup.dice(2);
        // gameSetup.singleObservables();
        //
        // gameView.playerAmount.addEventListener("change", function () {
        //     // inputs hidden zetten als iets veranderd aan select
        //     for (let i = 0, ilen = gameView.playerInput.length; i < ilen; ++i) {
        //         gameView.playerInput[i].setAttribute("class", "hidden");
        //     }
        //     var playerAmount = gameView.playerAmount.value;
        //     for (let i = 0; i < playerAmount; ++i) {
        //         gameView.playerInput[i].removeAttribute("class");
        //     }
        // });
        //
        // gameView.startButton.addEventListener("click", function () {
        //     var playerAmount = gameView.playerAmount.value;
        //     var playerNames = [];
        //     for (let i = 0; i < playerAmount; ++i) {
        //         if (gameView.playerInput[i].value !== "") {
        //             playerNames.push(gameView.playerInput[i].value);
        //             gameView.playerButtons[i].setAttribute("aria-label",gameView.playerInput[i].value + " Dobbel");
        //         } else {
        //             playerNames.push("Speler " + (i + 1));
        //             gameView.playerButtons[i].setAttribute("aria-label","Speler " + (i + 1) + " Dobbel");
        //         }
        //     }
        //     gameSetup.players(playerAmount, playerNames);
        //     gameSetup.pawns(playerAmount);
        //     gameView.overlay.setAttribute("class", "hidden");
        //     gameView.beginOverlay.setAttribute("class", "hidden");
        // });
    }();