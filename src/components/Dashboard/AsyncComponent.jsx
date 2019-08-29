import React from 'react';
import PropTypes from 'prop-types';

import Activity from './Activity';
import Attitude from './Attitude';
import Clock from './Clock';
import Chart from './Chart';
import Commands from './Commands';
import Content from './Content';
import DisplayValue from './DisplayValue';
import Globe from './Globe';
import SetValues from './SetValues';
import Status from './Status';
import ThreeD from './ThreeD';
import UploadFile from './UploadFile';

const components = {
  Activity,
  Attitude,
  Clock,
  Chart,
  Commands,
  Content,
  DisplayValue,
  Globe,
  SetValues,
  Status,
  ThreeD,
  UploadFile,
};

function AsyncComponent({ component, props }) {
  const Component = components[component];

  return <Component {...props} />;
}

AsyncComponent.propTypes = {
  component: PropTypes.string.isRequired,
  props: PropTypes.shape({}),
};

AsyncComponent.defaultProps = {
  props: {},
};

export default AsyncComponent;