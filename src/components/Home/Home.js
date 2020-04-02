import React, { Component } from "react";
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import Highcharts from "highcharts/highcharts-gantt";
import HighchartsReact from "highcharts-react-official";
import swal from 'sweetalert2';
import _ from 'lodash';

// Custom components
import UtilService from '../../common/js/util.service';
import { HomeStyles } from './Home.style';

const options = {
    chart: {
        marginTop: 60,
        height: 450,
    },
    title: false,
    xAxis: {
        categories: ['Manzanas', 'Naranjas', 'Peras', 'Bananas', 'Ciruelas']
    },
    credits: {
        enabled: false,
    },
    labels: {
        items: [{
            html: 'Consumo total de frutas',
            style: {
                left: '50px',
                top: '18px',
                color: (Highcharts.theme && Highcharts.theme.textColor) || 'black'
            }
        }]
    },
    series: [{
        type: 'column',
        name: 'Jane',
        data: [3, 2, 1, 3, 4]
    }, {
        type: 'column',
        name: 'John',
        data: [2, 3, 5, 7, 6]
    }, {
        type: 'column',
        name: 'Joe',
        data: [4, 3, 3, 9, 0]
    }, {
        type: 'spline',
        name: 'Average',
        data: [3, 2.67, 3, 6.33, 3.33],
        marker: {
            lineWidth: 2,
            lineColor: Highcharts.getOptions().colors[3],
            fillColor: 'white'
        }
    }, {
        type: 'pie',
        name: 'Total consumo',
        data: [{
            name: 'Jane',
            y: 13,
            color: Highcharts.getOptions().colors[0] // Jane's color
        }, {
            name: 'John',
            y: 23,
            color: Highcharts.getOptions().colors[1] // John's color
        }, {
            name: 'Joe',
            y: 19,
            color: Highcharts.getOptions().colors[2] // Joe's color
        }],
        center: [100, 80],
        size: 100,
        showInLegend: false,
        dataLabels: {
            enabled: false
        }
    }]
};

class Home extends Component {

    state = {
        session: null,
    };

    componentWillMount() {
        let session = UtilService.getSession();
        this.setState({ session });
        if (!session) {
            UtilService.closeSession();
        }
    }

    render() {

        const { classes } = this.props;

        return (
            <div>
                <div className={classNames(classes.wrapperHome, { [classes.hide]: _.isEmpty(this.state.session), })}>
                    <header className={classes.moduleHeader}>
                        <h1 className={classes.moduleName}>Dashboard</h1>
                        <span className={classes.moduleDescription}>Puedes ver el resumen visual de la información, también puede descargar informes.</span>
                    </header>
                    <div className={classes.content}>
                        <HighchartsReact
                            className={classes.barChart}
                            highcharts={Highcharts}
                            options={options}
                        />
                    </div>
                </div>
            </div>
        );
    }
}

export default withStyles(HomeStyles)(Home);