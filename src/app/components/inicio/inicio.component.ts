import { Component, OnInit } from '@angular/core';
import { Chart, ChartEvent } from 'chart.js';
import { single } from 'rxjs';
import { AdminService } from 'src/app/services/admin.service';
import { ClienteService } from 'src/app/services/cliente.service';
import { GLOBAL } from 'src/app/services/GLOBAL';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  public saleData: any = [

  ];

  public catData: any = [

  ];
  public regionData: any = [

  ];
  public url;
  public id;
  public admin: any = {};

  public prod_mes: any = {};
  public mas_vendido_gobal: any = [];


  view: any[] = [700, 400];

  // options
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = 'Country';
  showYAxisLabel = true;
  yAxisLabel = 'Population';

  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };

  public total_ganancia = 0;
  public total_mes_actual = 0;
  public count_ventas_mes = 0;
  public total_mes_anterior = 0;
  public count_ventas_mes_pass = 0;
  public count_total = 0;


  public count_categ :any = {};

  constructor( private _adminService: AdminService, private _clienteService: ClienteService){
    this.url = GLOBAL.url

    Object.assign(this.saleData);

  this.id = localStorage.getItem('_id');
  console.log(this.id);

}


  ngOnInit(): void {
      this.kpi_ganancias_mensuales_admin()
      this.get_cliente_id()



  }

  //estadisticas y rendimiento
  kpi_ganancias_mensuales_admin(){
    this._adminService.kpi_ganancias_mensuales_admin().subscribe(
      (resp:any)=>{

        //console.log(resp);

        this.saleData = [
          { name: "Enero", value: resp.enero },
          { name: "Febrero", value: resp.febrero },
          { name: "Marzo", value: resp.marzo },
          { name: "Abril", value: resp.abril },
          { name: "Mayo", value: resp.mayo },
          { name: "Junio", value: resp.junio },
          { name: "Julio", value: resp.julio },
          { name: "Agosto", value: resp.agosto },
          { name: "Septiembre", value: resp.septiembre },
          { name: "Octubre", value: resp.octubre },
          { name: "Noviembre", value: resp.noviembre },
          { name: "Diciembre", value: resp.diciembre },

          ]


          this.catData = [
            { name: "Mantas", value: resp.mantas },
            { name: "Cojines", value: resp.cojines },
            { name: "Edredones", value: resp.edredones },


            ]

            this.regionData = [


               { name: "Andalucía", value:resp.andalucia },
               { name: "Aragón", value:resp.aragon},
               { name: "Principado de Asturias", value:resp.asturias},
               { name: "Illes Balears", value:resp.baleares},
               { name: "Canarias", value:resp.canarias},
               { name: "Cantabria", value:resp.cantabria},
               { name: "Castilla y León", value:resp.castilla_y_leon},
               { name: "Castilla-La Mancha", value:resp.castilla_la_mancha},
               { name: "Cataluña", value:resp.catalunya},
               { name: "Comunitat Valenciana", value:resp.valencia},
               { name: "Extremadura", value:resp.extremadura},
               { name: "Galicia", value:resp.galicia},
               { name: "Comunidad de Madrid", value:resp.madrid},
               { name: "Región de Murcia", value:resp.murcia},
               { name: "Comunidad Foral de Navarra", value:resp.navarra},
               { name: "País Vasco", value:resp.pais_vasco},
               { name: "La Rioja", value:resp.la_rioja},
               { name: "Ciudad Autónoma de Ceuta", value:resp.ceuta},
               { name: "Ciudad Autónoma de Melilla", value:resp.melilla},


              ]






















           this.total_ganancia = resp.total_ganancia
           this.total_mes_actual = resp.total_mes_actual;
           this.count_ventas_mes = resp.count_ventas_mes;
           this.total_mes_anterior = resp.total_mes_anterior
           this.count_ventas_mes_pass = resp.count_ventas_mes_pass;
           this.count_total = resp.count_total
           this.mas_vendido_gobal = resp.mas_vendido_gobal;

          // console.log(this.mas_vendido_gobal);


          resp.mas_vendido_mes.forEach((element:any) => {
            // console.log(element.producto);
             this.prod_mes  = element.producto
           });


         ;


      },

      (err: any)=>{
         console.log(err);
      }
    )
  }

//graficas---------------
  onSelect(single: any): void {
    console.log('Item clicked', JSON.parse(JSON.stringify(single)));
  }

  onActivate(single: any): void {
    console.log('Activate', JSON.parse(JSON.stringify(single)));
  }

  onDeactivate(single: any): void {
    console.log('Deactivate', JSON.parse(JSON.stringify(single)));
  }

  //--------------------------------------

  get_cliente_id(){
        this._clienteService.get_cliente_id(this.id).subscribe(
          (resp: any)=>{
            this.admin = resp.admin;
          },
          err=>{
            console.log(err);

          }
        )

  }
}


