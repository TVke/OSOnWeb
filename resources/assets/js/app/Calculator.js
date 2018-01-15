const Calculator = function () {
    !function () {
        console.log("test");
        subscriptionController.initial();
    }();
    const view = {
        output: document.getElementsByTagName("output")[0],
        numberInput: document.querySelectorAll(".basic-buttons .input"),
        buttons: document.querySelectorAll(".basic-buttons button"),
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
                view.output.innerHTML += data+"";
            });
        },
        multiple: function () {
            for(let i=0,ilen=model.numberInput.length;i<ilen;++i){
                let newObservable = new Observable();
                !function(i){
                    let index = i;
                    newObservable.subscribe(function (data) {

                    });
                }(i);
                model.buttons.push(newObservable);
            }
        },
    };
};