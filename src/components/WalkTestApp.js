import React, { Component } from "react";
import { Table, Checkbox, Button } from "semantic-ui-react";
import { WalkTestItem } from "./WalkTestItem.js";
import { WalkTestInput } from "./WalkTestInput.js";
class WalkTestApp extends Component {
  state = {
    walkTests: [],
    newWalkTest: "",
    fullDistanceWalked: 10,
    measuredDistanceWalked: 6,
    timeWalked: "",
    selectedOption: "comfortable"
  };
  handleToggleAll = () => {
    const [...walkTests] = this.state.walkTests;
    const allToggled = walkTests.every(walkTest => walkTest.include);
    const toggledWalkTests = walkTests.map(walkTest => ({
      ...walkTest,
      include: !allToggled
    }));
    this.setState({ walkTests: toggledWalkTests });
  };
  handleWalkTestClick(walkTest, index) {
    const { include } = walkTest;
    const [...walkTests] = this.state.walkTests;
    walkTests[index] = {
      ...walkTest,
      include: !include
    };
    this.setState({ walkTests: walkTests });
  }
  handleWalkTestInputChange = event => {
    const value = event.target.value;
    this.setState({ newWalkTest: value });
  };
  handleFullDistanceInputChange = event => {
    const value = event.target.value;

    this.setState({ fullDistanceWalked: value });
  };
  handleMeasuredDistanceInputChange = event => {
    const value = event.target.value;

    this.setState({ measuredDistanceWalked: value });
  };
  handleTimeInputChange = event => {
    const value = event.target.value;

    this.setState({ timeWalked: value });
  };
  handleAddTest = event => {
    if (this.state.walkTests.length >= 10) {
      return;
    }
    const {
      walkTests,
      newWalkTest,
      fullDistanceWalked,
      measuredDistanceWalked,
      timeWalked,
      selectedOption
    } = this.state;
    console.log(newWalkTest);

    const value = newWalkTest.trim();
    const validated = this.validationHandler(
      fullDistanceWalked,
      measuredDistanceWalked,
      timeWalked
    );
    if (value && validated) {
      this.setState({
        walkTests: [
          ...walkTests,
          {
            description: newWalkTest,
            fullDistance: fullDistanceWalked,
            measuredDistance: measuredDistanceWalked,
            time: timeWalked,
            walkSpeed: selectedOption,
            include: true
          }
        ],
        newWalkTest: "",
        timeWalked: ""
      });
    }
  };
  handleOptionChange = changeEvent => {
    this.setState({
      selectedOption: changeEvent.target.value
    });
  };
  handleDelete = i => {
    const { walkTests } = this.state;
    const walkTestsWithoutDeleted = walkTests.filter(
      (walkTest, index) => index !== i
    );
    this.setState({ walkTests: walkTestsWithoutDeleted });
  };
  handleClearTests = () => {
    const { walkTests } = this.state;
    const incompleteWalkTests = [];
    this.setState({ walkTests: incompleteWalkTests });
  };
  validationHandler(fullDistanceWalked, measuredDistanceWalked, timeWalked) {
    if (fullDistanceWalked == 0) {
      alert("Full distance equals 0 please increase the full distance");
      return false;
    }
    if (measuredDistanceWalked == 0) {
      alert("Measured distance equals 0 please increase the measured distance");
      return false;
    }
    if (timeWalked == 0) {
      alert("Time walked equals 0 please increase the time walked");
      return false;
    }
    if (measuredDistanceWalked > fullDistanceWalked) {
      alert(
        "Measured distance is greater than full distance please either increase full distance or decrease measured distance."
      );
      return false;
    }

    return true;
  }
  calculateAverageWalkTime = () => {
    const { walkTests } = this.state;
    const includedWalkTests = walkTests.filter(walkTest => walkTest.include);
    var totalTimeWalked = 0;
    for (var i = 0; i < includedWalkTests.length; i++) {
      {
        {
          totalTimeWalked += parseFloat(includedWalkTests[i].time);
        }
      }
    }
    return (totalTimeWalked / includedWalkTests.length).toPrecision(2);
  };
  calculateAverageVelocity = () => {
    const { walkTests, measuredDistanceWalked } = this.state;
    const includedWalkTests = walkTests.filter(walkTest => walkTest.include);
    var totalTimeWalked = 0;
    for (var i = 0; i < includedWalkTests.length; i++) {
      totalTimeWalked += parseFloat(includedWalkTests[i].time);
    }
    return (
      measuredDistanceWalked /
      (totalTimeWalked / includedWalkTests.length)
    ).toPrecision(2);
  };
  getIncludedLength = () => {
    const { walkTests } = this.state;
    const includedWalkTests = walkTests.filter(walkTest => walkTest.include);
    return includedWalkTests.length;
  };
  render() {
    const {
      walkTests,
      newWalkTest,
      fullDistanceWalked,
      measuredDistanceWalked,
      timeWalked
    } = this.state;
    const allToggled = walkTests.every(walkTest => walkTest.include);
    return (
      <div className="walk-test-container">
        <WalkTestInput
          walkTests={this.state.walkTests}
          newWalkTest={this.state.newWalkTest}
          fullDistanceWalked={this.state.fullDistanceWalked}
          measuredDistanceWalked={this.state.measuredDistanceWalked}
          timeWalked={this.state.timeWalked}
          handleWalkTestInputChange={() => this.handleWalkTestInputChange}
          handleFullDistanceInputChange={() =>
            this.handleFullDistanceInputChange
          }
          handleMeasuredDistanceInputChange={() =>
            this.handleMeasuredDistanceInputChange
          }
          handleTimeInputChange={() => this.handleTimeInputChange}
          selectedOption={this.state.selectedOption}
          handleOptionChange={() => this.handleOptionChange}
        />
        <br />
        <Button
          color="green"
          className="addTestButton"
          size="large"
          onClick={this.handleAddTest}
        >
          Add Test
        </Button>
        {walkTests.length === 0 ? (
          <Table>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>No tests have been added.</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
          </Table>
        ) : (
          <Table>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>
                  <label htmlFor="includeAll"> Included </label>
                  <Checkbox
                    id="includeAll"
                    checked={allToggled}
                    onChange={this.handleToggleAll}
                  />
                </Table.HeaderCell>
                <Table.HeaderCell>Walk Tests</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {this.state.walkTests.map((walkTest, i) => (
                <WalkTestItem
                  key={i}
                  walkTest={walkTest}
                  handleToggle={() => this.handleWalkTestClick(walkTest, i)}
                  handleDelete={() => this.handleDelete(i)}
                />
              ))}
            </Table.Body>
            <Table.Footer fullWidth>
              <Table.Row>
                <Table.HeaderCell colSpan="2">
                  <div>
                    The included results of the above tests are based on the
                    patient walking {this.state.fullDistanceWalked} meters with
                    a measured distance of {this.state.measuredDistanceWalked}{" "}
                    meters at the {this.getIncludedLength()} times.{" "}
                  </div>
                  <div>
                    The average results of the tests is that the patient had an
                    average walk time of {this.calculateAverageWalkTime()}{" "}
                    seconds and average velocity of{" "}
                    {this.calculateAverageVelocity()} m/s when walking at their{" "}
                    {this.state.selectedOption} pace.
                  </div>
                </Table.HeaderCell>
              </Table.Row>
              <Table.Row>
                <Table.HeaderCell colSpan="2">
                  <Button
                    color="green"
                    size="small"
                    onClick={this.handleClearTests}
                  >
                    Clear All Tests
                  </Button>
                </Table.HeaderCell>
              </Table.Row>
            </Table.Footer>
          </Table>
        )}
      </div>
    );
  }
}

export default WalkTestApp;
