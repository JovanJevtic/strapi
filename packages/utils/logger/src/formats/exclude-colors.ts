import { format } from 'winston';
export default format.printf(({ message }): string => {
  if (typeof message !== 'string') {
    return `${message}`;
  }

  return message.replace(
    // eslint-disable-next-line no-control-regex
    /[\u001b\u009b][[()#;?]*(?:[0-9]{1,4}(?:;[0-9]{0,4})*)?[0-9A-ORZcf-nqry=><]/g,
    ''
  );
});
