'use client'
import type { ApexOptions } from 'apexcharts'
import { Chart } from './Chart'

function ListMes() {
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
      'Sabado',
      'Domingo',
    ],
    xaxis: {
      labels: {
        show: false,
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
  const Box1Data = [
    {
      name: 'Credito',
      data: [55.701, 57.598, 48.607, 46.439, 58.755, 46.978, 58.16],
    },
  ]

  return (
    <div>
      <Chart
        options={chartOptions}
        series={Box1Data}
        type="bar"
        width={800}
        height={200}
      />
    </div>
  )
}

export default ListMes
