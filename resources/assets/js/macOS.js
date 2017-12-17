!function(window, undefined) {

}(window);


    var Observable = function() {
        var _self = this;
        _self.prototype.data;
        _self.prototype.subs = [];
        _self.prototype.methods = {
            publish: function (newData) {
                if (typeof newData !== 'undefined') {
                    _self.prototype.data = newData;
                    for (var i = 0, ilen = _self.prototype.subs.length; i < ilen; ++i) {
                        _self.prototype.subs[i](_self.prototype.data);
                    }
                } else {
                    return _self.prototype.data;
                }
            },
            subscribe: function (callback) {
                if (_self.subs.prototype.indexOf(callback) === -1) {
                    _self.subs.prototype.push(callback);
                }
            }//,
            // unsubscribe: function (callback) {
            //     if (_self.subs.prototype.indexOf(callback) === -1) {
            //         _self.subs.prototype.splice(callback);
            //     }
            // }
        };
        return _self.prototype.methods;
    };

    var view = {
        startButton: document.querySelector("body")
    };
    var model = {
        showInfoTime: new Observable()
    };
    var gameController = {
        skipTurn: function () {

        }
    };
    var gameSetup = {
        pawns: function () {

        }
    };
// eerst aangeroepen functie
    !function(){
        gameSetup.goose();
        gameSetup.dice(2);
        gameSetup.singleObservables();

        gameView.playerAmount.addEventListener("change", function () {
            // inputs hidden zetten als iets veranderd aan select
            for (let i = 0, ilen = gameView.playerInput.length; i < ilen; ++i) {
                gameView.playerInput[i].setAttribute("class", "hidden");
            }
            var playerAmount = gameView.playerAmount.value;
            for (let i = 0; i < playerAmount; ++i) {
                gameView.playerInput[i].removeAttribute("class");
            }
        });

        gameView.startButton.addEventListener("click", function () {
            var playerAmount = gameView.playerAmount.value;
            var playerNames = [];
            for (let i = 0; i < playerAmount; ++i) {
                if (gameView.playerInput[i].value !== "") {
                    playerNames.push(gameView.playerInput[i].value);
                    gameView.playerButtons[i].setAttribute("aria-label",gameView.playerInput[i].value + " Dobbel");
                } else {
                    playerNames.push("Speler " + (i + 1));
                    gameView.playerButtons[i].setAttribute("aria-label","Speler " + (i + 1) + " Dobbel");
                }
            }
            gameSetup.players(playerAmount, playerNames);
            gameSetup.pawns(playerAmount);
            gameView.overlay.setAttribute("class", "hidden");
            gameView.beginOverlay.setAttribute("class", "hidden");
        });
    }();