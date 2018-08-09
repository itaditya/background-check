const discussionBoardSetup = require('../lib/discussionBoardSetup')

/* -- Mocks -- */
const createDiscussionRepo = jest.fn()
const addCollaboratorToRepo = jest.fn()
/* ^- Mocks -^ */

const discussionBoardSetupInstance = discussionBoardSetup({
  dependencies: {
    createDiscussionRepo,
    addCollaboratorToRepo
  }
})

test('discussionBoardSetup is working', async () => {
  const context = {
    payload: {
      installation: { account: { login: 'itaditya' } },
      sender: { login: 'itaditya' }
    },
    log: console.log
  }
  await discussionBoardSetupInstance(context)
  expect(createDiscussionRepo.mock.calls).toMatchSnapshot()
  expect(addCollaboratorToRepo.mock.calls).toMatchSnapshot()
})
