const { PythonShell } = require("python-shell");
const path = require("path");
const pathToPythonScript = path.join(__dirname, "script.py");
const pyshell = PythonShell.run(pathToPythonScript, null, (err) => {
  if (err) throw err;
  console.log("finished");
});

function def(definition) {
  return `

  <div class="defn rrbg">
  <ul class= "bulletless">
    <li>
    <h4>Definition</h4> 
    <ul>
    <li>${definition["definition"]}</li>
    </ul>
    </li>
   
    ${
      definition.hasOwnProperty("example")
        ? `<li><h4>Example</h4><ul><li>${definition["example"]}</li></ul></li>`
        : ""
    }
    
    ${
      definition.hasOwnProperty("synonyms")
        ? ` <li><h4>Synonyms</h4><ul>${definition["synonyms"]
            .map(function (synonym) {
              return `<li>${synonym}</li>`;
            })
            .join("")}</ul></li>`
        : ""
    }
    
    
  </ul>
  </div>
  
  `;
}

function template(pos) {
  return `
  <div class="pos rrbg">
    <h2>${pos["word"]}</h2>
    <h6 class="sub">&nbsp;${
      pos["phonetics"][0]["text"] + " " + pos["meanings"][0]["partOfSpeech"]
    }</h6>
    <br>
    <div class="row">
    ${pos["meanings"][0]["definitions"].map(def).join("")}
    </div>
  </div>
  `;
}

pyshell.on("message", function (message) {
  // received a message sent from the Python script (a simple "print" statement)
  //console.log(message);
  message = JSON.parse(message);
  let div = document.getElementById("content");
  div.innerHTML = `${message.map(template).join("")}`;
});
