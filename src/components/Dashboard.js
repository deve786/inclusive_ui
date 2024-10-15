import React from 'react';
import { FaLongArrowAltUp } from 'react-icons/fa';
import { FaArrowDownLong } from 'react-icons/fa6';
import { Bar, Doughnut, Line, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, ArcElement, LineElement, PointElement, Title, Tooltip, Legend } from 'chart.js';

// Register all necessary elements for different charts
ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, LineElement, PointElement, Title, Tooltip, Legend);

function Dashboard() {

    // Data for different charts
    const pieData = {
        labels: ['Inclusive', 'Non-Inclusive'],
        datasets: [
            {
                label: 'Termini',
                data: [75, 25], // Example data
                backgroundColor: ['#5A67BA', '#E35925'],
            },
        ],
    };

    const barData = {
        labels: ['Term 1', 'Term 2', 'Term 3', 'Term 4'],
        datasets: [
            {
                label: 'Occurrences',
                data: [12, 19, 3, 5],
                backgroundColor: ['#5A67BA'],
                barThickness: 20, // Adjust thickness here
            },
        ],
    };
    

    const lineData = {
        labels: ['January', 'February', 'March', 'April'],
        datasets: [
            {
                label: 'Inclusivity Score',
                data: [85, 90, 80, 92], // Example score data
                borderColor: '#E35925',
                fill: false,
                tension: 0.1,
            },
        ],
    };

    return (
        <div className='px-8  '>
            <p>Dashboard</p>

          
            <div className='flex'>
                <div className='w-[80%] border-r-2 border-b-2 p-5'>
                    <div className='flex justify-between items-center'>
                        <p>Termini non inclusivi: andamento</p>
                        <button className='text-primaryColor rounded-md border px-4 py-2'>View Report</button>
                    </div>
                    <p>127</p>
                    <p className='text-xs text-secondaryColor flex mt-2 items-center'>
                        <FaLongArrowAltUp className='text-green-500' />
                        <span className='text-green-500'>2.1% </span> rispetto alla scorsa scansione
                    </p>

                   
                    <div className='mt-4 h-[200px]'>
                        
                        <Bar data={barData} />
                    </div>
                </div>

                <div className='w-1/2 border-b-2 p-5'>
                    <p>Ultima scansione</p>
                    <p className='text-xs text-secondaryColor'>3 Dicembre 2024</p>

                    
                    <div className='mt-4 w-[200px] h-[200px]'>
                    <Doughnut data={pieData} />
                    </div>
                </div>
            </div>

            
            <div className='flex justify-between'>
                <div className='w-1/3 border-r-2 p-5'>
                    <p>Percentuali</p>
                    <p className='text-xs text-secondaryColor'>I più ricorrenti</p>

                   
                    <div className='mt-4'>
                        <Bar data={barData} />
                    </div>
                </div>

                <div className='w-1/3 border-r-2 p-5'>
                    <p>Parole ricorrenti</p>
                    <p className='text-xs text-secondaryColor'>Classifica dei termini non inclusivi riscontrati</p>

                    
                    <div className='mt-4 '>
                        <div className='px-10 flex flex-col gap-5 mt-5'>
                            <p className='flex justify-between text-sm'><span>Colleghi</span> <span className='text-secondaryColor'>45</span></p>
                            <p className='flex justify-between text-sm'><span>Benvenuto</span> <span className='text-secondaryColor'>35</span></p>
                            <p className='flex justify-between text-sm'><span>candidato</span> <span className='text-secondaryColor'>15</span></p>
                            <p className='flex justify-between text-sm'><span>Uomini</span> <span className='text-secondaryColor'>10</span></p>
                        </div>
                    </div>
                </div>

                <div className='w-1/3 p-5'>
                    <p>Punteggio</p>
                    <p>12</p>
                    <p className='text-xs text-secondaryColor flex mt-2 items-center'>
                        <FaArrowDownLong className='text-red-500' />
                        <span className='text-red-500'>2.1% </span> rispetto alla scorsa scansione
                    </p>

                    
                    <div className='mt-4 '>
                        <Line data={barData} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
