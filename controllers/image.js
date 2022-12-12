import Clarifai from "clarifai";

//You must add your own API key here from Clarifai.
const app = new Clarifai.App({
  apiKey: "53f040b63a6544a49af0873721c65af7",
});

const handleApiCall = (req, res) => {
  app.models
  .predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
  .then(data => {
    res.json(data);
  })
  .catch(err => res.status(400).json('unable to work with API'))
}

const handleImage = (db) => (req, res) => {
    const { id } = req.body;
    let found = false;
    db("users")
      .where("id", "=", id)
      .increment("entries", 1)
      .returning("entries")
      .then((entries) => {
        res.json(entries[0].entries);
      })
      .catch((err) => res.status(400).json("unable to get account"));
  }

  export {handleImage, handleApiCall};
