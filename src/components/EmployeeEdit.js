import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Communications from 'react-native-communications';
import { Actions } from 'react-native-router-flux';
import { Card, CardSection, Button, Confirm } from './common';
import { employeeUpdate, employeeSave, employeeDelete } from '../actions';
import EmployeeForm from './EmployeeForm';

class EmployeeEdit extends Component {
  state = { showModal: false };

  componentWillMount() {
    _.each(this.props.employee, (value, prop) => {
      this.props.employeeUpdate({ prop, value });
    });
  }

  onButtonPress() {
    const { name, shift, phone } = this.props;
    this.props.employeeSave({ name, shift, phone, uid: this.props.employee.uid });
  }

  onModalAccept() {
    const { uid } = this.props.employee;
    this.props.employeeDelete({uid });
  }

  onModalDecline() {
    this.setState({ showModal: false });
  }

  onFirePress() {
    this.setState({ showModal: !this.state.showModal });
  }
  
  onTextPress() {
    const { phone, shift } = this.props;
    Communications.text(phone, `Your upcoming shift is on ${shift}`);
  }
  

  render() {
    return (
      <Card>
        <EmployeeForm { ...this.props} />
        <CardSection>
          <Button onPress={this.onButtonPress.bind(this)}>
            Save Changes
          </Button>
        </CardSection>
        <CardSection>
          <Button onPress={this.onTextPress.bind(this)}>
            Text Schedule
          </Button>
        </CardSection>
        <CardSection>
          <Button onPress={this.onFirePress.bind(this)}>
            Fire Employee
          </Button>
        </CardSection>

        <Confirm
          visible={this.state.showModal}
          onAccept={this.onModalAccept.bind(this)}
          onDecline={this.onModalDecline.bind(this)}
        >
          Are you sure you want to delete this?
        </Confirm>
      </Card>
    );
  }
}

const mapStateToProps = (state) => {
  const { name, phone, shift } = state.employeeForm

  return { name, phone, shift };
}

export default connect(mapStateToProps, { 
  employeeDelete,
  employeeUpdate,
  employeeSave
})(EmployeeEdit);