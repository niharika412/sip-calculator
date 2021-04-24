import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import * as Highcharts from 'highcharts';

@Component({
   selector: 'sip',
   templateUrl: './sip.component.html',
   styleUrls: ['./sip.component.css']
})
export class SipComponent implements OnInit {

   constructor(private fb: FormBuilder) { }
   width: any;
   small: any;
   ngOnInit(): void {
      this.width = window.innerWidth;
      // console.log(this.width)

      if (this.width < 640) {
         this.small = true;
      }
      this.sipForm = this.fb.group({
         ror: ['', Validators.required],
         noOfYears: ['', Validators.required],
         investment: ['', [Validators.required, Validators.pattern("^[0-9]*$")]]
      })
   }



   investment: any;
   ror: any;
   calculated: boolean = false;
   sipForm: any;
   noOfYears: any;
   sipAmount: any;
   updateFlag: any;
   noOfYearsFin:any;
   investmentFin:any;

   calculate() {
      this.noOfYearsFin = this.noOfYears*12;
      //  console.log(this.investment, this.ror, this.noOfYears)
      this.sipAmount = this.investment * (1 + this.ror / 1200) * (((1 + this.ror / 1200) ** this.noOfYearsFin) - 1) / (this.ror / 1200);
      this.investmentFin = this.investment
      if (this.small) {
         this.chartOptions = {
            chart: {
               plotShadow: false,
               height: 200,
               width: 200
            },
            colors:['#603A27','#1DA1F2'],
            title: {
               text: undefined
            },
            tooltip: {
               pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
            },
            plotOptions: {
               pie: {
                  shadow: true,
                  center: ['50%', '50%'],
                  innerSize: '50%'
               }
            },
            series: [{
               type: 'pie',
               name: undefined,
               data: [
                  ['Returns', this.sipAmount - (this.investment * this.noOfYears)],
                  ['Invested Amount', this.investment * this.noOfYears]
               ]
            }]
         };
      }else{
         this.chartOptions = {
            chart: {
               plotShadow: false,
               height: 500,
               width: 600
            },
            colors:['#37a000','#1DA1F2'],
            title: {
               text: undefined
            },
            tooltip: {
               pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
            },
            plotOptions: {
               pie: {
                  shadow: true,
                  center: ['50%', '50%'],
                  innerSize: '50%'
               }
            },
            series: [{
               type: 'pie',
               name: undefined,
               data: [
                  ['Returns', this.sipAmount - (this.investment * this.noOfYears)],
                  ['Invested Amount', this.investment * this.noOfYears]
               ]
            }]
         };
      }
      
      this.calculated = true;
   }

   Highcharts: typeof Highcharts = Highcharts;
   chartOptions: Highcharts.Options = {
      chart: {
         plotShadow: false,
         height: 200,
         width: 200
      },
      title: {
         text: undefined
      },
      tooltip: {
         pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
      },
      plotOptions: {
         pie: {
            // center: ['50%', '50%'],
            innerSize: '50%'
         }
      },
      series: [{
         type: 'pie',
         name: 'Browser share',
         data: [
            ['Estimated returns', 0],
            ['Invested Amount', 0]
         ]
      }]
   };

   reset(){
      this.sipForm.reset();
      this.calculated=false;
   }

}
