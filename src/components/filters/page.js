import { Checkbox, createStyles, FormControl, Input, InputLabel, ListItemText, makeStyles, MenuItem, Select } from '@material-ui/core';
import React, { useEffect, useState } from 'react'
import { DEVICE_TYPES, SORT_FIELDS } from '../../configs/Constants';
import './styles.css';

const useStyles = makeStyles((theme) =>
  createStyles({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
  }),
);

export default function Page({handleSortChange, handleFilterChange, initialFilters}) {
  const classes = useStyles();
  const [state, setState] = useState({filter: [], sort: ''});
  const sortItems = [{value: 'none', text: 'None'}, ...SORT_FIELDS];

  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };

  useEffect(() => {
    setState({
      ...state,
      filter: initialFilters,
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialFilters]);

  const onHandleFilterChange = (event) => {
    setState({
      ...state,
      filter: event.target.value,
    });
    handleFilterChange(event.target.value);
  };

  const onHandleSortChange = (event) => {
    setState({
      ...state,
      sort: event.target.value,
    });
    return handleSortChange(event.target.value);
  };

  return (
    <div>
      <FormControl className={classes.formControl}>
        <InputLabel id="demo-mutiple-checkbox-label">Device Type:</InputLabel>
        <Select
          labelId="demo-mutiple-checkbox-label"
          id="demo-mutiple-checkbox"
          multiple
          value={state.filter}
          onChange={onHandleFilterChange}
          input={<Input />}
          renderValue={(selected) => selected.join(', ')}
          MenuProps={MenuProps}
        >
          {DEVICE_TYPES.map((item) => (
            <MenuItem key={item.value} value={item.value}>
              <Checkbox checked={state.filter.indexOf(item.value) > -1} />
              <ListItemText primary={item.text} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl className={classes.formControl}>
        <InputLabel id="select-label">Sort By:</InputLabel>
        <Select
          labelId="filter-selector"
          id="filter-selector"
          value={state.sort}
          onChange={onHandleSortChange}
        >
        {sortItems.map((item) => (
          <MenuItem key={'item-' + item.value} value={item.value}>{item.text}</MenuItem>
        ))}
        </Select>
      </FormControl>
    </div>
  )
}
