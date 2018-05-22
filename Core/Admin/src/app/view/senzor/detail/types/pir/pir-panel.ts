import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';


//ngRx
import { ApplicationState } from 'app/state/state/application.state';
import { Store } from '@ngrx/store';


//websocket
import { Socket } from '../../../../../service/Socket';

//others
declare var jQuery: any;
import { chart, LineChartSeriesOptions } from 'highcharts';
// import { stockChart } from 'highcharts/highstock';

//cellarstone
import { PublishToMqttModel } from 'app/models/publishToMqtt.model';
import { PublishToMqttAction } from 'app/state/actions/mqtt.actions';


@Component({
  selector: 'pir-panel',
  templateUrl: './pir-panel.html',
  styleUrls: ['./pir-panel.scss']
})
export class PirPanel implements OnInit {

  @Input()
  private senzorName: string;

  //websockets
  public socket: Socket;


  @ViewChild('chartTarget') chartTarget: ElementRef;
  chart: Highcharts.ChartObject;

  public actualValue: number = 0;


  constructor(private store: Store<ApplicationState>) { }

  ngOnInit() {

    this.setCharts();

    //websockets
    this.socket = new Socket(this.senzorName + "pir");
    this.socket.on('connect', this.onConnect.bind(this));
    this.socket.on('disconnect', this.onDisconnect.bind(this));
    this.socket.on('message', this.onMessage.bind(this));
    
    // CHECK SENZOR
    this.checkSenzor();
  }
  ngOnDestroy() {
    console.log("destroy");

    this.chart = null;

    this.socket.close();
    this.socket.ee.removeAllListeners();
    this.socket = null;
  }





  //*********************************/
  /* CHECK Senzor Actual State */
  //*********************************/

  checkSenzor() {

    // CHECK PIR
    let vm = new PublishToMqttModel();
    vm.topic = this.senzorName + "/check_Pir";
    vm.value = "";
    
    // ARRAY of actions
    let arrVM = Array<PublishToMqttModel>();
    arrVM.push(vm);

    this.store.dispatch(new PublishToMqttAction(arrVM));
  }






  //*********************************/
  /* CHARTS */
  //*********************************/

  setCharts() {
    const options: Highcharts.Options = {
      chart: {
        type: 'line',
        // animation: Highcharts.svg, // don't animate in old IE
        marginRight: 10,
        events: {
          // load: function () {

          //     // set up the updating of the chart each second
          //     var series = this.series[0];
          //     setInterval(function () {
          //         var x = (new Date()).getTime(), // current time
          //             y = Math.random();
          //         series.addPoint([x, y], true, true);
          //     }, 1000);
          // }
        }
      },
      title: {
        text: 'Movement Yes/No'
      },
      xAxis: {
        type: 'datetime',
        tickPixelInterval: 150
      },  
      yAxis: {
        title: {
          text: 'Value'
        },
        plotLines: [{
          value: 0,
          width: 1,
          color: '#808080'
        }]
      },
      
      // tooltip: {
      //     formatter: function () {
      //         return '<b>' + this.series.name + '</b><br/>' +
      //             this.dateFormat('%Y-%m-%d %H:%M:%S', this.x) + '<br/>' +
      //             this.numberFormat(this.y, 2);
      //     }
      // },
      legend: {
        enabled: false
      },
      exporting: {
        enabled: false
      },
      // series: [{
      //     name: 's3102',
      //     data: []
      // }]
      series: <LineChartSeriesOptions[]>[{
        name: 'Random data',
        step: 'left',
        marker: {
          enabled: false
        },
        data: (function () {
          // generate an array of random data
          var data = [],
            time = (new Date()).getTime(),
            i;

          // data.push({
          //     x: time + i * 1000,
          //     y: 0
          // });

          for (i = -19; i <= 0; i += 1) {
            data.push({
              x: time + i * 1000,
              y: 0
            });
          }
          return data;
        }())
      }]
    };

    this.chart = chart(this.chartTarget.nativeElement, options);


    // Create the chart
  //   this.chart = stockChart(this.chartTarget.nativeElement, {

  //     rangeSelector: {
  //         selected: 1
  //     },

  //     title: {
  //         text: 'Movement Yes/No'
  //     },
  //     series: [{
  //       name: 'Random data',
  //       data: (function () {
  //         // generate an array of random data
  //         var data = [],
  //           time = (new Date()).getTime(),
  //           i;

  //         // data.push({
  //         //     x: time + i * 1000,
  //         //     y: 0
  //         // });

  //         for (i = -19; i <= 0; i += 1) {
  //           data.push({
  //             x: time + i * 1000,
  //             y: 0
  //           });
  //         }
  //         return data;
  //       }())
  //     }]
  // });





  }


  //*********************************/
  /* WEBSOCKET METHODS */
  //*********************************/

  onConnect() {
    console.log("onConnect");
  }
  onDisconnect() {
    console.log("onDisconnect");
  }

  onMessage(message) {
    let number = parseFloat(message);
    this.actualValue = number;

    var x = (new Date()).getTime(), // current time
      y = Math.round(this.actualValue);
    this.chart.series[0].addPoint([x, y], true, true)
  }


}
