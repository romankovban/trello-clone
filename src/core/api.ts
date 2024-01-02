import { config } from '@/core/config';
import axios from 'axios';

export const api = axios.create({
  baseURL: config.baseApiUri,
});
