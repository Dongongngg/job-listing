import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles({
  root: {
    padding: "1rem 5% 1rem 5%",
    display: "flex",
    justifyContent: "space-between",
  },
});

const StyledTypography = withStyles({
  root: {
    display: "inline-block",
    paddingLeft: "0.5rem",
    fontSize: "calc(8px + 0.3vw)",
    fontWeight: "600",
  },
})(Typography);

const Header = ({ count }) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <div>
        <StyledTypography component="h3">Welcome</StyledTypography>
        <StyledTypography component="h3" style={{ color: "blue" }}>
          James
        </StyledTypography>
      </div>
      <div>
        <StyledTypography component="h3">You have</StyledTypography>
        <StyledTypography component="h3" style={{ color: "blue" }}>
          {count}
        </StyledTypography>
        <StyledTypography component="h3">applications</StyledTypography>
      </div>
    </div>
  );
};

export default Header;
