import React from 'react';
import { FaLongArrowAltUp } from 'react-icons/fa';
import { FaArrowDownLong } from 'react-icons/fa6';
import { Bar, Doughnut, Line, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, ArcElement, LineElement, PointElement, Title, Tooltip, Legend } from 'chart.js';
import { useTranslation } from 'react-i18next';

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, LineElement, PointElement, Title, Tooltip, Legend);

function Dashboard() {

    const { i18n, t } = useTranslation();
    const pieData = {
        labels: ['Inclusive', 'Non-Inclusive'],
        datasets: [
            {
                label: 'Termini',
                data: [75, 25],
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
                barThickness: 20,
            },
        ],
    };

    const lineData = {
        labels: ['January', 'February', 'March', 'April'],
        datasets: [
            {
                label: 'Inclusivity Score',
                data: [85, 90, 80, 92],
                borderColor: '#E35925',
                fill: false,
                tension: 0.1,
            },
        ],
    };

    return (
        <div className='px-2 sm:px-4 md:px-8 overflow-y-auto'>
            <p className="text-lg ">Dashboard</p>

            {/* Top Section */}
            <div className='flex flex-col lg:flex-row'>
                {/* Left Chart */}
                <div className='w-full lg:w-2/3 border-b-2 lg:border-r-2 p-2 sm:p-5'>
                    <div className='flex flex-row justify-between items-start sm:items-center gap-2 sm:gap-0'>
                        <p className='md:text-md text-sm'>{t('chart1')}</p>
                        <button className='text-primaryColor rounded-md border md:px-4 md:py-2 px-2 py-1 md:text-md text-xs'>View Report</button>
                    </div>
                    <p>127</p>
                    <p className='text-xs text-secondaryColor flex mt-2 items-center gap-1'>
                        <FaLongArrowAltUp className='text-green-500' />
                        <span className='text-green-500'>2.1% </span> {t("compare")}
                    </p>

                    <div className='mt-4 sm:h-[200px] sm:w-full  h-[200px] w-[200px]'>
                        <Bar
                            data={barData}
                            options={{
                                responsive: true,
                                maintainAspectRatio: false,
                            }}
                        />
                    </div>
                </div>

                {/* Right Chart */}
                <div className='w-full lg:w-1/3 border-b-2 p-2 sm:p-5'>
                    <p>{t("lastscan")}</p>
                    <p className='text-xs text-secondaryColor'>{t("date")}</p>

                    <div className='mt-4 mx-auto sm:h-[300px] sm:w-full h-[200px] w-[200px] flex justify-center'>
                        <Doughnut
                            data={pieData}
                            options={{
                                responsive: true,
                                maintainAspectRatio: true,
                                plugins: {
                                    legend: {
                                        position: 'bottom', // Adjust this to 'top', 'left', or 'right' if needed
                                    },
                                },
                            }}
                        />
                    </div>
                </div>

            </div>

            {/* Bottom Section */}
            <div className='flex flex-col lg:flex-row'>
                {/* First Chart */}
                <div className='w-full lg:w-1/3 border-b-2 lg:border-r-2 p-2 sm:p-5'>
                    <p>{t("percentages")}</p>
                    <p className='text-xs text-secondaryColor'>{t("mostrecurring")}</p>

                    <div className='mt-4 sm:h-[200px] sm:w-full  h-[200px] w-[200px]'>
                        <Bar
                            data={barData}
                            options={{
                                responsive: true,
                                maintainAspectRatio: false,
                            }}
                        />
                    </div>
                </div>

                {/* Middle Section */}
                <div className='w-full lg:w-1/3 border-b-2 lg:border-r-2 p-2 sm:p-5'>
                    <p>{t("Recurringwords")}</p>
                    <p className='text-xs text-secondaryColor'>{t("ranking")}</p>

                    <div className='mt-4'>
                        <div className='px-4 sm:px-10 flex flex-col gap-5 mt-5'>
                            <p className='flex justify-between text-sm'><span>{t("Colleagues")}</span> <span className='text-secondaryColor'>45</span></p>
                            <p className='flex justify-between text-sm'><span>{t("Welcome")}</span> <span className='text-secondaryColor'>35</span></p>
                            <p className='flex justify-between text-sm'><span>{t("candidate")}</span> <span className='text-secondaryColor'>15</span></p>
                            <p className='flex justify-between text-sm'><span>{t("Men")}</span> <span className='text-secondaryColor'>10</span></p>
                        </div>
                    </div>
                </div>

                {/* Last Chart */}
                <div className='w-1/2 lg:w-1/3 p-2 sm:p-5'>
                    <p>{t("score")}</p>
                    <p>12</p>
                    <p className='text-xs text-secondaryColor flex mt-2 items-center gap-1'>
                        <FaArrowDownLong className='text-red-500' />
                        <span className='text-red-500'>2.1% </span> {t("compare")}
                    </p>

                    <div className='mt-4 sm:h-[200px] sm:w-full  h-[200px] w-[220px]'>
                        <Line
                            data={barData}
                            options={{
                                responsive: true,
                                maintainAspectRatio: false,
                            }}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;