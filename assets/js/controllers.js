// AngularJS controllers
app.controller('AppController', function($scope, $timeout, $mdSidenav, $log, toastService) {
    $scope.openSideMenu = function(){
        $mdSidenav('left').toggle()
            .then(function () {
                $log.debug("abrir menu lateral");
            });
    }
    $scope.form_send = function(success){
        if (success) {
            $('#form-email').val("");
            toastService.showSimpleToastTimeMillis("E-mail cadastrado com sucesso", 1000);
            // $('#form-contact').addClass('animated fadeOutRight');
            // $('#form-contact').hide(500);
            // $('.form-result-ok').show().addClass('animated fadeInLeft');
            // $('.form-result-ok').attr('position', 'relative');
        }else{
            toastService.showSimpleToastTimeMillis("Erro ao cadastrar E-mail", 500);
            // $('#form-contact').addClass('animated fadeOutLeft');
            // $('#form-contact').hide(500);
            // $('.form-result-error').show().addClass('animated fadeInRight');
            // $('.form-result-error').attr('position', 'relative');
        };
    }

    $scope.hide_form_result = function(){
        // $('.form-result-ok').hide();
        // $('.form-result-error').hide();
    }

    $scope.add_contact_form_click = function() {
        $('#form-contact').click(function(e){
            e.preventDefault();
            $.ajax({
                url: "//formspree.io/startupaluminus@gmail.com",
                method: "POST",
                data: {
                    message: "Cadastrar na newsletter para receber mais informacoes da Aluminus",
                    _replyto: $('#form-email').val(),
                    name: $('#form-email').val()
                  },
                dataType: "json",
                success: function(data) {
                    msg_send(true);
                },
                error: function(data) {
                    msg_send(false);
                }
            });
        });
    }
    $scope.add_contact_form_click();

});

app.controller('NavLeftController', function ($scope, $timeout, $mdSidenav, $log) {
    $scope.closeSidebar = function () {
        $mdSidenav('left').close()
            .then(function () {
                $log.debug("Menu lateral fechado");
            });
    };
});

app.controller('LeftCtrl', function ($scope, $timeout, $mdSidenav, $log) {

});

app.controller('progressCtrl', ['$scope', '$interval', function($scope, $interval) {
    var self = this, j= 0, counter = 0;
    self.mode = 'query';
    self.activated = true;
    self.determinateValue = 30;
    self.determinateValue2 = 30;
    self.modes = [ ];
    /**
     * Turn off or on the 5 themed loaders
     */
    self.toggleActivation = function() {
        if ( !self.activated ) self.modes = [ ];
        if (  self.activated ) {
          j = counter = 0;
          self.determinateValue = 30;
          self.determinateValue2 = 30;
        }
    };
    $interval(function() {
      self.determinateValue += 1;
      self.determinateValue2 += 1.5;
      if (self.determinateValue > 100) self.determinateValue = 30;
      if (self.determinateValue2 > 100) self.determinateValue2 = 30;
        // Incrementally start animation the five (5) Indeterminate,
        // themed progress circular bars
        if ( (j < 2) && !self.modes[j] && self.activated ) {
          self.modes[j] = (j==0) ? 'buffer' : 'query';
        }
        if ( counter++ % 4 == 0 ) j++;
        // Show the indicator in the "Used within Containers" after 200ms delay
        if ( j == 2 ) self.contained = "indeterminate";
    }, 100, 0, true);
    $interval(function() {
      self.mode = (self.mode == 'query' ? 'determinate' : 'query');
    }, 7200, 0, true);
  }]);
