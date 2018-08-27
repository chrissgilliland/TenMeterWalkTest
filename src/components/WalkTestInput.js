import React, { Component } from "react";
import { Table, Checkbox, Button } from "semantic-ui-react";
import { WalkTestItem } from "./WalkTestItem.js";

export const WalkTestInput = ({
  walkTests,
  newWalkTest,
  fullDistanceWalked,
  measuredDistanceWalked,
  timeWalked,
  handleWalkTestInputChange,
  handleFullDistanceInputChange,
  handleMeasuredDistanceInputChange,
  handleTimeInputChange,
  selectedOption,
  handleOptionChange
}) => {
  return (
    <div>
      <label htmlFor="new-walk-test">Test Description: </label>
      <input
        id="new-walk-test"
        className="new-walk-test"
        placeholder="Test 1"
        autoFocus={true}
        value={newWalkTest}
        onChange={handleWalkTestInputChange()}
      />
      <br />
      <label htmlFor="full-distance-walked">Full Distance Walked: </label>
      <input
        id="full-distance-walked"
        className="full-distance-walked"
        type="number"
        value={fullDistanceWalked}
        onChange={handleFullDistanceInputChange()}
        disabled={walkTests.length !== 0}
      />
      <br />
      <label htmlFor="measured-distance-walked">
        Measured Distance Walked:{" "}
      </label>
      <input
        id="measured-distance-walked"
        className="measured-distance-walked"
        value={measuredDistanceWalked}
        type="number"
        onChange={handleMeasuredDistanceInputChange()}
        disabled={walkTests.length !== 0}
      />
      <br />
      <label htmlFor="time-walked">Time Walked: </label>
      <input
        id="time-walked"
        className="time-walked"
        placeholder="30.00"
        value={timeWalked}
        type="number"
        onChange={handleTimeInputChange()}
      />
      <div className="radio">
        <label>
          <input
            type="radio"
            value="comfortable"
            checked={selectedOption === "comfortable"}
            onChange={handleOptionChange()}
            disabled={walkTests.length !== 0}
          />
          Comfortable
        </label>
      </div>
      <div className="radio">
        <label>
          <input
            type="radio"
            value="fastest"
            checked={selectedOption === "fastest"}
            onChange={handleOptionChange()}
            disabled={walkTests.length !== 0}
          />
          Fastest
        </label>
      </div>
    </div>
  );
};
