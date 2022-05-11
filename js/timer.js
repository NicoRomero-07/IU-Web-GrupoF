function secondExample() {
   
    var yourDateToGo3 = new Date();
    yourDateToGo3.setMinutes(yourDateToGo3.getMinutes()+10);
    yourDateToGo3.setSeconds(yourDateToGo3.getSeconds()+1);
    


    var timing3 = setInterval(
      function () {
        var currentDate3 = new Date().getTime();
        var timeLeft3 = yourDateToGo3 - currentDate3;

        var days3 = Math.floor(timeLeft3 / (1000 * 60 * 60 * 24));
        if (days3 < 10) days3 = "0" + days3;
        var hours3 = Math.floor((timeLeft3 % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        if (hours3 < 10) hours3 = "0" + hours3;
        var minutes3 = Math.floor((timeLeft3 % (1000 * 60 * 60)) / (1000 * 60));
        if (minutes3 < 10) minutes3 = "0" + minutes3;
        var seconds3 = Math.floor((timeLeft3 % (1000 * 60)) / 1000);
        if (seconds3 < 10) seconds3 = "0" + seconds3;

        document.getElementById("countdown3").innerHTML = days3 + "d " + hours3 + "h " + minutes3 + "m " + seconds3 + "s";


          if (timeLeft3 <= 0) {
            clearInterval(timing3);
            document.getElementById("countdown3").innerHTML = "It's over";

          }
        }, 1000);

  }

secondExample();
