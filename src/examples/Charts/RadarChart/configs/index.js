/**
=========================================================
* AJ Admin Panel React - v2.1.0
=========================================================

* Product Page: https://www.eliteitteam.com/product/material-dashboard-react
* Copyright 2022 Elite IT (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

function configs(labels, datasets) {
  return {
    data: {
      labels,
      datasets: [...datasets],
    },
    options: {
      plugins: {
        legend: {
          display: false,
        },
      },
    },
  };
}

export default configs;
