import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto'
  },
  table: {
    minWidth: 300
  }
});

const GroupTable = props => {
  const { classes, groups } = props;

  return (
    <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell>Group Name</TableCell>
            <TableCell align="right">Members</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {groups.map((group, index) => {
            return (
              <TableRow key={index}>
                <TableCell component="th" scope="row">
                  {group.name}
                </TableCell>
                <TableCell align="right">
                  {group.members.map((member, i) => (
                    <span key={i}>{member.nickname} </span>
                  ))}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </Paper>
  );
};

GroupTable.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(GroupTable);
