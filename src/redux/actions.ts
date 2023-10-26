import { SearchData, createSearchParams } from '@/utils';
import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { TableItem } from './types';

export const loginAction = createAsyncThunk('auth/login', async ({ username, password }: { username: string, password: string }, { rejectWithValue }) => {
  try {
    const response = await axios.post('https://technical-task-api.icapgroupgmbh.com/api/login/', {
      username,
      password,
    });

    if (response.status === 200) {
      const user = response.data;
      return { user };
    } else {
      return rejectWithValue('Wrong password or username');
    }
  } catch (error) {
    return rejectWithValue('Login error');
  }
});

export const fetchData = createAsyncThunk('table/fetchData', async ({ page }: { page: number; }) => {
  const offset = page * 10;
  const apiUrl = `https://technical-task-api.icapgroupgmbh.com/api/table/?limit=10&offset=${offset}`;
  const response = await axios.get(apiUrl);

  return response.data;
});

export const updateData = createAsyncThunk(
  'table/updateData',
  async (updates: { id: number, field: string, value: any }[]) => {
  const { id, field, value } = updates[0];

  const response = await axios.patch(`https://technical-task-api.icapgroupgmbh.com/api/table/${id}/`, {
    [field]: value,
  });

  if (response.status === 200) {
    return { id, field, value };
  } else {
    throw new Error('Update failed');
  }
  });

export const handleSearchModalSearch = (searchData: SearchData): Promise<any> => {
  const params = createSearchParams(searchData);
  return axios.get(`https://technical-task-api.icapgroupgmbh.com/api/table/?${params}`)
    .then(response => {
      return response.data.results;
    })
    .catch(error => {
      throw new Error('Search error: ' + error);
    });
};

export const addObject = createAsyncThunk('table/addObject', async (newObject: TableItem) => {
  const response = await axios.post('https://technical-task-api.icapgroupgmbh.com/api/table/', newObject);
  return response.data;
});


// Delete Forbidden 
// export const deleteData = createAsyncThunk('table/deleteData', async (id: number) => {
//   try {
//     const response = await axios.delete(`https://technical-task-api.icapgroupgmbh.com/api/table/${id}/`);

//     if (response.status === 204) {
//       return id;
//     } else {
//       throw new Error('Delete failed');
//     }
//   } catch (error) {
//     throw new Error('Delete failed');
//   }
// });

export const setSearch = createAction<string>('table/setSearch');
export const sortData = createAction<{ field: string, sortOrder: 'asc' | 'desc' }>('table/sortData');
export const setTotalPages = createAction<number>('table/setTotalPages');