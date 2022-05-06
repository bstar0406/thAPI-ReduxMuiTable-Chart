import { useState, useEffect } from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useSelector, useDispatch } from 'react-redux';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import DeleteIcon from '@material-ui/icons/Delete';
import {
  addItem,
  deleteItem,
  updateItem
} from '../../redux/table';
import axios from 'axios';

const url = 'https://api.thedogapi.com/v1/images/search';

const config = {
  headers: {
    'x-api-key': 'a60019ac-8870-48e7-8e50-a8eeab8ba584'
  }
};

const Table = () => {
  const [newItem, setNewItem] = useState({ id: 0, firstName: '', lastName: '', age: 0 });
  const [editItem, setEditItem] = useState({ id: 0, firstName: '', lastName: '', age: 0 });
  const [apiData, setApiData] = useState(null);
  const [id, setId] = useState(0)
  const rows = useSelector((state: any) => state.table.data);
  const dispatch = useDispatch();

  useEffect(() => {
    axios.get(url, config).then(res => {
      setApiData(res.data)
    })
  }, [newItem]);

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 100, editable: false },
    { field: 'firstName', headerName: 'First name', width: 200, editable: true },
    { field: 'lastName', headerName: 'Last name', width: 200, editable: true },
    {
      field: 'age',
      headerName: 'Age',
      type: 'number',
      width: 90,
      editable: true
    },
    {
      field: 'Delete',
      renderCell: (e) => {
        return (
          <IconButton
            aria-label="delete"
            onClick={() =>
              dispatch(deleteItem(e.id))
            }>
            <DeleteIcon />
          </IconButton>
        );
      }
    }
  ];

  const addPerson = () => {
    if (newItem.lastName !== '' && newItem.firstName !== '' && newItem.age > 0) {
      dispatch(addItem(newItem))
      setNewItem({ id: 0, firstName: '', lastName: '', age: 0 });
    }
    else alert("Incorrect information!")
  }

  const updateCurrentRow = (key: string, value: any) => {
    let temp = editItem;
    temp = {
      ...temp,
      [key]: value,
    }
    dispatch(updateItem(temp));
  }
  return (
    <div className='page h-400'>
      
      {console.log(apiData===null? 'loading': JSON.parse(JSON.stringify(apiData[0])).url)}
      <Grid container spacing={3}>
          <Grid item xs={9}>
          <TextField id="api" label="Api Data" value={JSON.stringify(apiData)} />
          </Grid>
          <Grid item xs={3}>
          <img src={apiData===null? 'loading': JSON.parse(JSON.stringify(apiData[0])).url} className='image-size' />

          </Grid>
      </Grid>
      <div className='pb-20'>

        <Grid container spacing={3}>
          <Grid item xs={3}>
            <TextField id="fname" label="First Name" value={newItem.firstName} onChange={e => setNewItem({ id: Math.random(), firstName: e.target.value, lastName: newItem.lastName, age: newItem.age })} />
          </Grid>
          <Grid item xs={3}>
            <TextField id="lname" label="Second Name" value={newItem.lastName} onChange={e => setNewItem({ id: Math.random(), firstName: newItem.firstName, lastName: e.target.value, age: newItem.age })} />
          </Grid>
          <Grid item xs={3}>
            <TextField id="age" label="Age" value={newItem.age} onChange={e => setNewItem({ id: Math.random(), firstName: newItem.firstName, lastName: newItem.lastName, age: Number(e.target.value) })} />
          </Grid>
          <Grid item xs={3}>
            <Button variant="contained" color="primary" onClick={() => addPerson()}>
              Add Person
            </Button>
          </Grid>
        </Grid>
      </div>
      <DataGrid
        editMode="row"
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        onSelectionModelChange={(newSelection) => {
          setId(Number(newSelection.at(0)))
          setEditItem(rows.filter((item: any) => Number(newSelection.at(0)) === item.id)[0])
        }}
        onEditCellPropsChange={(e) => {
          updateCurrentRow(e.field, e.props.value);
        }}
      />
    </div>
  );
}

export default Table;
