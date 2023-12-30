import { spawn, SpawnOptionsWithoutStdio } from 'child_process';

export const node_spawn = async (cmd: string, arg: string[], options?: SpawnOptionsWithoutStdio): Promise<string> => {
  return new Promise((resolve, reject) => {
    try {
      const nodeSpawn = spawn(cmd, arg, options);
      let dataBuffer = '';
      nodeSpawn.stdout.on('data', (data: Buffer) => {
        dataBuffer += data;
      });
      nodeSpawn.on('close', () => {
        resolve(dataBuffer.toString());
      });
    } catch (err) {
      reject(err);
    }
  });
};
