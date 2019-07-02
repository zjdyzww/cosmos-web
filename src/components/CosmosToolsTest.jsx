import React, { Component } from 'react';
import Navbar from './Global/Navbar';
import CosmosContainer from './CosmosWidgetComponents/CosmosContainer';

const plotWidget = require('./CosmosWidgets/PlotWidget').default;
const agentListWidget = require('./CosmosWidgets/AgentList').default;
const dataTableWidget = require('./CosmosWidgets/LiveDataTable').default;
const exampleWidget = require('./CosmosWidgets/Example').default;
const agentRequestWidget = require('./CosmosWidgets/AgentRequest').default;
const agentCommands = require('./CosmosWidgets/AgentCommands').default;

function getWidgetInfo() {
  return [
    // {
    //   agent: 'propagator_simple',
    //   node: 'cubesat1',
    //   widgetClass: 'PlotWidget',
    //   title: 'Propagator',
    //   xRange: 10,
    //   data_name: ['node_loc_pos_eci_vel'],
    //   plot_labels: ['', '']
    // },
    // {
    //   agent: 'propagator_simple',
    //   node: 'cubesat1',
    //   widgetClass: 'LiveDataTable',
    //   data_name: ['node_loc_pos_eci_vel']
    // },
    {
      agent: 'post527',
      node: 'node-arduino',
      widgetClass: 'PlotWidget',
      data_name: ['device_tsen_temp_001'],
      title: 'POST527 Temperature',
      xRange: 10,
      plot_labels: ['Time', 'F']
    },
    {
      widgetClass: 'AgentListWidget'
    },
    {
      widgetClass: 'Example'
    },
    {
      agent: 'post527',
      node: 'node-arduino',
      widgetClass: 'AgentRequest',
      request: 'request_blink',
      label: 'blink on',
      arguments: ['1']
    },
    {
      agent: 'post527',
      node: 'node-arduino',
      widgetClass: 'AgentCommands',
      request: '',
      arguments: ['']
    }
  ];
}

class CosmosToolsPage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const imports = {
      PlotWidget: plotWidget,
      AgentListWidget: agentListWidget,
      LiveDataTable: dataTableWidget,
      Example: exampleWidget,
      AgentRequest: agentRequestWidget,
      AgentCommands: agentCommands
    };
    const widgets = getWidgetInfo();

    return (
      <div>
        <Navbar current="cosmostools" />
        <div>
          <CosmosContainer
            mod
            widgets={widgets}
            imports={imports}
          />
        </div>
      </div>
    );
  }
}

export default CosmosToolsPage;
