import React, { Component } from "react";
import { Table, Checkbox, Button } from "semantic-ui-react";

export const WalkTestItem = ({ walkTest, handleDelete, handleToggle }) => {
  return (
    <Table.Row positive={walkTest.include}>
      <Table.Cell>
        <Checkbox checked={walkTest.include} onChange={handleToggle} />
      </Table.Cell>
      <Table.Cell>
        The results of test {walkTest.description} are when walking the full
        distance at their {walkTest.walkSpeed} speed for {walkTest.fullDistance}{" "}
        meters and measured distance of {walkTest.measuredDistance} meters it
        took the patient {walkTest.time} seconds to walk the measured Distance.
        This gives us an average velocity of{" "}
        {(walkTest.measuredDistance / walkTest.time).toPrecision(2)}m/s.
        <Button
          color="red"
          icon="trash"
          compact
          floated="right"
          size="small"
          onClick={handleDelete}
        />
      </Table.Cell>
    </Table.Row>
  );
};
