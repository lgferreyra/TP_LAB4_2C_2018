import { IsNullValuePipe } from './is-null-value.pipe';

describe('IsNullValuePipe', () => {
  it('create an instance', () => {
    const pipe = new IsNullValuePipe();
    expect(pipe).toBeTruthy();
  });
});
