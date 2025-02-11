const Calculator = function() {
    const _self = this;
    const view = {
        window: document.querySelector(".window.Calculator"),
        mover: document.getElementsByClassName("mover"),
        output: document.getElementsByTagName("output")[0],
        numberInput: document.querySelectorAll(".basic-buttons .input"),
        editions: document.querySelectorAll(".basic-buttons .editions"),
        extraButtons: document.querySelectorAll(".basic-buttons .darker"),
    };
    const model = {
        output: new Observable(),
        numberInput: new Observable(),
        pressed: new Observable(),
        startX: new Observable(),
        startY: new Observable(),
        x: new Observable(),
        y: new Observable(),
    };
    const subscriptionController = {
        initial: function () {
            this.singles();
            // this.multiple();
        },
        singles: function () {
            model.output.subscribe(function (data) {
                view.output.innerHTML += data + "";
            });
            model.x.subscribe(function (data) {
                let currentLeft = parseInt(view.window.style.left);
                let movedX = data - model.startX.publish();
                view.window.style.left = (movedX + currentLeft) + "px";
                model.startX.publish(data);
            });
            model.y.subscribe(function (data) {
                let currentTop = parseInt(view.window.style.top);
                let movedY = data - model.startY.publish();
                view.window.style.top = (movedY + currentTop) + "px";
                model.startY.publish(data);
            });
        },
        multiple: function () {
            for (let i = 0, ilen = model.numberInput.length; i < ilen; ++i) {
                let newObservable = new Observable();
                !function (i) {
                    let index = i;
                    newObservable.subscribe(function (data) {

                    });
                }(i);
                model.buttons.push(newObservable);
            }
        },
    };
    const calculatorListenerController = {
        initial: function () {
            this.outputListeners();
        },
        outputListeners: function () {
            view.output.addEventListener("mousedown",function (e) {
                model.pressed.publish(true);
                model.startX.publish(e.x);
                model.startY.publish(e.y);
            });
            view.output.addEventListener("mousemove",function (e) {
                e.preventDefault();
                if(model.pressed.publish()){
                    model.x.publish(e.x);
                    model.y.publish(e.y);
                }
            });
            view.output.addEventListener("mouseup",function (e) {
                model.pressed.publish(false);
                model.startX.publish(e.x);
                model.startY.publish(e.y);
            });
            view.output.addEventListener("mouseout",function (e) {
                model.pressed.publish(false);
                model.startX.publish(e.x);
                model.startY.publish(e.y);
            });

        }
    };
    !function () {
        view.window.style.left = "150px";
        view.window.style.top = "130px";
        subscriptionController.initial();
        calculatorListenerController.initial();
    }();
};
!function () {
    Calculator();
}();