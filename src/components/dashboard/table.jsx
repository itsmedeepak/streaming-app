// ** React Imports
import { useEffect, useState } from "react";
// ** MUI Imports
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import CardHeader from "@mui/material/CardHeader";
import { DataGrid } from "@mui/x-data-grid";

import axios from "axios";
import { Box } from "@mui/material";
import { useSelector } from "react-redux";

// ** renders client column
const AllColumns = [
  {
    flex: 0.25,
    minWidth: 200,
    field: "roomID",
    headerName: "Streaming Room ID",
    renderCell: (params) => (
      <Typography variant="body2" sx={{ color: "text.primary" }}>
        {params.row.roomID}
      </Typography>
    ),
  },
  {
    flex: 0.25,
    minWidth: 150,
    field: "stream_date",
    headerName: "Stream Date",
    renderCell: (params) => (
      <Typography variant="body2" sx={{ color: "text.primary" }}>
        {formatDate(params.row.createdAt)}
      </Typography>
    ),
  },
];

function formatDate(dateString) {
  const date = new Date(dateString);

  function getDayWithSuffix(day) {
      const j = day % 10;
      const k = day % 100;
      if (j === 1 && k !== 11) {
          return `${day}st`;
      }
      if (j === 2 && k !== 12) {
          return `${day}nd`;
      }
      if (j === 3 && k !== 13) {
          return `${day}rd`;
      }
      return `${day}th`;
  }

  const day = date.getUTCDate();
  const month = new Intl.DateTimeFormat('en-GB', { month: 'short' }).format(date);
  const year = date.getUTCFullYear();

  return `${getDayWithSuffix(day)} ${month} ${year}`;
}


const TableAllStreams = () => {
  // ** States
  const user = useSelector((state)=>state.auth.user)
  const [rows, setRows] = useState([]);
  const [columns, setColumns] = useState(AllColumns);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [data, setdata] =useState(null)
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 10,
  });
  const [searchValue, setSearchValue] = useState("");

  // ** Fetch Data
    const fetchTableData = async () => {
      setLoading(true)
      try {
        const { data } = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api/stream`, {
          headers: { Authorization: `Bearer ${user.token}` },
        })
        setTotal(data.total)
        setRows(data.streams)
        setdata(true)

      } catch (error) {
      } finally {
        setLoading(false)
      }
    }

  //   // ** Effects
    useEffect(() => {
        if(!data){
            fetchTableData()
        }
      
    }, [])

  //   // ** Handle sorting
  const handleSortModel = (sortModel) => {
    // const { field, sort } = sortModel[0] || {}
    // fetchTableData(sort, searchValue, field)
  };

  return (
    <Box
      sx={{
        marginTop: "50px",
      }}
    >
      <DataGrid
        autoHeight
        pagination
        rows={rows}

        rowCount={total}
        columns={columns}
        getRowId={(row) => row._id}
        disableRowSelectionOnClick
        sortingMode="server"
        paginationMode="server"
        pageSizeOptions={[7, 10, 25, 50]}
        onSortModelChange={handleSortModel}
        loading={loading}
      />
    </Box>
  );
};

export default TableAllStreams;
