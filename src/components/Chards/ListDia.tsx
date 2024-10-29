'use client'
import type { ApexOptions } from 'apexcharts'
import { Chart } from './Chart'

function ListDia() {
  const chartOptions: ApexOptions = {
    chart: {
      background: 'transparent',
      toolbar: {
        show: false,
      },
      sparkline: {
        enabled: true,
      },
      zoom: {
        enabled: false,
      },
    },
    fill: {
      gradient: {
        shade: 'light',
        type: 'vertical',
        shadeIntensity: 0.1,
        inverseColors: false,
        opacityFrom: 0.8,
        opacityTo: 0,
        stops: [0, 100],
      },
    },
    colors: ['primary.main'],
    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: true,
      colors: ['primary.main'],
      width: 3,
    },
    legend: {
      show: false,
    },
    labels: [
      'Segunda',
      'Terça',
      'Quarta',
      'Quinta',
      'Sexta',
      'Sábado',
      'Domingo',
    ],
    xaxis: {
      labels: {
        show: true,
      },
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
    yaxis: {
      show: false,
      tickAmount: 5,
    },
    tooltip: {
      x: {
        show: true,
      },
      y: {
        title: {
          formatter: function () {
            return 'Dia'
          },
        },
      },
      marker: {
        show: false,
      },
    },
  }
  const chart1Data = [
    {
      name: 'Creditos',
      data: [1, 4, 3, 5, 6, 7, 9],
    },
  ]

  return (
    <div>
      <Chart
        options={chartOptions}
        series={chart1Data}
        type="area"
        width={800}
        height={200}
      />
    </div>
  )
}

export default ListDia
