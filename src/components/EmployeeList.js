import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ListView } from 'react-native';
import { Card } from '../components/common';
import { employeesFetch } from '../actions';
import ListItem from './ListItem';

class EmployeeList extends Component {
  componentWillMount() {
    this.props.employeesFetch();
    this.createDataStore(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.createDataStore(nextProps);
  }

  createDataStore({ employees }) {
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });

    this.dataSource = ds.cloneWithRows(employees);
  }

  renderRow(employee) {
    return <ListItem employee={employee} />;
  }

  render() {
    return (
      <Card>
        <ListView
          enableEmptySections
          dataSource={this.dataSource}
          renderRow={this.renderRow}
        />
      </Card>
    );
  }
}

const mapStateToProps = state => {
  const employees = _.map(state.employees, (val, uid) => {
    return {...val, uid}; // { shift: 'Monday', name: 'S', id: '1j2j34'}
  });
  return { employees };
}

const styles = {
}

export default connect(mapStateToProps, { employeesFetch })(EmployeeList);