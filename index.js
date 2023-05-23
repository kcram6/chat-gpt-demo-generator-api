import { Configuration, OpenAIApi } from "openai";
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

const configuration = new Configuration({
    organization: "org-PhmPeNJhanjhxFsGWLKg7vvb",
    apiKey: "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",
});

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(cors());

app.get('/', function(req, res, next) {
    res.send("App is runnning");
});


app.post("/", async (req, res) => {
    const { messages } = req.body;
    let imageText = req.body.imageReq;
    console.log("image text ", imageText);


    const openai = new OpenAIApi(configuration);
    const responseImage = await openai.createImage({
        prompt: imageText,
        n: 1,
        size: "1024x1024",
    });
    
     console.log(responseImage.data.data[0].url);
    


    const completion = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [
        {role: "system", content: "System Running."},
        ...messages
    ]
    })
    
    res.json({
        completion: completion.data.choices[0].message,
        test: responseImage.data.data[0].url
    })
});

const thes = "yes";

app.listen(port, () => {
    console.log(`App is listening at http://localhost:${port}`);
});

