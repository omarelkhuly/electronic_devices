// src/api.js
import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://77d5b9ed-baf0-467a-bb0a-afa50de829c8.mock.pstmn.io', // ضع هنا رابط الـ Mock Server أو API الحقيقي
  headers: {
    'Content-Type': 'application/json'
  }
});

export default instance;
