

module.exports = {

  NSFWTrue: (message) => {
    {
      if (message.channel.nsfw === true) {
        return true;
      } else if (message.channel.nsfw === false) {
        return message.channel.send(':gear: Please use this Command in an NSFW-Channel :gear:')
      }
    }
  }
};