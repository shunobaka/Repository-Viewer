/**
 * @fileoverview Defines an axios object used to make http requests to the github API.
 */
import axios from 'axios';

/**
 * The axios object used to make http requests to the github API.
 * @export
 */
const githubApi = axios.create({
  baseURL: 'https://api.github.com',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default githubApi;
