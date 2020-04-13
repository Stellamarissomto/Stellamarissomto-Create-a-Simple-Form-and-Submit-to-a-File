const http = require("http");
const fs = require("fs");

const server = http.createServer((req, res) => {        
    function htmlTemplate(message){
        return res.end(`
            <!doctype html>
            <html>
            <style>
                @import url("https://fonts.googleapis.com/css?family=Baloo+Chettan+2&display=swap");
                * {
                font-family: "Baloo Chettan 2", cursive;
                box-sizing: border-box; 
                }
                body {
                margin-top: 50vh;
                display: flex;
                justify-content: center;
                align-items: center
                font-size: 10rem;
                }
            </style>
            <body>
                <h2>${message}</h2>
            </body>
            </html>
        `)
    }

    function getUserInput(){
        return res.end(`
        <!doctype html>
        <html>
        <style>
        @import url("https://fonts.googleapis.com/css?family=Baloo+Chettan+2&display=swap");
        * {
        font-family: "Baloo Chettan 2", cursive;
        box-sizing: border-box; 
        }
        body {
        margin-top: 50vh;
        display: flex;
        justify-content: center;
        align-items: center
        font-size: 10rem;
        }
        
        input {
            border-left: none;
            border-right: none;
            border-top: none;
            border-bottom: 1px solid #88bef5;
        }
        #submitButton {
            border: 1px solid #88bef5;
            background: #f4fa9c;
        }
        </style>
        <body>
            <form action="/message" method="post">
                <input  type="text" name="message" placeholder="Please Enter a message"/><br />                <input id="submitButton" type="submit"  value="Send Message" /><br />  
            </form>
        </body>
        </html>
    `)
    }
    if (req.method == "POST" && req.url == "/message") {
        let body = "";
        req.on("data", chunk => {
            body += chunk.toString();
        })
        req.on("end", () => {
            const dataToSave = body.split('=')[1]
            fs.writeFile('message.txt', dataToSave, (err)=>{
                if(err){
                    htmlTemplate("Sorry, there was an error storing your data. Try again later!")
                }else{
                    htmlTemplate("Your data was successfully stored")
                }
            })
        })
        

    } else if(req.method == 'GET' && req.url =='/'){
        getUserInput()  
    } else {
        htmlTemplate("The route doesn't exist on the server, go back to the root route")
    }
});

server.listen(8080);