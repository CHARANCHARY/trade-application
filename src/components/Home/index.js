import React, { useState, useEffect } from 'react';
import Chart from 'chart.js/auto';



import {
    Heading,
    MainContainer,
    Button,
 } from './styled';

function PopulationGraph() {
  const [populationData, setPopulationData] = useState(null);
  const [chartInstance, setChartInstance] = useState(null);
  const [graphType, setgraphType] = useState("bar");
  const [btnText, setBtnText] = useState("Line");
  
//   console.log(graphType);
//   console.log(btnText);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('https://datausa.io/api/data?drilldowns=Nation&measures=Population');
      const data = await response.json();
      setPopulationData(data.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    if (populationData) {
      if (chartInstance) {
        chartInstance.destroy();
      }
      createChart(populationData);
    }
  }, [populationData, graphType]);

  const createChart = (data) => {
    const years = [...new Set(data.map(item => parseInt(item.Year)))].sort((a, b) => a - b); // Get unique years and sort them
    const nations = [...new Set(data.map(item => item.Nation))];
    
    const datasets = nations.map(nation => {
        const populationValues = years.map(year => {
            const populationData = data.find(item => parseInt(item.Year) === year && item.Nation === nation);
            return populationData ? populationData.Population : 0;
        });
        
        return {
            label: nation,
            data: populationValues,
            backgroundColor: getRandomColor(),
            borderColor: getRandomColor(),
            borderWidth: 1
        };
    });
    const ctx = document.getElementById('populationChart').getContext('2d');
    const newChartInstance = new Chart(ctx, {
        type: graphType,
        data: {
            labels: years.map(year => year.toString()), // Use years as labels for x-axis
            datasets: datasets
        },
        options: {
            plugins: {
                legend: {
                    display: true,
                    position: 'top',
                    labels: {
                        boxWidth: 20,
                        font: {
                            size: 10
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: false,
                    title: {
                        display: true,
                        text: 'Population',
                        font: {
                            size: 14
                        }
                    }
                },
                x: {
                    title: {
                        display: true,
                        text: 'Year',
                        font: {
                            size: 14
                        }
                    }
                }
            }
        }
    });
    // console.log(graphType);
    setChartInstance(newChartInstance);
};



  

  const getRandomColor = () => {
    return `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, 0.5)`;
  };

  const handleClick = () => {
    setgraphType(prevType => prevType === 'bar' ? 'line' : 'bar');
    setBtnText(prevType => prevType === 'Line' ? 'Bar' : 'Line');
  };


  return (
    
    <MainContainer>
      <Heading>Population Graph</Heading>
      <Button onClick={handleClick}>Change to {btnText} Chart</Button>
      <canvas id="populationChart" style={{ width: '80px', height: '120px' }}></canvas>
    </MainContainer>
  );
}

export default PopulationGraph;
