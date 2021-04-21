import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';

@Component({
  selector: 'sip',
  templateUrl: './sip.component.html',
  styleUrls: ['./sip.component.css']
})
export class SipComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  investment: any;
  ror: any;
  noOfYears: any;
  sipAmount: any;
  updateFlag: any;
  calculate() {
    console.log(this.investment, this.ror, this.noOfYears)
    this.sipAmount = this.investment * (1 + this.ror / 1200) * (((1 + this.ror / 1200) ** this.noOfYears) - 1) / (this.ror / 1200);
    this.chartOptions= {
      chart : {
        plotShadow: false
     },
     title : {
        text: 'Browser market shares at a specific website, 2014'   
     },
     tooltip : {
        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
     },
     plotOptions : {
        pie: {
           shadow: false,
           center: ['50%', '50%'],
           size:'45%',
           innerSize: '20%'            
        }
     },
     series : [{
        type: 'pie',
        name: 'Browser share',
        data: [
          ['Estimated returns', this.sipAmount - (this.investment*this.noOfYears)],
          ['Invested Amount', this.investment*this.noOfYears]
       ]
     }]
  };
  }

  Highcharts: typeof Highcharts = Highcharts;
  chartOptions: Highcharts.Options = {
    chart : {
      plotShadow: false
   },
   title : {
      text: 'Browser market shares at a specific website, 2014'   
   },
   tooltip : {
      pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
   },
   plotOptions : {
      pie: {
         shadow: false,
         center: ['50%', '50%'],
         size:'45%',
         innerSize: '20%'            
      }
   },
   series : [{
      type: 'pie',
      name: 'Browser share',
      data: [
         ['Estimated returns', 0],
         ['Invested Amount', 0]
      ]
   }]
};

}
