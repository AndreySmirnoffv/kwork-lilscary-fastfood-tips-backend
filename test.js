import axios from 'axios'

async function test(){
    axios.post("https://0267-2a02-8071-6282-a220-66a2-8fa2-c24e-5cd.ngrok-free.app/api/auth/register", {
            "email": "+72222222222",
            "password": "asd"
        }).then(res => console.log(res.data)).catch(error => console.log(error))
}

test()