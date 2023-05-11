// generate file component
const { generateFile } = require('./generateFile');
const { executeJava } = require('./executeJava');
const { deleteFile } = require('./deleteFile');

//For compiling
const errorHandler = (error) => {
  err = String(error.error);
  let hiddenStart = "";
  let hiddenEnd = "";
  for (let i = 0; i < err.length; i++) {
      if (err[i] == "F" && err[i + 1] == "i" && err[i + 2] == "l" && err[i + 3] == "e") {
          hiddenStart = i
      } else if (err[i] == "," && err[i + 2] == "l" && err[i + 3] == "i" && err[i + 4] == "n") {
          hiddenEnd = i + 1
      }
  }
  errMessege = err.replace(err.substring(hiddenStart, hiddenEnd), "");
  return err;
};

// COMPILE (CREATE)
module.exports.compileDev = async (req, res) => {
  const language = req.body.language;
  const code = req.body.codeToServer;
  console.log(
    `Reciving post request from client, language: ${language}, code: ${code}`
  );
  // prevent empty code send by user
  if (code === undefined) {
    console.log('The code from client is empty');
    return res.status(400).json({
      success: false,
      error: 'Your code is empty!',
    });
  }
  try {
    // generate the specific language compiler file
    console.log('entering the generate file function...');
    var filepath = await generateFile(language, code);
    console.log(
      'the compiler file generation is completed! Next is to execute the code'
    );
    // execute the compile file from the filepath
    const output = await executeJava(filepath, language);
    console.log(
      'the compiler file is executed! Next is to delete the compiler file'
    );
    await deleteFile(filepath);

    return res.json({ output });
  } catch (err) {
    console.log(
      'OOP! There is error, Your compiler file is not even generated'
    );
    await deleteFile(filepath);
    const error = errorHandler(await err);
    res.json({ error });
  }
};
