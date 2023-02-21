import ApexCharts from "react-apexcharts";
import styled from "styled-components";

const ChartComponent = () => {
    return (
        <ApexCharts
            type="line"
            series={[
                {
                    name: 'Sales',
                    data: [4, 3, 10, 9, 29, 19, 22, 9, 12, 7, 19, 5, 13, 9, 17, 2, 7, 5]
                },
            ]}
            options={{
                chart: {
                    height: 350,
                    type: 'line',
                    // 툴바
                    toolbar: { show: true },
                    background: "transparent"
                },
                forecastDataPoints: {
                    // 선 모양
                    // count: 7
                },
                stroke: {
                    // 선 굵기
                    width: 2,
                    // 선 각도
                    curve: 'smooth'
                },
                title: {
                    // 차트 제목
                    text: 'Price Chart',
                    // 제목 위치
                    align: 'left',
                    // 제목 스타일
                    style: {
                        fontSize: "14px",
                        color: '#302f2f',
                        fontWeight: "500"
                    }
                },
                grid: {
                    // 격자
                    show: false
                },
                fill: {
                    type: 'gradient',
                    gradient: {
                        shade: 'dark',
                        gradientToColors: ['#FDD835'],
                        shadeIntensity: 1,
                        type: 'horizontal',
                        opacityFrom: 1,
                        opacityTo: 1,
                        stops: [0, 100, 100, 100]
                    },
                },
                yaxis: {
                    // 세로선 범위
                    min: -10,
                    max: 40,
                    // 세로축 값 안보이게
                    // show: false,
                },
                xaxis: {
                    // 가로선 설정
                    type: 'datetime',
                    categories: ['1/11/2000', '2/11/2000', '3/11/2000', '4/11/2000', '5/11/2000', '6/11/2000', '7/11/2000', '8/11/2000', '9/11/2000', '10/11/2000', '11/11/2000', '12/11/2000', '1/11/2001', '2/11/2001', '3/11/2001', '4/11/2001', '5/11/2001', '6/11/2001'],
                    tickAmount: 10,
                    labels: {
                        formatter: function (value, timestamp, opts) {
                            return opts.dateFormatter(new Date(timestamp), 'dd MMM')
                        }
                    },
                    //x축의 라벨과 선들을 없앰
                    labels: { show: false },
                    axisBorder: { show: false },
                    axisTicks: { show: false },

                },
            }}>

        </ApexCharts>
    );
};

export default ChartComponent;