/* eslint-disable react-hooks/exhaustive-deps */
import * as XLSX from 'xlsx';
import { toast } from 'react-toastify';
import React, { useRef, useState, useEffect } from 'react';

import {
  Card,
  Stack,
  Table,
  Button,
  Container,
  TableBody,
  Typography,
  TableContainer,
  TablePagination,
} from '@mui/material';

import authService from 'src/redux/api/userServices';
import adminService from 'src/redux/api/adminServices';

import Scrollbar from 'src/components/scrollbar';
import EmailDialog from 'src/components/dialogs/emailDialog';

import { emptyRows } from '../utils';
import TableNoData from '../table-no-data';
import UserTableRow from '../user-table-row';
import UserTableHead from '../user-table-head';
import TableEmptyRows from '../table-empty-rows';
import UserTableToolbar from '../user-table-toolbar';

export default function ListPage() {
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('name');
  const [filterName, setFilterName] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(20);
  const [refetch, setRefetch] = useState(false);
  const [isOpen, setisOpen] = useState(false);
  const [isdata, setData] = useState([]);

  const [email, setEmail] = useState('');
  const [isID, setIsID] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const fileInputRef = useRef(null);
  const [assocName, setAssocName] = useState('');
  useEffect(() => {
    fetchData();
  }, [refetch, page, assocName]);
  const fetchData = async () => {
    try {
      const res = await authService.getAll(page, assocName);

      if (res.status === 200) {
        setIsLoading(false);
        setData(res.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = (event) => {
      const data = new Uint8Array(event.target.result);
      const workbook = XLSX.read(data, { type: 'array' });
      const worksheet = workbook.Sheets[workbook.SheetNames[0]];
      const jsonData = XLSX.utils.sheet_to_json(worksheet);

      uploadData(jsonData); // Update the data state with Excel data
    };

    reader.readAsArrayBuffer(file);
    fileInputRef.current.value = '';
  };

  const uploadData = async (data) => {
    try {
      const res = await adminService.listUpload(data);
      console.log(res);

      if (res.status === 200) {
        setRefetch(!refetch);
        toast.success(res?.data?.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleSort = (event, id) => {
    const isAsc = orderBy === id && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(id);
  };

  // handleChangeEmail function to update emailValues state
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleClose = () => {
    setisOpen(false);
  };
  const handleChangeRowsPerPage = (event) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  const handleFilterByName = (event) => {
    setPage(0);
    setFilterName(event.target.value);
  };

  const dataFiltered = isdata?.users;

  const notFound = !dataFiltered?.length && !!filterName;

  return (
    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4">All Members</Typography>
        <Button variant="contained" component="label">
          Upload Excel File
          <input
            type="file"
            ref={fileInputRef}
            hidden
            accept=".xlsx, .xls"
            onChange={handleFileUpload}
          />
        </Button>
      </Stack>

      <Card>
        <UserTableToolbar
          assocName={assocName}
          setAssocName={setAssocName}
          filterName={filterName}
          onFilterName={handleFilterByName}
        />

        <Scrollbar>
          <TableContainer sx={{ overflow: 'unset' }}>
            <Table sx={{ minWidth: 800 }}>
              <UserTableHead
                order={order}
                orderBy={orderBy}
                rowCount={isdata?.length}
                onRequestSort={handleSort}
                headLabel={[
                  { id: 'assocCode', label: 'Assoc Code' },
                  { id: 'association', label: 'Association' },
                  { id: 'firstname', label: 'First Name' },
                  { id: 'lastName', label: 'Last Name' },
                  { id: 'email', label: 'Email' },
                  { id: 'dob', label: 'Term End' },
                  { id: 'address', label: 'Address' },
                  { id: 'identification', label: 'Identification' },
                  { id: 'idImage', label: 'ID Image' },
                  { id: 'emailSent', label: 'Email Sent' },
                  { id: 'formSubmitted', label: 'Form Submitted' },
                  { id: 'sendEmail', label: 'Send Reminder' },
                  { id: '' },
                ]}
              />
              {isLoading ? (
                'Loading...'
              ) : (
                <TableBody>
                  {dataFiltered?.map((row, index) => (
                    <UserTableRow
                      key={index}
                      assocCode={row?.assocCode}
                      association={row?.association}
                      name={row?.firstName}
                      lastName={row?.lastName}
                      email={row?.primaryEmail}
                      dob={row?.dob}
                      identification={row?.identification}
                      address={row?.homeAddress}
                      info={row?.verified}
                      emailSent={row?.emailSent}
                      formSubmit={row?.formFilled}
                      idExpiry={row?.termEnd}
                      handleOpenEmailDialog={() => {
                        setisOpen(true);
                        setEmail(row?.primaryEmail);
                        setIsID(row?.uniqueId);
                      }}
                    />
                  ))}
                  <TableEmptyRows
                    height={77}
                    emptyRows={emptyRows(page, rowsPerPage, isdata?.length)}
                  />
                  {notFound && <TableNoData query={filterName} />}
                </TableBody>
              )}
            </Table>
          </TableContainer>
        </Scrollbar>

        <TablePagination
          page={page}
          component="div"
          count={!isdata?.totalUsers ? 0 : isdata?.totalUsers}
          rowsPerPage={rowsPerPage}
          onPageChange={handleChangePage}
          rowsPerPageOptions={[5, 10, 25]}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Card>
      <EmailDialog
        isOpen={isOpen}
        setisOpen={setisOpen}
        email={email}
        isID={isID}
        handleClose={handleClose}
        setRefetch={setRefetch}
        refetch={refetch}
      />
    </Container>
  );
}
