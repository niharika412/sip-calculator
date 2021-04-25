import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ChartColor, ChartType } from 'chart.js';
import { MultiDataSet, Label, Color } from 'ng2-charts';
@Component({
   selector: 'sip',
   templateUrl: './sip.component.html',
   styleUrls: ['./sip.component.css']
})
export class SipComponent implements OnInit {

   constructor(private fb: FormBuilder) { }
   width: any;
   small: any;
   chart: any;

   doughnutChartLabels: Label[] = ['Invested Amount', 'Returns'];
   doughnutChartData: MultiDataSet = [
      [0, 0]
   ];
   doughnutChartType: ChartType = 'doughnut';
   doughnutChartColors: Color[] = [{
      backgroundColor: ['#37a000', '#2b5468']
     }];

   investment: any;
   ror: any;
   calculated = false;
   sipForm: any;
   noOfYears: any;
   sipAmount: any;
   updateFlag: any;
   noOfYearsFin: any;
   investmentFin: any;



   ngOnInit(): void {
      this.width = window.innerWidth;
      // console.log(this.width)

      if (this.width < 640) {
         this.small = true;
      }
      this.sipForm = this.fb.group({
         ror: ['', Validators.required],
         noOfYears: ['', Validators.required],
         investment: ['', [Validators.required, Validators.pattern('^[0-9]*$')]]
      });
   }

   public calculate() {
      this.noOfYearsFin = this.noOfYears * 12;
      //  console.log(this.investment, this.ror, this.noOfYears)
      this.sipAmount = this.investment * (1 + this.ror / 1200) * (((1 + this.ror / 1200) ** this.noOfYearsFin) - 1) / (this.ror / 1200);
      this.investmentFin = this.investment;
      if (this.small) {
         this.doughnutChartLabels = ['Invested Amount', 'Returns'];
         this.doughnutChartData = [
            [this.investmentFin * this.noOfYearsFin, this.sipAmount - (this.investmentFin * this.noOfYearsFin)]
         ];
         this.doughnutChartType = 'doughnut';
      } else {
         this.doughnutChartLabels = ['Invested Amount', 'Returns'];
         this.doughnutChartData = [
            [this.investmentFin * this.noOfYearsFin, this.sipAmount - (this.investmentFin * this.noOfYearsFin)]
         ];
         this.doughnutChartType = 'doughnut';
      }

      this.calculated = true;
   }


   public reset() {
      this.sipForm.reset();
      this.calculated = false;
   }

}
