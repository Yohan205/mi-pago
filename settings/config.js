const options = new Map();
options.set('headers', { 
    method: 'POST', 
    headers: {"Content-Type": "application/json"}
  });

  options.set('URI', "https://mipago.co/set/api.php");

  module.exports = options;