/* eslint-env jest */
require('../../__tests__/mockAxios')

const { parseFromQuery } = require('../feed')

test('feed should filter based on dates', async () => {
  const feeds = await parseFromQuery({
    url: 'https://rolflekang.com/feed.xml',
    startTime: '2019-11-14',
    endTime: '2020-09-12',
  })

  expect(feeds.entries.map((item) => item.title)).toEqual([
    'Using Ansible handlers in loops',
    'Serving text/plain for curl with Next',
    'Wireless uplinks with Unifi',
    'Using git commits instead of git stash',
  ])
})