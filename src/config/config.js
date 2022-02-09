let url = ''
const devEnv = false;
if(devEnv){
    url = 'http://localhost:4200'
} else {
    url = 'https://api.arteralabs.net';
}

export const sourceURL = url;
