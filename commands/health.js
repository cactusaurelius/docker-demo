module.exports = {
  command: 'health',
  description: 'Ping Registered nodes',
  //   alias: 'hi',
  // options: [
  //     { option: "-u, --uppercase", description: "Uppercase the name" }
  // ],
  // types: {
  //     string: ["name"],
  //     boolean: ["u", "uppercase"]
  // },
  //parse(command, args) {},
  //validate(args) {},
  //help(args) {},
  //   allowUnknownOptions: true,
  action(broker /*, args , helpers*/) {
    // const name = args.options.uppercase ? args.name.toUpperCase() : args.name;
    return broker.ping().then(nodes => {
      for (const [nodeID, ping] of Object.entries(nodes)) {
        (!ping && broker.logger.error(`Node: ${nodeID} Is not responding`)) ||
          broker.logger.info(
            `Node: ${nodeID} responded after ${ping.elapsedTime} ms`
          );
      }
    });
  },
};
