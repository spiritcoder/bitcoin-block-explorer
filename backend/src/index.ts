import {app} from './app'
const PORT = 5000;

//Now tisten to this port 
if (app.listen(PORT)) {
  console.log("Node is listening to Port " + PORT);
}
else {
  console.log("An error occured");
}

