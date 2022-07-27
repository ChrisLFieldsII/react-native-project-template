import {expect, test} from '@oclif/test'

describe('generate/screen-module', () => {
  test
  .stdout()
  .command(['generate/screen-module'])
  .it('runs hello', ctx => {
    expect(ctx.stdout).to.contain('hello world')
  })

  test
  .stdout()
  .command(['generate/screen-module', '--name', 'jeff'])
  .it('runs hello --name jeff', ctx => {
    expect(ctx.stdout).to.contain('hello jeff')
  })
})
