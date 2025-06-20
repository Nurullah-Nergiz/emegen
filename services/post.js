
import { postInstance } from './index';

const setPost = async (post) => { 
    postInstance.post('/posts', post);
}