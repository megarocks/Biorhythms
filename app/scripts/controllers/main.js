'use strict';

/**
 * @ngdoc function
 * @name yoApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the yoApp
 */
angular.module('yoApp')
  .controller('MainCtrl', function ($scope) {


    this.user = {};

    this.calculate = function () {

      if (this.user.birthDay) {
        this.user.daysAlive = moment().diff(this.user.birthDay, 'd');

        this.user.rhythms = [];
        for (var i = -15; i < 45; i++) {
          this.user.rhythms.push(
            calculateRhythmsForDay(new Date(this.user.birthDay), moment().add(i, 'd'))
          );
        }

        $scope.chartObject = {};

        $scope.chartObject.type = "AnnotationChart";

        var rows = this.user.rhythms.map(function (day) {
          return {
            c: [
              {v: new Date(day.date)},
              {v: day.physical},
              {v: day.emotional},
              {v: day.intellectual}
            ]
          }
        });

        $scope.chartObject.data = {
          cols: [
            {id: "day", label: "Day", type: "date"},
            {id: "physical", label: "Physical", type: "number"},
            {id: "emotional", label: "Emotional", type: "number"},
            {id: "intellectual", label: "Intellectual", type: "number"}
          ],
          rows: rows
        };
      }

    };

    function calculateRhythmsForDay(birthDay, calculationDate) {
      birthDay = moment(birthDay);
      calculationDate = moment(calculationDate);

      var daysAlive = calculationDate.diff(birthDay, 'days');

      return {
        date: calculationDate,
        physical: calculateRhythm('PHYSICAL', daysAlive),
        emotional: calculateRhythm('EMOTIONAL', daysAlive),
        intellectual: calculateRhythm('INTELLECTUAL', daysAlive)
      }

    }

    function calculateRhythm(type, daysAlive) {
      var period;
      switch (type) {
        case 'PHYSICAL':
          period = 23.688;
          //period = 23;
          break;
        case 'EMOTIONAL':
          period = 28.426;
          //period = 28;
          break;
        case 'INTELLECTUAL':
          period = 33.164;
          //period = 33;
          break;
        default:
          break;
      }

      if (period) {
        return Math.round((Math.sin((2 * Math.PI * daysAlive) / period)) * 100);
      } else {
        throw new Error('Unknown bio type specified');
      }


    }

  });
