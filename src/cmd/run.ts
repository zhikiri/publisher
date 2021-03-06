import { resolve } from 'path';

import { config } from 'dotenv';

import { Command } from './command';
import { CreateCommand } from "./create.command";
import { UpdateCommand } from "./update.command";

config({ path: resolve('./.env') });

const getCommand = (alias: string): Command | null => {
  switch (alias) {
    case 'create':
      return new CreateCommand();

    case 'update':
      return new UpdateCommand();

    default:
      return null;
  }
}

(async () => {

  const command = getCommand(process.argv[2]);
  if (!command) {
    console.error(`Invalid command: ${process.argv[2]}`);
    return process.exit(1);
  }

  try {
    await command.run();
  } catch (error) {

    console.error(error);
    return process.exit(1);
  }
})()
