const Calculator = function() {
    const view = {
        output: document.getElementsByTagName("output")[0],
        numberInput: document.querySelectorAll(".basic-buttons .input"),
        editions: document.querySelectorAll(".basic-buttons .editions"),
        extraButtons: document.querySelectorAll(".basic-buttons .darker"),
    };
    const model = {
        output: new Observable(),
        numberInput: new Observable(),
    };
    const subscriptionController = {
        initial: function () {
            this.singles();
            this.multiple();
        },
        singles: function () {
            model.output.subscribe(function (data) {
                view.output.innerHTML += data + "";
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
                Calculator.model.buttons.push(newObservable);
            }
        },
    };
    const calculatorListenerController = {
        initial: function () {

        },

    };
    !function () {
        subscriptionController.initial();
        calculatorListenerController.initial();
    }();
};
!function () {
    Calculator();
}();