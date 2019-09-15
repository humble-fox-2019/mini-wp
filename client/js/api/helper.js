const serverURL = `http://localhost:3000`

// localhost 1234
const client_id = '397711291646-fgrnl8h2969mqm5fd2ufmjthm4kv36p5.apps.googleusercontent.com'

// // deeppress.cado.store
// const client_id = '397711291646-4fnqu2tif98esfdrrtuo0q6d8qd9fukp.apps.googleusercontent.com'

import axios from 'axios';
import Swal from 'sweetalert2'

export default {
    serverURL,
    axios,
    Swal,
    client_id
}
