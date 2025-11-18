import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  Box,
  Tabs,
  Tab,
  Typography,
  Button,
  TextareaAutosize,
} from "@mui/material";

const TabPanel = ({ children, value, index, ...other }) => (
  <div
    role="tabpanel"
    hidden={value !== index}
    id={`vertical-tabpanel-${index}`}
    aria-labelledby={`vertical-tab-${index}`}
    {...other}
  >
    {value === index && <Box p={3}>{children}</Box>}
  </div>
);

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

const VerticalTabsWithEditor = () => {
  const [details, setDetails] = useState([
    { title: "Title 1", value: "Value 1" },
  ]);
  const [value, setValue] = useState(0);

  const handleTabChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleAddPanel = () => {
    setDetails((prevDetails) => [
      ...prevDetails,
      { title: `Title ${prevDetails.length + 1}`, value: "" },
    ]);
    setValue(details.length); // Switch to the newly added panel
  };

  const handleValueChange = (index, newValue) => {
    const updatedDetails = [...details];
    updatedDetails[index].value = newValue;
    setDetails(updatedDetails);
  };

  const handleTitleChange = (index, newTitle) => {
    const updatedDetails = [...details];
    updatedDetails[index].title = newTitle;
    setDetails(updatedDetails);
  };

  return (
    <Box
      sx={{
        flexGrow: 1,
        display: "flex",
        height: "100%",
        border: 1,
        borderColor: "divider",
      }}
    >
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleTabChange}
        aria-label="Vertical tabs"
        sx={{ borderRight: 1, borderColor: "divider" }}
      >
        {details.map((detail, index) => (
          <Tab
            key={index}
            label={detail.title}
            id={`vertical-tab-${index}`}
            aria-controls={`vertical-tabpanel-${index}`}
          />
        ))}
        <Button
          sx={{ mt: 1, ml: 1 }}
          variant="outlined"
          onClick={handleAddPanel}
        >
          + Add Panel
        </Button>
      </Tabs>
      {details.map((detail, index) => (
        <TabPanel value={value} index={index} key={index}>
          <Typography variant="h6">Edit Title</Typography>
          <TextareaAutosize
            minRows={1}
            placeholder="Title"
            value={detail.title}
            onChange={(e) => handleTitleChange(index, e.target.value)}
            style={{
              width: "100%",
              marginBottom: "10px",
              resize: "none",
            }}
          />
          <Typography variant="h6">Edit Value</Typography>
          <TextareaAutosize
            minRows={4}
            placeholder="Value"
            value={detail.value}
            onChange={(e) => handleValueChange(index, e.target.value)}
            style={{
              width: "100%",
              resize: "none",
            }}
          />
        </TabPanel>
      ))}
    </Box>
  );
};

export default VerticalTabsWithEditor;
