export const parseINI = (string: string) => {
  const rl = string.split('\n');

  let retOBJ = {};
  let mode: any;

  let comment = ''
  let prev = ''
  for (const line of rl) {
    if (/\s+#\s(.*)/.test(line)) comment = /\s+#\s(.*)/.exec(line)![1]

    if (/(\w+)\s{/.test(line)) {
      mode = [/(\w+)\s{/.exec(line)![1]];
      retOBJ[mode] = {};
    }
    if (/".*\S"\s\{/.test(line)) {
      mode = [/(?<=")(.*)(?=")/.exec(line)![0]];
      retOBJ[mode] = {};
    }

    if (/\s+I:(.*)=(\d)/.test(line)) {
      if (comment.length > 0) retOBJ[mode][/\s+I:(.*)=(\d)/.exec(line)![1]] = { value: parseInt(/\s+I:(.*)=(\d)/.exec(line)![2]), comment: comment }
      else retOBJ[mode][/\s+I:(.*)=(\d)/.exec(line)![1]] = { value: parseInt(/\s+I:(.*)=(\d)/.exec(line)![2]) }
      comment = ''
    }

    if (/\s+B:(.*)=(\w+)/.test(line)) {
      if (comment.length > 0) retOBJ[mode][/\s+B:(.*)=(\w+)/.exec(line)![1]] = { value: /\s+B:(.*)=(\w+)/.exec(line)![2] === 'true', comment: comment }
      else retOBJ[mode][/\s+B:(.*)=(\w+)/.exec(line)![1]] = { value: /\s+B:(.*)=(\w+)/.exec(line)![2] === 'true' }
      comment = ''
    }
    prev = line
  }


  return retOBJ;
};
