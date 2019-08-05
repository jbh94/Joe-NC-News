const { expect } = require('chai');
const {
  formatDates,
  makeRefObj,
  formatComments
} = require('../db/utils/utils');

describe('formatDates', () => {
  it('should take an empty array of objects and return a new array', () => {
    const input = [];
    expect(formatDates(input)).to.eql([]);
  });
  it('should take a JavaScript date object and change it to a readable date object', () => {
    const list = [{ created_at: 1542284514171 }];
    const expectedResult = [{ created_at: new Date(list[0].created_at) }];
    expect(formatDates(list)).to.eql(expectedResult);
  });
  it('should take an array of an object from articles and return a new date under "created at" key', () => {
    const input = [
      {
        title: 'Living in the shadow of a great man',
        topic: 'mitch',
        author: 'butter_bridge',
        body: 'I find this existence challenging',
        created_at: 1542284514171,
        votes: 100
      }
    ];
    const expectedResult = [
      {
        title: 'Living in the shadow of a great man',
        topic: 'mitch',
        author: 'butter_bridge',
        body: 'I find this existence challenging',
        created_at: new Date(1542284514171),
        votes: 100
      }
    ];
    expect(formatDates(input)).to.eql(expectedResult);
  });
  it('the new date object should not mutate the original list', () => {
    const input = [
      {
        title: 'Living in the shadow of a great man',
        topic: 'mitch',
        author: 'butter_bridge',
        body: 'I find this existence challenging',
        created_at: 1542284514171,
        votes: 100
      }
    ];
    const newArray = [
      {
        title: 'Living in the shadow of a great man',
        topic: 'mitch',
        author: 'butter_bridge',
        body: 'I find this existence challenging',
        created_at: new Date(1542284514171),
        votes: 100
      }
    ];
    formatDates(input);
    expect(formatDates(input)).to.not.equal(input);
  });
});

describe('makeRefObj', () => {
  it('should return a reference object when passed in array of lists', () => {
    const input = [];
    expect(makeRefObj(input)).to.eql({});
  });
  it('create a reference object from the list of arrays', () => {
    const input = [
      {
        article_id: 1,
        title: 'Living in the shadow of a great man'
      }
    ];
    const actualResult = makeRefObj(input);
    const expectedResult = {
      'Living in the shadow of a great man': 1
    };
    expect(actualResult).to.eql(expectedResult);
  });
});

describe('formatComments', () => {
  it('should return an empty array when passed an array of comment objects', () => {
    const input = [];
    expect(formatComments(input)).to.eql([]);
  });
});
