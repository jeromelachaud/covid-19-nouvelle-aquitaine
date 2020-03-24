$.getJSON('/data', response => {
  const colors = [
    '#b71c1c',
    '#880e4f',
    '#ba68c8',
    '#651fff',
    '#7986cb',
    '#90caf9',
    '#009688',
    '#7cb342',
    '#ffeb3b',
    '#ff9800',
    '#795548',
    '#546e7a',
  ]

  const dates = [...new Set(response.map(item => item.date))]
  const departments = [...new Set(response.map(item => item.nom))]

  function getDepartmentCases(department) {
    return response
      .filter(item => item.nom === department)
      .map(item => item.casConfirmes)
  }
  const lineChartDatasets = departments.map((department, i) => {
    return {
      label: department,
      data: getDepartmentCases(department),
      borderColor: colors[i],
      backgroundColor: colors[i],
      fill: false,
    }
  })

  const doughnutChartDatasets = [
    {
      label: document.title,
      data: departments.map(
        department =>
          getDepartmentCases(department)[
            getDepartmentCases(department).length - 1
          ]
      ),
      backgroundColor: departments.map((_, i) => colors[i]),
    },
  ]

  new Chart(document.getElementById('lineChart'), {
    type: 'line',
    data: {
      labels: dates,
      datasets: lineChartDatasets,
    },
    options: {
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true,
            },
          },
        ],
      },
    },
  })
  new Chart(document.getElementById('pieChart'), {
    type: 'doughnut',
    data: {
      labels: departments,
      datasets: doughnutChartDatasets,
    },
  })
})
