
module.exports = {
    getResult: async (status, message, token = "", data = "") => {
        return {
          status: status,
          msg: message,
          token: token,
          data: data,
        };
      },
}