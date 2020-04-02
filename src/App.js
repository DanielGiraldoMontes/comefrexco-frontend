import React, { Component } from 'react';
import { Route, NavLink, HashRouter } from "react-router-dom";
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExitToApp from '@material-ui/icons/ExitToApp';
import PlayArrow from '@material-ui/icons/PlayArrow';
import { MuiThemeProvider } from '@material-ui/core/styles';
import _ from 'lodash';
import BlockUi from 'react-block-ui';
import 'react-block-ui/style.css';

// Custom components
import { theme } from './common/js/theme';
import { AppStyles } from './App.style';
import UtilService from './common/js/util.service';
import store from './store';
import Login from './components/Login/Login';
import Home from './components/Home/Home';
import People from './components/People/People';
import Pest from './components/Pest/Pest';
import User from './components/User/User';
import Permission from './components/Permission/Permission';
import Surveillance from './components/Surveillance/Surveillance';
import NewSurveillance from './components/NewSurveillance/NewSurveillance';
import logo from './images/leaf.svg';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      session: null,
      expanded: 'panel1',
      blocking: false,
    };

    store.subscribe(() => {
      if (_.has(store.getState(), 'session')) {
        this.setState({ session: store.getState().session });
      }
      if (_.has(store.getState(), 'blocking')) {
        this.setState({ blocking: store.getState().blocking });
      }
    });
  }

  componentWillMount() {
    this.updateSession();
    this.updateMenuStatus();
  }

  handleChange = panel => (event, expanded) => {
    this.setState({
      expanded: expanded ? panel : false,
    });
  };

  handleCloseSession = () => {
    UtilService.closeSession();
  }

  updateSession = () => {
    this.setState({ session: localStorage.getItem('session') });
  }
  
  updateMenuStatus = () => {
    let hash = window.location.hash.split('/')[1];
    switch (hash) {
      case 'people':
      case 'surveillance':
        this.setState({ expanded: 'panel2' });
        break;
      case 'user':
        this.setState({ expanded: 'panel3' });
        break;
      default:
        this.setState({ expanded: 'panel1' });
        break;
    }
  }

  render() {
    const { classes } = this.props;
    const { expanded } = this.state;

    return (
      <MuiThemeProvider theme={theme}>
        <HashRouter>
          <div className="App">
            <BlockUi tag="div" blocking={this.state.blocking}>
              <ul className={classNames(classes.header, { [classes.hide]: _.isEmpty(this.state.session), })} >
                <div className={classes.logo}>
                    <img src={logo} alt="logo" className={classes.appIcon} />
                    <h1 className={classes.appName}>Comefrexco</h1>
                </div>
                <div className={classes.session}>
                    <NavLink onClick={this.handleCloseSession} to="/" className={classes.closeSession}>
                      <ExitToApp />
                    </NavLink>
                </div>
              </ul>
              <section className={classNames(classes.content, { [classes.expanded]: _.isEmpty(this.state.session), })}>
                <nav className={classes.nav}>
                  <div className={ classNames({ [classes.hide]: _.isEmpty(this.state.session) }) }>
                    <ExpansionPanel expanded={expanded === 'panel1'} onChange={this.handleChange('panel1')} className={classes.expansionPanel}>
                      <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />} className={classes.expansionPanelSummary}>
                        <Typography>Registro / Control</Typography>
                      </ExpansionPanelSummary>
                      <ExpansionPanelDetails className={classes.expansionPanelContent}>
                        <Typography>
                          <NavLink activeClassName="is-active" to="/people">Personas <PlayArrow className={classes.activeIcon}/></NavLink>
                        </Typography>
                        <Typography>
                          <NavLink activeClassName="is-active" to="/surveillance">Monitoreo <PlayArrow className={classes.activeIcon}/></NavLink>
                        </Typography>
                      </ExpansionPanelDetails>
                    </ExpansionPanel>
                    <ExpansionPanel expanded={expanded === 'panel2'} onChange={this.handleChange('panel2')} className={classes.expansionPanel}>
                      <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />} className={classes.expansionPanelSummary}>
                        <Typography>Configuración</Typography>
                      </ExpansionPanelSummary>
                      <ExpansionPanelDetails className={classes.expansionPanelContent}>
                        <Typography>
                          <NavLink activeClassName="is-active" to="/user">Usuarios <PlayArrow className={classes.activeIcon}/></NavLink>
                        </Typography>
                      </ExpansionPanelDetails>
                    </ExpansionPanel>
                  </div>
                </nav>
                <main className={classNames(classes.mainContent, { [classes.fullWidth]: _.isEmpty(this.state.session), })}>
                  <Route path="/" exact component={Login} />
                  <Route path="/people" exact component={People} />
                  <Route path="/pest" exact component={Pest} />
                  <Route path="/user" exact component={User} />
                  <Route path="/user/permission/:userName/:isAdmin" exact component={Permission} />
                  <Route path="/surveillance" exact component={Surveillance} />
                  <Route path="/surveillance/new" exact component={NewSurveillance} />
                </main>
              </section>
            </BlockUi>
          </div>
        </HashRouter>
      </MuiThemeProvider>
    );
  }
}

export default withStyles(AppStyles)(App);
